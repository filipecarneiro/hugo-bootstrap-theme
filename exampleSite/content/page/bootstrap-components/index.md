---
title: "Bootstrap Components ✨"
description: "Bootstrap is bundled with tens of components that can be reused to provide a good user experience and user interactions in a web page."
draft: false
tags: ["Featured"]
images: ["bootstrap-v5-new-logo.png","hugo-bootstrap-banner.png"]
keywords: ["bootstrap components","bootstrap","hugo bootstrap theme"]
---

# Bootstrap Components

Bootstrap is bundled with tens of components that can be reused to provide a good user experience and user interactions in a web page.

---

## Accordion

<br>

<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>

<br>

See [Accordion documentation](https://getbootstrap.com/docs/5.3/components/accordion/).

---

## Alert

<br>

<div class="alert alert-primary" role="alert">
  A simple primary alert—check it out!
</div>
<div class="alert alert-secondary" role="alert">
  A simple secondary alert—check it out!
</div>
<div class="alert alert-success" role="alert">
  A simple success alert—check it out!
</div>
<div class="alert alert-danger" role="alert">
  A simple danger alert—check it out!
</div>
<div class="alert alert-warning" role="alert">
  A simple warning alert—check it out!
</div>
<div class="alert alert-info" role="alert">
  A simple info alert—check it out!
</div>
<div class="alert alert-light" role="alert">
  A simple light alert—check it out!
</div>
<div class="alert alert-dark" role="alert">
  A simple dark alert—check it out!
</div>

<br>

See [Alert documentation](https://getbootstrap.com/docs/5.3/components/alerts/).

---

## Badge

<br>

<p>Text with badge <span class="badge bg-primary">New</span></p>

<br>

<button type="button" class="btn btn-primary">
  Button <span class="badge text-bg-secondary">4</span>
</button>

<br>
<br>

<button type="button" class="btn btn-primary position-relative">
  Positioned
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    99+
    <span class="visually-hidden">unread messages</span>
  </span>
</button>

<br>
<br>

<button type="button" class="btn btn-primary position-relative">
  Profile
  <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
    <span class="visually-hidden">New alerts</span>
  </span>
</button>

<br>
<br>

<span class="badge rounded-pill text-bg-success">Rounded pill</span>

<br>

See [Badge documentation](https://getbootstrap.com/docs/5.3/components/badge/).

---

## Button

<br>

<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>

<button type="button" class="btn btn-link">Link</button>

<br>

See [Button documentation](https://getbootstrap.com/docs/5.3/components/buttons/).

---

## Card

<br>

<div class="card w-50">
  <img src="picsum-photo-300x200.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#card" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

<br>

See [Card documentation](https://getbootstrap.com/docs/5.3/components/card/).

---

## List group

<br>

<ul class="list-group">
  <li class="list-group-item">An item</li>
  <li class="list-group-item">A second item</li>
  <li class="list-group-item">A third item</li>
  <li class="list-group-item">A fourth item</li>
  <li class="list-group-item">And a fifth one</li>
</ul>

<br>

See [List group documentation](https://getbootstrap.com/docs/5.3/components/list-group/).

---

### Creating your own

Read the [customize components page](https://getbootstrap.com/docs/5.3/customize/components/) to learn how build your own components.

---

## Callout

<br>

<div class="callout">
    <strong>This is a callout.</strong> We built it custom for our docs so our messages to you stand out. It has three variants via modifier classes.
</div>

<div class="callout callout-info">
    <strong>This is an info callout.</strong> Example text to show it in action.
</div>

<div class="callout callout-warning">
    <strong>This is a warning callout.</strong> Example text to show it in action.
</div>

<div class="callout callout-danger">
    <strong>This is a danger callout.</strong> Example text to show it in action.
</div>

<br>

---

## Tooltip

<br>

<div class="tooltip">
  <p class="">
  Placeholder text to demonstrate some <a href="#" data-bs-toggle="tooltip" data-bs-title="Default tooltip">inline links</a> with tooltips. This is now just filler, no killer. Content placed here just to mimic the presence of <a href="#" data-bs-toggle="tooltip" data-bs-title="Another tooltip">real text</a>. And all that just to give you an idea of how tooltips would look when used in real-world situations. So hopefully you've now seen how <a href="#" data-bs-toggle="tooltip" data-bs-title="Another one here too">these tooltips on links</a> can work in practice, once you use them on <a href="#" data-bs-toggle="tooltip" data-placement="bottom" data-bs-title="The last tip!">your own</a> site or project.
  </p>
</div>

<br>
