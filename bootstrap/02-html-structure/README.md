# Step 02 — HTML page structure

Goal: the full content skeleton of the resume, using semantic HTML5 and a
W3C-valid contact form. No styling yet, no behaviour yet.

Starts from [step 01](../01-setup/README.md); only `index.html` and `main.ts` change.

## Semantic layout

```
<body>
├── <header class="site-header">   brand + <nav> with anchor links
├── <main>
│   ├── <section id="profile">     <h1> name, role, pitch
│   ├── <section id="skills">      <ul id="skills-list">  (static for now)
│   ├── <section id="experience">  <ul class="cards"> of <li class="card">
│   ├── <section id="education">   same card pattern
│   └── <section id="contact">     <form id="contact-form">
└── <footer class="site-footer">
```

| Element                 | Why it is used here                                         |
| ----------------------- | ----------------------------------------------------------- |
| `<header>` / `<footer>` | Page header and footer, instead of `<div class="header">`   |
| `<nav>`                 | Groups the navigation links (`aria-label` names it)         |
| `<main>`                | The unique main content of the page                         |
| `<section id="…">`      | One per resume part; the `id` serves anchors **and** TypeScript selection |
| `<ul>` / `<li>`         | Skills, experiences and education are lists of items        |

Headings are hierarchical: one `<h1>` (your name), one `<h2>` per section,
`<h3>` per card. Never skip a level.

## Anchor navigation

`<a href="#skills">` scrolls to the element with `id="skills"`. No JavaScript
is needed for navigation.

## Contact form

```html
<label for="email">Email</label>
<input type="email" id="email" name="email" required />
```

- Each `<label for="x">` matches an `<input id="x">` — required by the W3C validator,
  and clicking the label focuses the field.
- `type="email"` and `required` give free browser validation: the `submit`
  event only fires when every field is valid.
- `name` is the key used when reading the form data in step 04.
- The button is `type="submit"`, so pressing Enter also submits.

There is no `action` attribute: there is no backend. Step 04 intercepts the
submission in TypeScript and shows a confirmation.

## The skills list is static — on purpose

`#skills-list` contains hard-coded `<li>` for now. The subject penalises
entirely static content: in step 04 these items are removed and generated from
a typed array.

## `main.ts`

Only a comment for now. It still compiles, so `dist/main.js` exists and the
`<script>` tag does not 404.

## Run it

```sh
npm install
npm run build
```

Open `index.html`: unstyled but complete content, working anchor links,
and the browser refuses to submit the form with an empty field or a bad email.

## Validate

Upload `index.html` to <https://validator.w3.org/#validate_by_upload>.
Expected result: **no errors**.

## Checklist

- [ ] One `<h1>`, then `<h2>` per section, `<h3>` per card
- [ ] Every input/textarea has a matching `<label for>`
- [ ] No `style=""` attribute, no `<style>` block
- [ ] W3C validator: 0 errors

Previous: [Step 01](../01-setup/README.md) · Next: [Step 03 — CSS styling](../03-css-styling/README.md)
