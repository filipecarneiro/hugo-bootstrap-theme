---
title: "Bootstrap Carousel 🎠"
date: 2022-06-30
description: "Bootstrap is bundled with tens of components that can be reused to provide a good user experience and user interactions in a web page."
draft: false
tags: ["Featured"]
images: ["bootstrap-v5-new-logo.png"]
keywords: ["bootstrap carousel","bootstrap","hugo bootstrap theme"]
# The carousel images live in this bundle rather than in assets/ because only
# page resources can carry metadata - params.alt is what gives each slide a
# description instead of a filename read aloud by a screen reader.
resources:
  - src: "carousel/bootstrap-v5-new-logo.png"
    params:
      alt: "The Bootstrap 5 logo: a white letter B on a purple rounded square, ringed by small circles, triangles and zigzags"
  - src: "carousel/hugo-bootstrap-banner.png"
    params:
      alt: "The word HUGO spelled in pink, blue, green and yellow hexagons, above the Bootstrap logo on a purple tile"
  - src: "carousel/site-feature-image.png"
    params:
      alt: "The Hugo Bootstrap Theme home page, with a Get Started button above columns headed Security aware, Fast by default and SEO-ready"
---

# Bootstrap Carousel

A slideshow component for cycling through elements—images or slides of text — like a carousel.

<br>

<div class="w-50 mx-auto">
    {{< carousel imagesPattern="carousel/*.png" aspectRatio="3/2" crossFade=false withIndicators=true withControls=true >}}
</div>

<br>

See [Carousel documentation](https://getbootstrap.com/docs/5.3/components/carousel/).
