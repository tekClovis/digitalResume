# Digital Resume — Bootstrap

Step-by-step bootstrap of the *Bootcamp C to TypeScript — Days 04 & 05:
Digital Resume* subject (`../Digital_Resume.pdf`).

Each step is a **complete, standalone project** that builds on the previous
one. Open any folder, build it, and open its `index.html`.

| Step | Folder                                        | Adds                                                   |
| ---- | --------------------------------------------- | ------------------------------------------------------ |
| 01   | [`01-setup`](01-setup/README.md)                 | `npm` + TypeScript, browser `tsconfig`, HTML/CSS/JS linking |
| 02   | [`02-html-structure`](02-html-structure/README.md) | Semantic page structure, W3C-valid contact form        |
| 03   | [`03-css-styling`](03-css-styling/README.md)       | Box model, Flexbox, transitions, mobile-first responsive |
| 04   | [`04-typescript-dom`](04-typescript-dom/README.md) | Typed rendering, event listeners, form feedback, dark theme |

## Build any step

```sh
cd 0X-step-name
npm install
npm run build      # tsc -> dist/main.js
# open index.html in a browser
```

`npm run watch` recompiles on every change during development.

## Final deliverable layout

Step 04 already matches the expected deliverable:

```
project/
├── index.html
├── style.css
├── main.ts
├── package.json
├── tsconfig.json
└── .gitignore     # node_modules/ and dist/
```

Copy it to your repository root, replace the placeholder content
("Your Name", experiences, skills array) with your own, and personalise the
design.

## Constraints reminder

- HTML and CSS in separate files — no `style=""`, no `<style>`
- W3C-valid HTML
- CSS transitions or animations
- Interactions handled by TypeScript event listeners (not only the form)
- Contact form with visible feedback
- At least one section rendered from a typed array
- Responsive: mobile, tablet, desktop
- No framework or external library
- `tsc --strict` passes; no `any`, no `!`
