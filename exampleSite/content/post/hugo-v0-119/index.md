---
title: "Hugo v0.119.0"
description: ""
date: 2023-09-24
draft: false
images: ["hugo-logo.png"]
categories: ["Hugo Release Notes"]
tags: ["Hugo"]
keywords: ["hugo v0.119"]
authors: ["Bjørn Erik Pedersen"]
---

![Hugo](hugo-logo.svg)

This version is built with Go 1.21.1 which contains some relevant security fixes for the html/template package, see [Issue 62196](https://github.com/golang/go/issues/62196) and [Issue 62197](https://github.com/golang/go/issues/62197). This is the main reason Hugo 0.119.0 is released sooner rather than later. But this release also comes with a dependency refresh and some useful image processing improvements:

A new general-purpose [Process](https://gohugo.io/content-management/image-processing/#process) method and filter.
A new [Opacity](https://gohugo.io/functions/images/#opacity) filter.


[Release Notes on GitHub](https://github.com/gohugoio/hugo/releases).
