---
title: "Markdown Cheat Sheet 🥉"
draft: false
featuredImage: "/images/hugo-bootstrap-banner.png"
categories: ["General", "Featured" ]
tags: ["hugo", "markdown"]
keywords: ["hugo", "markdown","cheat sheet", "markdown cheatsheet", "hugo markdown cheat sheet", "goldmark"]
author: "Filipe Carneiro"
weight: 30
aliases:
  - my-third-blog-post
---

# Markdown Cheat Sheet

Hugo has excellent Markdown support out of the box. By default, Hugo uses the [Goldmark Markdown processor](https://github.com/yuin/goldmark/) which is fully CommonMark-compliant. See the [configuration instructions](https://gohugo.io/getting-started/configuration-markup/) to learn more about the extensions you can configure.

## Overview

You can refer to the table below for an overview of basic markdown syntax:

| TASK           | MARKDOWN SYNTAX                  |
| -------------- | -------------------------------- |
| Heading 1      | `#`                              |
| Heading 2      | `##`                             |
| Heading 3      | `###`                            |
| Italics        | `*italics*`                      |
| Bold           | `**Bold**`                       |
| Strike         | `~~strike~~`                     |
| Blockquote     | `>`                              |
| Links          | `[link name](link.com)`          |
| Unordered list | `* List item`                    |
| Ordered list   | `1. List item`                   |
| Code Block     | <code>\`insert code here\`<code> |
{.table .table-sm .table-striped .table-hover}

---

## Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

## Lists

```markdown
* Unordered item
* Unordered item
* Unordered item

1. Ordered item
2. Ordered item
3. Ordered item

- [ ] Task item
- [x] Checked Task item
- [ ] Task item
```

* Unordered item
* Unordered item
* Unordered item

1. Ordered item
2. Ordered item
3. Ordered item

- [ ] Task item
- [x] Checked Task item
- [ ] Task item

---

## Format

```markdown
**Bold**

*Italic*

<u>Underline</u>

<sup>Superscript</sup>

<sub>Subscript</sub>

<mark>Highlight</mark>

`Inline code`

$Inline math$

~~Strikethrough~~

[Hyperlink](http://example.com)

![Image](https://via.placeholder.com/50.png/09f/fff)
```

**Bold**

*Italic*

<u>Underline</u>

<sup>Superscript</sup>

<sub>Subscript</sub>

<mark>Highlight</mark>

`Inline code`

$Inline math$

~~Strikethrough~~

[Hyperlink](http://example.com)

![Image](https://via.placeholder.com/50.png/09f/fff)

---

## Table

```markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

---

## Code Block

`````
```go
package main

import "fmt"

func main() {
    fmt.Println("hello world")
}
```
`````

```go
package main

import "fmt"

func main() {
    fmt.Println("hello world")
}
```

---

## Blockquote

```markdown

> Blockquote
> Second line
> Third line
{.d-block .m-2 .p-2 .border-start .border-secondary}


```

> Blockquote  
> Second line  
> Third line
{.d-block .m-2 .p-2 .border-start .border-secondary}

---

## Math

```markdown
$$
x = 1 + y^2
$$
```

$$
x = 1 + y^2
$$

---

## HTML

```markdown
<div>
    <p>Hello world</p>
</div>
```

<div>
    <p>Hello world</p>
</div>

## See also

- [Hugo Markdown Reference](https://www.markdownguide.org/tools/hugo/)
- [Bootstrap Typography](https://getbootstrap.com/docs/5.2/content/typography/)
