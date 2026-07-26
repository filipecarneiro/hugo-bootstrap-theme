---
title: "Markdown Cheat Sheet Ⓜ️⬇️"
date: 2022-05-16
description: "An overview of basic markdown syntax."
draft: false
tags: ["Featured"]
images: ["markdown-guide-og.jpg"]
keywords: ["markdown cheat sheet","markdown","cheat sheet", "hugo markdown cheat sheet", "goldmark"]
aliases:
  - blog/my-third-blog-post
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
| Links          | `[link name](https://link.com)`  |
| Images         | `![Image name](image.png)`       |
| Unordered list | `* List item`                    |
| Ordered list   | `1. List item`                   |
| Inline Code    | <code>\`insert code here\`<code> |
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

<!-- Hand-written HTML, not the task-list markdown shown in the code block
     above, and it renders identically. Goldmark emits a task item as a bare
     disabled checkbox with no accessible name, which a screen reader announces
     as just "checkbox" and Lighthouse reports as a form element without a
     label. Hugo has no render hook for task lists, so a label can only be
     attached by writing the markup out. -->
<ul>
  <li><input type="checkbox" id="task-item-1" disabled> <label for="task-item-1">Task item</label></li>
  <li><input type="checkbox" id="task-item-2" checked disabled> <label for="task-item-2">Checked Task item</label></li>
  <li><input type="checkbox" id="task-item-3" disabled> <label for="task-item-3">Task item</label></li>
</ul>

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

~~Strikethrough~~

[Hyperlink](http://example.com)

![Image](placeholder-50-09f-fff.png)
{ .img-fluid }
```

**Bold**

*Italic*

<u>Underline</u>

<sup>Superscript</sup>

<sub>Subscript</sub>

<mark>Highlight</mark>

`Inline code`

~~Strikethrough~~

[Hyperlink](http://example.com)

![Image](placeholder-50-09f-fff.png)
{ .img-fluid }

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

## Blockquote

```markdown
> Blockquote  
> Second line
> 
>  -- Author
```

> Blockquote  
> Second line
> 
>  -- Author

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

## HTML

```markdown
<div>
    <p>Hello world</p>
</div>
```

<div>
    <p>Hello world</p>
</div>

---

## See also

- [Hugo Markdown Reference](https://www.markdownguide.org/tools/hugo/)
- [Bootstrap Typography](https://getbootstrap.com/docs/5.3/content/typography/)
