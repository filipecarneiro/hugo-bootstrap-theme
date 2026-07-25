# Hugo Bootstrap Theme

[![Build and Deploy to gh-pages branch](https://github.com/filipecarneiro/hugo-bootstrap-theme/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/filipecarneiro/hugo-bootstrap-theme/actions/workflows/gh-pages.yml) [![Publish to GitHub Pages](https://github.com/filipecarneiro/hugo-bootstrap-theme/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/filipecarneiro/hugo-bootstrap-theme/actions/workflows/pages/pages-build-deployment)

Theme for a blazing fast static website and/or blog using bootstrap 5.

![Screenshot](https://github.com/filipecarneiro/hugo-bootstrap-theme/blob/main/images/tn.png)

## Demo

- [https://filipecarneiro.github.io/hugo-bootstrap-theme/](https://filipecarneiro.github.io/hugo-bootstrap-theme/)

## Features

- 🛡️ Security aware
  
  Get A+ scores on Mozilla Observatory out of the box. Easily change the default Security Headers to suit your needs.

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
