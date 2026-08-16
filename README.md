# Hugo Bootstrap Theme

[![Build and Deploy to gh-pages branch](https://github.com/filipecarneiro/hugo-bootstrap-theme/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/filipecarneiro/hugo-bootstrap-theme/actions/workflows/gh-pages.yml) [![Publish to GitHub Pages](https://github.com/filipecarneiro/hugo-bootstrap-theme/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/filipecarneiro/hugo-bootstrap-theme/actions/workflows/pages/pages-build-deployment)

Theme for a blazing fast static website and/or blog using bootstrap 5.

![Screenshot](https://github.com/filipecarneiro/hugo-bootstrap-theme/blob/main/images/tn.png)

## Demo

- [https://filipecarneiro.github.io/hugo-bootstrap-theme/](https://filipecarneiro.github.io/hugo-bootstrap-theme/)

## Features

- 🛡️ Security aware
  
  Every page carries a Content Security Policy, and a `_headers` file of sensible defaults is available for hosts that serve custom response headers — see [Security headers](#security-headers). Note that GitHub Pages cannot serve custom headers at all, so a site published there is graded on the meta CSP alone.

- ⚡Fast by default
  
  Get 100 scores on Google Lighthouse by default. Hugo Bootstrap Theme removes unused css, prefetches links, and lazy loads images.
  
- 📈 SEO-ready
  
  Use sensible defaults for structured data, open graph, and Twitter cards. Or easily change the Search Engine Optimization settings to your liking.

## Framework

### Hugo

Hugo is the **world’s fastest static website engine**. It’s written in Go (aka Golang).

- [Hugo Documentation](https://gohugo.io/documentation/)

- [Go template documentation](https://golang.org/pkg/text/template/#hdr-Functions)

### Bootstrap

Get started with Bootstrap

- [Bootstrap 5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

- [Install Bootstrap in your Node.js powered apps with the npm package](https://getbootstrap.com/docs/5.3/getting-started/download/#npm)

### Upgrading from 1.x

**Version 2.0.0 requires Hugo 0.158.0 or later.** The templates use `.Language.Locale` and `.Language.Label`, which replaced the deprecated `.LanguageCode` and `.LanguageName` in Hugo 0.158.0. On older Hugo the build fails with `can't evaluate field Locale in type *langs.Language`.

Upgrade your Hugo before moving to 2.x. You do **not** need to change your site configuration — `locale`/`label` are read from the older `languageCode`/`languageName` config keys as well.

Version 2.0.0 also removes the `postinstall` hook that downloaded a Hugo binary into `bin/`. Install Hugo yourself (see Requirements below); if your site relied on that hook, add [`hugo-installer`](https://www.npmjs.com/package/hugo-installer) to your own project.

### Requirements

The tools used are cross-platform and should work on Windows, MacOS and Linux. You will need the following tools to be downloaded and installed:

- [Hugo static site builder](https://github.com/goHugoio/Hugo/releases) - **version 0.158.0 or later**. IMPORTANT: make sure you pick the extended version, Hugo_extended_0.xxx.x_…

- [Node & NPM](https://nodejs.org/) - We use this to maintain project dependencies

- [Git](https://git-scm.com/downloads) - This is optional, but highly recommended for version control and remote backups.

## Usage

### Test the theme locally on your computer

Clone this repo:

```
git clone https://github.com/filipecarneiro/hugo-bootstrap-theme.git
```

Test if the site is working:

```
hugo server -D --disableFastRender --source exampleSite
```

This launches Hugo development server and you can see the example site by opening http://localhost:1313/hugo-bootstrap-theme/.

### Install on an existing Hugo site

#### Step 1: Install via NPM

```
npm install @filipecarneiro/hugo-bootstrap-theme
```

Hugo bootstrap theme package will also add bootstrap and feather-icons to node modules.

#### Step 2: Add to Config

Then add the theme `hugo-bootstrap-theme` to your sites [configuration file](https://gohugo.io/getting-started/configuration/#configuration-file) `config.toml`, `config.yaml` or `config.json`:

```toml
theme = "hugo-bootstrap-theme"
themesdir = "node_modules/@filipecarneiro"
```

The new themes directory (themesdir) is needed to get the new theme from the `node_modules` folder.

#### Step 3: Test your site

```
hugo server -D --disableFastRender
```

#### Step 4: Check your parameters

Check your `copyright` variable, your menus (the theme supports `main`, `footer` and `social` menus), etc.

Have a look on exampleSite for inspiration :)

### Favicons

Drop the files in `static/` and the theme links them. There is nothing to configure —
each well-known name is emitted only if the file exists:

| File in `static/` | Emitted as |
| --- | --- |
| `favicon.svg` | `<link rel="icon" type="image/svg+xml">` |
| `favicon.png` | `<link rel="icon" type="image/png">` |
| `favicon-96x96.png` | `<link rel="icon" type="image/png" sizes="96x96">` |
| `favicon.ico` | `<link rel="shortcut icon">` |
| `apple-touch-icon.png` | `<link rel="apple-touch-icon" sizes="180x180">` plus `<meta name="apple-mobile-web-app-title">` |
| `site.webmanifest` | `<link rel="manifest">` |

These are the names favicon generators produce, so a standard icon set from something
like [RealFaviconGenerator](https://realfavicongenerator.net) works untouched. A
top-level `themeColor` param, if set, adds `<meta name="theme-color">`. A site whose
icons are named differently can override the partial.

Some SEO points the design follows, from [Google's favicon
guidelines](https://developers.google.com/search/docs/appearance/favicon-in-search):

- Google reads the favicon from the **home page**, so at least one `rel="icon"` must
  exist. The theme emits a build warning if none does.
- The icon should be **square**, ideally a multiple of 48px (48, 96, 144…).
- It must be **crawlable** — do not block it in `robots.txt`.
- Its **URL should stay stable**, because Google caches it. That is why these files are
  deliberately not fingerprinted and carry no `?v=` query: a URL that moved with the
  bytes would work against it. It also means a long `immutable` cache header is the
  wrong choice for them — prefer something like a week, so a replaced icon can still
  reach visitors.

### Security headers

Every page gets a Content Security Policy as a `<meta>` tag, which works on any
host. The remaining headers — `Referrer-Policy`, `X-Content-Type-Options`,
`X-Frame-Options`, `Permissions-Policy`, `Strict-Transport-Security` — can only
be sent as HTTP response headers, so they depend on where the site is published:

| Host | Custom headers | What applies |
| --- | --- | --- |
| Netlify, Cloudflare Pages | reads `_headers` | meta CSP **and** all headers below |
| GitHub Pages | not supported | meta CSP only |

The theme ships `layouts/index.headers`, but Hugo writes it only if the site
declares the output format. Add these three blocks to your configuration:

```toml
[mediaTypes]
  # No delimiter, so the file is written as "_headers" and not "_headers.txt".
  [mediaTypes."text/netlify"]
    delimiter = ""

[outputFormats]
  [outputFormats.HEADERS]
    mediaType = "text/netlify"
    baseName = "_headers"
    isPlainText = true
    notAlternative = true

[outputs]
  # HTML and RSS are Hugo's defaults for the home page and must be repeated,
  # or declaring HEADERS would replace them.
  home = ["HTML", "RSS", "HEADERS"]
```

Build and confirm `public/_headers` exists. To change the headers themselves,
copy `layouts/index.headers` into your own `layouts/`.

#### Changing the Content Security Policy

Set it once, in `params` — **do not** override the
`head/content-security-policy.html` partial:

```toml
[params]
  contentSecurityPolicy = "script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'none'"
```

The same value is then used for the meta tag and for the header in `_headers`.
This matters: a browser enforces *every* policy it receives and applies the
intersection, so a permissive meta tag combined with a stricter header blocks
whatever only the meta tag allowed. While the parameter is unset no CSP is
written to `_headers`, precisely so an overridden meta tag cannot be tightened
behind your back.

### Start from Scratch

#### Step 1: Create a new Hugo site

Follow [Hugo Quick Start](https://gohugo.io/getting-started/quick-start/) to create a new site, add a sample page and change basic settings.

Since you've created an Git repository, let's specify some Hugo files and folders to ignore.

Create a `.gitignore` file on the root of your project with this content:

```txt
public
node_modules
resources
.hugo_build.lock
```

Optionally, add a remote repository and push your code.

#### Step 2: Install and configure Hugo Bootstrap Theme

Update npm to the latest version:

```
npm install -g npm
```

If you don't have npm, [download and install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Then, create an npm package for your site:

```
npm init -y
```

If wanted, you can customize your package information, editing the generated `package.json` file.

Now, install Hugo Bootstrap Theme:

```
npm install @filipecarneiro/hugo-bootstrap-theme --save-dev
```

Then add the theme `hugo-bootstrap-theme` to your site configuration file `config.toml`:

```toml
theme = 'hugo-bootstrap-theme'
themesdir = 'node_modules/@filipecarneiro'
```

Change the existing `theme` value from `ananke` to `hugo-bootstrap-theme` and add a new line for `themesdir`, like above.

Add some [configuration](https://gohugo.io/getting-started/configuration/), like `copyright`, `description` and your menus (the theme supports `main`, `footer` and `social` menus).

Have a look on exampleSite for inspiration :)
