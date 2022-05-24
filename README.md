# Hugo Bootstrap Theme

Theme for a blazing fast static website and/or blog using bootstrap 5.

![Screenshot](images/tn.png)

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

- [Bootstrap 5.2](https://getbootstrap.com/docs/5.2/getting-started/introduction/)

- [Install Bootstrap in your Node.js powered apps with the npm package](https://getbootstrap.com/docs/5.2/getting-started/download/#npm)

### Requirements

The tools used are cross-platform and should work on Windows, MacOS and Linux. You will need the following tools to be downloaded and installed:

- [Hugo static site builder](https://github.com/goHugoio/Hugo/releases) - IMPORTANT: make sure you pick the extended version, Hugo_extended_0.xx.x_…

- [Node & NPM](https://nodejs.org/) - We use this to maintain project dependencies

- [Git](https://git-scm.com/downloads) - This is optional, but highly recommended for version control and remote backups.

## Usage

### Build the project locally on your computer

Clone this repo:

```
git clone https://github.com/filipecarneiro/hugo-bootstrap-theme.git
```

Change to exampleSite directory:

```
cd exampleSite
```

Install dependencies:

```
npm install
```

Test if the site is working:

```
hugo server -D --disableFastRender
```

This launches Hugo development server and you can see the example site by opening http://localhost:1313/hugo-bootstrap-theme/.
