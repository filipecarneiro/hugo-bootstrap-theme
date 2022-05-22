---
title: "{{ replace .Name "-" " " | title }}"
description: ""
date: {{ .Date }}
draft: true
images: ["{{ .Name | urlize }}.jpg"]
categories: ["General","Blog"]
tags: ["featured"]
keywords: ["{{ replace .Name "-" " " | lower }}"]
author: ""
---

![{{ replace .Name "-" " " | title }}]({{ .Name | urlize }}.jpg)
