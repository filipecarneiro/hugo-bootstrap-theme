---
title: "Hugo Front Matter 🦉"
description: "Hugo allows you to add front matter in yaml, toml, or json to your content files."
summary: "Hugo allows you to add front matter in yaml, toml, or json to your content files. Read on to know more about predefined and user-defined front matter variables."
draft: true
tags: ["Featured"]
images: ["hugo-front-matter.jpg","hugo-logo.svg"]
keywords: ["Hugo Front Matter","hugo","front matter","draft post","front matter variables"]
aliases:
  - draft-post
  - my-fourth-blog-post
---

# Hugo Front Matter

Hugo allows you to add front matter in yaml, toml, or json to your content files.

**Front matter** allows you to keep metadata attached to an instance of a content type—i.e., embedded inside a content file—and is one of the many features that gives Hugo its strength.

![Banner](hugo-front-matter.jpg)

## Front Matter Variables

There are a few [predefined variables](https://gohugo.io/content-management/front-matter/#predefined) that Hugo is aware of. See [Page Variables](https://gohugo.io/variables/page/) for how to call many of these predefined variables in your templates.

You can add fields to your front matter arbitrarily to meet your needs. These user-defined key-values are placed into a single `.Params` variable for use in your templates.

Any node or section can pass down to descendants a set of Front Matter values as long as defined underneath the reserved `cascade` Front Matter key.

### Order Content Through Front Matter

You can assign content-specific `weight` in the front matter of your content. These values are especially useful for ordering in list views. You can use `weight` for ordering of content and the convention of [<TAXONOMY>_weight](https://gohugo.io/content-management/taxonomies/) for ordering content within a taxonomy. See [Ordering and Grouping Hugo Lists](https://gohugo.io/templates/lists/#order-content) to see how `weight` can be used to organize your content in list views.

### Draft Post

if `true`, the content will not be rendered unless the `--buildDrafts` flag is passed to the `hugo` command.

**Note**: This page has the `draft` front matter variable with value `true`, so it will not be rendered in production.
