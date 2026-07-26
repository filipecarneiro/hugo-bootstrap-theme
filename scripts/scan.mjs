#!/usr/bin/env node
/**
 * Full-site Lighthouse sweep: one unlighthouse-ci run per sitemap URL.
 *
 * Unlighthouse can normally crawl a whole site in one pass, but it disables
 * sitemap discovery for any site published under a path - and this demo lives
 * at /hugo-bootstrap-theme/. Driving it one URL at a time sidesteps that
 * entirely: every page is scanned, whatever the host layout.
 *
 * Each run gets `--site <page URL>` (the bare origin 404s on GitHub Pages, so
 * it cannot be used) plus `--urls <path>`, which pins the run to exactly one
 * route by switching the crawler off. Scores come from the ci-result.json each
 * run writes.
 *
 * Everything runs locally in your own Chrome - no API key, no quota. Budget
 * roughly 20s per page: the whole site takes around a quarter of an hour at the
 * default concurrency, less if you raise it.
 *
 * Usage:
 *   npm run scan                              site comes from the npm script
 *   npm run scan -- --concurrency=3
 *   npm run scan -- --site=https://other/     scan something else
 *   node scripts/scan.mjs --site=<url> [options]
 *
 * Checking one page while you fix it:
 *   npm run scan -- --url=https://host/path/page/   exact page, no sitemap read
 *   npm run scan -- --match=markdown                every sitemap URL matching
 *
 * Options:
 *   --site=<url>         Published site to scan (required unless --url is used)
 *   --url=<url>          Scan this page only, skipping sitemap discovery;
 *                        repeatable, and works for pages not in the sitemap
 *   --match=<substring>  Only scan sitemap URLs containing this
 *   --min=<0-100>        Report categories below this (default: 100)
 *   --concurrency=<n>    Pages scanned at once (default: 1 - Chrome is heavy)
 *   --desktop            Emulate desktop instead of mobile
 *   --throttle           Apply network throttling (closer to PageSpeed's lab)
 *   --json=<path>        Write the collected scores as JSON
 *
 * Exits non-zero when any category is below --min.
 */

import { parseArgs } from 'node:util'
import { spawn } from 'node:child_process'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import { discoverUrls } from './sitemap-urls.mjs'

/* Reports live at .unlighthouse/sweep/<site>/<page>/, set once the site is
   known. Naming the directories after the site and the page - rather than
   numbering them - keeps sweeps of different sites apart, lets a re-run
   refresh its own results instead of piling up, and makes an artifact easy to
   find when you want to read the raw lighthouse.json for one page. */
let OUT_ROOT

/* ci-result.json keys, in the order they should be printed. */
const CATEGORIES = [
  { key: 'performance', label: 'perf' },
  { key: 'accessibility', label: 'a11y' },
  { key: 'best-practices', label: 'bp' },
  { key: 'seo', label: 'seo' },
]

const { values } = parseArgs({
  options: {
    site: { type: 'string' },
    url: { type: 'string', multiple: true },
    min: { type: 'string', default: '100' },
    concurrency: { type: 'string', default: '1' },
    desktop: { type: 'boolean', default: false },
    throttle: { type: 'boolean', default: false },
    match: { type: 'string' },
    json: { type: 'string' },
  },
})

const min = Number(values.min)
const concurrency = Math.max(1, Number(values.concurrency))
let CI_BIN

async function main() {
  /* No default site: the scan hits a live host, and silently falling back to
     somebody else's URL is worse than refusing to start. --url carries its own
     address, so it does not need one. */
  const site = values.site
  const explicit = values.url ?? []
  if (!site && !explicit.length) {
    fail(`--site=<url> is required, e.g. --site=https://example.com/`)
  }
  for (const u of explicit) {
    if (!URL.canParse(u)) fail(`--url must be absolute, got: ${u}`)
  }
  CI_BIN = resolveCiBin()

  /* --url is the whole list when given: no point reading a sitemap to answer a
     question about one known page. */
  let urls = explicit.length
    ? explicit
    : await discoverUrls(site).catch((err) => fail(err.message))
  if (values.match) urls = urls.filter((u) => u.includes(values.match))
  if (!urls.length) {
    fail(values.match ? `no URL matches "${values.match}"` : `no URLs to scan`)
  }

  /* With --url and no --site, the pages themselves say which site this is. */
  OUT_ROOT = resolve('.unlighthouse', 'sweep', slug(site ?? new URL(urls[0]).origin))
  await mkdir(OUT_ROOT, { recursive: true })

  warn(`Scanning ${urls.length} pages with unlighthouse-ci (${concurrency} at a time)`)
  warn(`Roughly ${Math.ceil((urls.length * 20) / concurrency / 60)} minutes.\n`)
  if (concurrency > 1) {
    /* Lighthouse times the page on this machine, so rival Chrome instances
       show up as a lower performance score. The other three categories are
       static analysis and stay put. */
    warn(`Note: performance scores are unreliable above --concurrency=1.\n`)
  }

  let done = 0
  const results = await pool(urls, concurrency, async (url) => {
    const result = await scan(url)
    done += 1
    warn(`[${String(done).padStart(String(urls.length).length)}/${urls.length}] ${line(result)}`)
    return result
  })

  if (values.json) {
    await writeFile(values.json, JSON.stringify(results, null, 2))
    warn(`\nWrote ${values.json}`)
  }

  report(results)
}

try {
  await main()
} catch (err) {
  /* fail() unwinds to here rather than calling process.exit(): exiting while
     fetch's connection pool is still open trips an assertion in libuv on
     Windows. Setting the code and letting the loop drain is clean and, in
     practice, no slower. */
  if (err?.name !== 'ScanExit') throw err
  console.error(`scan: ${err.message}`)
  process.exitCode = 2
}

/* ------------------------------------------------------------------------ */

/** Scans one page and reads back the scores that run wrote to disk. */
async function scan(url) {
  const { pathname } = new URL(url)
  const outputPath = join(OUT_ROOT, slug(pathname) || 'home')

  /* Cleared per page rather than wiping the whole sweep directory up front:
     a second run started while this one is going would otherwise delete the
     directories the running children are about to write into, and the child
     fails with a bare ENOENT on its own report. Creating it here also means
     unlighthouse never has to, so writing the report cannot fail for want of
     a directory. */
  await rm(outputPath, { recursive: true, force: true })
  await mkdir(outputPath, { recursive: true })

  /* Just --site, deliberately no --urls. Passing an explicit url list looks
     like the tighter option - it turns the crawler off - but it makes
     unlighthouse drop the route entirely on some pages ("Failed to queue routes
     for scanning", zero routes, exit 1). Pointing --site straight at the page
     is what works: because the URL carries a path, sitemap and robots discovery
     are disabled anyway and the run settles on this one route. */
  const args = [
    '--site', url,
    '--output-path', outputPath,
    '--reporter', 'json',
    values.desktop ? '--desktop' : '--mobile',
  ]
  if (values.throttle) args.push('--throttle')

  const { code, stderr } = await run(CI_BIN, args)

  const resultFile = join(outputPath, 'ci-result.json')
  if (!existsSync(resultFile)) {
    /* unlighthouse-ci exits non-zero for a failed budget too, so the missing
       file - not the exit code - is what marks a run as broken. Say that the
       report is missing rather than only echoing the child's error: an ENOENT
       on this very path reads as if the scan script failed, when it is
       unlighthouse reporting it could not write its own output. */
    const detail = lastError(stderr)
    return {
      url,
      error: `unlighthouse wrote no report (exit ${code})${detail ? ` - ${detail}` : ''}`,
    }
  }

  const rows = JSON.parse(await readFile(resultFile, 'utf8'))
  /* Match on path rather than taking rows[0]: should the crawler ever pick up
     a second route, the first row need not be the page we asked for. */
  const entry = rows.find((r) => r.path === pathname) ?? rows[0]
  if (!entry) return { url, error: 'no route in ci-result.json' }

  const scores = {}
  for (const { key } of CATEGORIES) {
    scores[key] = entry[key] === undefined ? null : Math.round(entry[key] * 100)
  }
  return { url, scores }
}

/**
 * Absolute path to unlighthouse-ci's entry script.
 *
 * Resolved from the installed package rather than run as a bare command:
 * node_modules/.bin is only on PATH inside an npm script, so spawning the name
 * fails the moment someone runs `node scripts/scan.mjs` directly. Pointing node
 * at the .mjs also skips the Windows .cmd shim, and with it the need for
 * shell:true - which would leave the arguments unescaped.
 */
function resolveCiBin() {
  const require = createRequire(import.meta.url)
  try {
    const pkg = require.resolve('unlighthouse/package.json')
    const bin = require(pkg).bin['unlighthouse-ci']
    return join(dirname(pkg), bin)
  } catch {
    fail(`unlighthouse is not installed - run: npm i -D unlighthouse`)
  }
}

/** Spawns node on a script, collecting output rather than streaming it. */
function run(script, args) {
  return new Promise((done) => {
    const child = spawn(process.execPath, [script, ...args])
    let stderr = ''
    child.stderr.on('data', (d) => (stderr += d))
    child.stdout.on('data', () => {})
    child.on('error', (err) => done({ code: -1, stderr: err.message }))
    child.on('close', (code) => done({ code, stderr }))
  })
}

function report(results) {
  const bad = results.filter(
    (r) => r.error || Object.values(r.scores).some((s) => s === null || s < min),
  )

  console.log(`\n${'='.repeat(72)}`)
  if (!bad.length) {
    console.log(`All ${results.length} pages scored ${min} in every category.`)
    return
  }

  console.log(`${bad.length} of ${results.length} pages below ${min}:\n`)
  for (const r of bad) {
    if (r.error) {
      console.log(`ERROR  ${r.url}\n       ${r.error}\n`)
      continue
    }
    const failed = CATEGORIES.filter((c) => (r.scores[c.key] ?? 0) < min)
      .map((c) => `${c.key} ${r.scores[c.key]}`)
      .join(', ')
    console.log(`${r.url}\n  ${scoreLine(r.scores)}\n  below: ${failed}\n`)
  }

  console.log(`Re-check one page while fixing:  npm run scan -- --url=<page url>`)
  process.exitCode = 1
}

/* ---------------------------------- util --------------------------------- */

function line(r) {
  if (r.error) return `ERROR  ${r.url} - ${r.error}`
  const worst = Math.min(...Object.values(r.scores).map((s) => s ?? 0))
  return `${worst >= min ? 'ok  ' : 'FAIL'}  ${scoreLine(r.scores)}  ${r.url}`
}

function scoreLine(scores) {
  return CATEGORIES.map(
    (c) => `${c.label} ${String(scores[c.key] ?? '--').padStart(3)}`,
  ).join('  ')
}

/** Runs tasks with a fixed number in flight, preserving input order. */
async function pool(items, limit, worker) {
  const out = new Array(items.length)
  let next = 0
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () =>
      (async () => {
        while (next < items.length) {
          const i = next++
          out[i] = await worker(items[i], i)
        }
      })(),
    ),
  )
  return out
}

/**
 * Pulls the useful line out of a failed run's stderr.
 *
 * The last line of a crashed Node process is its version banner, so taking the
 * tail reports "Node.js v24.12.0" as the cause. Prefer a line unlighthouse
 * marked as an error, and strip the ANSI colouring it writes.
 */
function lastError(stderr) {
  const lines = stderr
    // eslint-disable-next-line no-control-regex
    .replace(/\[[0-9;]*m/g, '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  const flagged = lines.filter((l) => /ERROR|Error:/.test(l)).pop()
  return (flagged ?? lines.pop() ?? '').replace(/^\[Unlighthouse\]\s*/, '')
}

/**
 * Turns a URL or path into a directory name.
 *
 * Truncated because Windows still caps a full path at 260 characters by
 * default, and a deep URL plus the repo path can reach it.
 */
function slug(s) {
  return s
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

function warn(m) {
  process.stderr.write(`${m}\n`)
}

/** Aborts the run with a message. Never returns. */
function fail(message) {
  const err = new Error(message)
  err.name = 'ScanExit'
  throw err
}
