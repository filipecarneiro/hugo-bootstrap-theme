---
title: "Hugo v0.100.2"
description: ""
date: 2022-06-08
draft: false
images: ["hugo-logo.png"]
categories: ["Hugo Release Notes"]
tags: ["Hugo"]
keywords: ["hugo v0.100"]
authors: ["Bjørn Erik Pedersen"]
---

![Hugo](hugo-logo.svg)

This release is mostly motivated by the fix for the panic experienced by people having blackfriday configured as defaultMarkdownHandler ([#9968](https://github.com/gohugoio/hugo/issues/9968)). The Blackfriday support was removed in Hugo v0.100.0 after being deprecated with a warning for a long time.

v0.100.1 fix panic with markdownify/RenderString with shortcode on Page with no content file.

$page.RenderString (see [#6703](https://github.com/gohugoio/hugo/issues/6703)) finally supports shortcodes, and shortcode improvements is the main theme in Hugo 0.100.0.


[Release Notes on GitHub](https://github.com/gohugoio/hugo/releases).
