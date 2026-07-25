---
title: "Structured Data Demo 🔎"
description: "Demonstrates the Product, SoftwareApplication and FAQPage JSON-LD that this theme can emit from front matter."
draft: false
tags: ["Featured"]
keywords: ["structured data","json-ld","schema.org","hugo bootstrap theme"]
images: ["site-feature-image.png"]

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
---

# Structured Data Demo

This page exists to exercise the page-level JSON-LD partials that ship with the
theme, so their output is validated on every build rather than only when a real
site happens to configure them.

Three schemas are emitted from the front matter above:

- **[Product](https://schema.org/Product)** — via `product:`
- **[SoftwareApplication](https://schema.org/SoftwareApplication)** — via `softwareApplication:`
- **[FAQPage](https://schema.org/FAQPage)** — via `faq:`

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
