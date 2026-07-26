/**
 * Reads every page URL out of a published site's sitemap.
 *
 * Shared by the PageSpeed sweep and by unlighthouse.config.mjs, which both need
 * the same answer to "what pages does this site have?".
 *
 * Returns absolute URLs, deliberately. Unlighthouse resolves a bare path
 * against the site's *origin*, so `/about/` on a project site published under
 * `/hugo-bootstrap-theme/` would be scanned at the wrong address; a URL that
 * already carries its protocol is used as-is.
 */

/**
 * @param {string} site Base URL of the published site, e.g. https://host/path/
 * @returns {Promise<string[]>} Absolute page URLs, in sitemap order.
 */
export async function discoverUrls(site) {
  const seen = new Set()

  const collect = async (sitemapUrl) => {
    const xml = await fetchText(sitemapUrl)
    const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) =>
      decodeEntities(m[1]),
    )
    /* A sitemap index lists more sitemaps rather than pages - this theme emits
       one per language, so the top-level file alone yields no pages at all. */
    if (/<sitemapindex/.test(xml)) {
      for (const child of locs) await collect(child)
      return
    }
    for (const loc of locs) seen.add(loc)
  }

  await collect(`${withTrailingSlash(site)}sitemap.xml`)
  return [...seen]
}

async function fetchText(url) {
  /* An explicit controller rather than AbortSignal.timeout: that helper leaves
     its timer armed until it fires, and a process.exit() while one is pending
     trips an assertion in libuv on Windows. Clearing it keeps the event loop
     empty the moment the request is done. */
  const abort = new AbortController()
  const timer = setTimeout(() => abort.abort(), 30_000)
  try {
    const res = await fetch(url, { signal: abort.signal })
    if (!res.ok) throw new Error(`GET ${url} returned HTTP ${res.status}`)
    return await res.text()
  } finally {
    clearTimeout(timer)
  }
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
}

export function withTrailingSlash(u) {
  return u.endsWith('/') ? u : `${u}/`
}
