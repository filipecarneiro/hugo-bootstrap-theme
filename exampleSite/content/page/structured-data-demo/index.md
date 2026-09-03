---
title: "Structured Data Demo 🔎"
date: 2026-07-25
description: "Demonstrates the Product, SoftwareApplication, FAQPage and DefinedTermSet JSON-LD that this theme can emit from front matter."
draft: false
tags: ["Featured"]
keywords: ["structured data","json-ld","schema.org","hugo bootstrap theme"]
images: ["site-feature-image.png"]
authors: ["Filipe Carneiro"]

# schema.org/Product -> layouts/partials/head/schema-product.html
product:
  name: "Hugo Bootstrap Theme"
  image: "site-feature-image.png"
  description: "A secure, blazing fast and SEO-ready Hugo theme built on Bootstrap 5."
  sku: "HBT-001"
  brand:
    type: "Brand"
    name: "Hugo Bootstrap Theme"
  aggregateRating:
    ratingValue: "4.8"
    reviewCount: "24"
  offer:
    price: "0.00"
    priceCurrency: "EUR"
    validFrom: "2026-01-01"
    priceValidUntil: "2027-12-31"
    availability: "InStock"
    itemCondition: "NewCondition"
    shippingDetails:
      shippingRate:
        value: "0.00"
        currency: "EUR"
      shippingDestination:
        addressCountry: "PT"
      deliveryTime:
        handlingTime:
          minValue: "0"
          maxValue: "1"
          unitCode: "DAY"
        transitTime:
          minValue: "1"
          maxValue: "5"
          unitCode: "DAY"
    hasMerchantReturnPolicy:
      returnPolicyCategory: "MerchantReturnFiniteReturnWindow"
      merchantReturnDays: "30"
      returnMethod: "ReturnByMail"
      returnFees: "FreeReturn"
      applicableCountry: "PT"

# schema.org/SoftwareApplication -> layouts/partials/head/schema-software-application.html
softwareApplication:
  subType: "WebApplication"
  name: "Hugo Bootstrap Theme"
  screenshot: "site-feature-image.png"
  description: "A secure, blazing fast and SEO-ready Hugo theme built on Bootstrap 5."
  browserRequirements: "Requires JavaScript for optional Bootstrap components."
  applicationCategory: "DeveloperApplication"
  countriesSupported: "PT"
  operatingSystem: "Any"
  aggregateRating:
    ratingValue: "4.8"
    reviewCount: "24"
  offer:
    price: "0.00"
    priceCurrency: "EUR"
    validFrom: "2026-01-01"
    priceValidUntil: "2027-12-31"

# schema.org/FAQPage -> layouts/partials/head/schema-faq.html
faq:
  title: "Frequently Asked Questions"
  items:
    - question: "Which Hugo version does this theme require?"
      answer: |
        Hugo 0.158.0 or later, extended edition.
        Older releases are missing template functions the theme relies on.
    - question: "Do I have to use npm to install the theme?"
      answer: "No. You can install it as an npm package, a Hugo Module, or a git submodule."
    - question: "How do I enable structured data?"
      answer: "Add the matching block to your site params or page front matter. Each block drives one partial, and omitting a block simply omits that schema."

# schema.org/DefinedTermSet -> layouts/partials/head/schema-defined-term-set.html
definedTermSet:
  title: "Theme Glossary"
  description: "The handful of words this theme uses in a particular way."
  items:
    - term: "Partial"
      description: "A template fragment the theme reuses across layouts. Each JSON-LD block on this page comes from one."
    - term: "Front Matter"
      alternateName: "Frontmatter"
      description: "The metadata block at the top of a content file, which is where every page-level schema on this page is configured."
      sameAs: "https://gohugo.io/content-management/front-matter/"
    - term: "Structured Data"
      anchor: "structured-data"
      termCode: "SD"
      description: |
        Machine-readable markup, here JSON-LD, that states what a page is about
        in a vocabulary search engines read.

        It is emitted from front matter, so a page declares what it is once.
      items:
        - term: "JSON-LD"
          alternateName: "JavaScript Object Notation for Linked Data"
          description: "The serialisation this theme emits: a script block of JSON, kept apart from the markup it describes."
          sameAs:
            - "https://en.wikipedia.org/wiki/JSON-LD"
            - "https://www.wikidata.org/wiki/Q6108942"
---

# Structured Data Demo

This page exists to exercise the page-level JSON-LD partials that ship with the
theme, so their output is validated on every build rather than only when a real
site happens to configure them.

Four schemas are emitted from the front matter above:

- **[Product](https://schema.org/Product)** — via `product:`
- **[SoftwareApplication](https://schema.org/SoftwareApplication)** — via `softwareApplication:`
- **[FAQPage](https://schema.org/FAQPage)** — via `faq:`
- **[DefinedTermSet](https://schema.org/DefinedTermSet)** — via `definedTermSet:`

The site-level schemas (`WebSite`, `Organization`, `LocalBusiness` and `Event`)
are configured in `config/_default/params.toml` and render on the home page.

View source on this page to inspect the generated `application/ld+json` blocks,
or paste the URL into the
[Rich Results Test](https://search.google.com/test/rich-results).

## Frequently Asked Questions

**Which Hugo version does this theme require?**

Hugo 0.158.0 or later, extended edition.

**Do I have to use npm to install the theme?**

No. You can install it as an npm package, a Hugo Module, or a git submodule.

**How do I enable structured data?**

Add the matching block to your site params or page front matter.

## Theme Glossary

### Partial

A template fragment the theme reuses across layouts. Each JSON-LD block on this
page comes from one.

### Front Matter

The metadata block at the top of a content file, which is where every
page-level schema on this page is configured.

### Structured Data

Machine-readable markup, here JSON-LD, that states what a page is about
in a vocabulary search engines read.

It is emitted from front matter, so a page declares what it is once.

#### JSON-LD

The serialisation this theme emits: a script block of JSON, kept apart from the
markup it describes.
