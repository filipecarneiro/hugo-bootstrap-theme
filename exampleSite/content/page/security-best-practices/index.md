---
title: "Security Best Practices 🔒"
description: "Improve code health of your web page following these best practices. Prevent security vulnerabilities"
draft: false
tags: ["Featured"]
keywords: ["security best practices","external links","does not use https","links to cross-origin destinations are unsafe","includes front-end JavaScript libraries with known security vulnerabilities","ensure CSP is effective against XSS attacks","Content Security Policy","csp"]
---

# Security Best Practices

Improve code health of your web page following these best practices.

## Use HTTPS

All websites should be protected with HTTPS, even ones that don't handle sensitive data. HTTPS prevents intruders from tampering with or passively listening in on the communications between your site and your users.

## External Links

When you link to a page on another site using the target="_blank" attribute, you can expose your site to performance and security issues:

- The other page may run on the same process as your page. If the other page is running a lot of JavaScript, your page's performance may suffer.

- The other page can access your window object with the window.opener property. This may allow the other page to redirect your page to a malicious URL.

Adding `rel="noopener"` or `rel="noreferrer"` to your `target="_blank"` links avoids these issues.

---

All external links will have `target="_blank"` and `rel=“noopener nofollow”` attribute.

- [Salvus.Site](https://salvus.site)

- [Render-link.html help need](https://discourse.gohugo.io/t/render-link-html-help-need/30006/3)

Internal link:

- [Blog](/blog/)

## Checks your JavaScript libraries for security vulnerabilities

Intruders have automated web crawlers that can scan your site for known security vulnerabilities. When the web crawler detects a vulnerability, it alerts the intruder. From there, the intruder just needs to figure out how to exploit the vulnerability on your site.

To detect vulnerable libraries check [snyk's Vulnerability DB](https://snyk.io/vuln?packageManager=all).

## Configure Content Security Policy (CSP)

A Content Security Policy (CSP) helps to ensure any content loaded in the page is trusted by the site owner. CSPs mitigate cross-site scripting (XSS) attacks because they can block unsafe scripts injected by attackers. However, the CSP can easily be bypassed if it is not strict enough.

