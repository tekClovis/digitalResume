# Step 01 — Environment setup

Goal: a minimal project where `main.ts` is compiled by `tsc` into `dist/main.js`
and loaded by `index.html` in the browser.

## Files

| File            | Role                                                              |
| --------------- | ----------------------------------------------------------------- |
| `package.json`  | Declares the only dependency (`typescript`) and `build`/`watch` scripts |
| `tsconfig.json` | Compiler config for the **browser** (see below)                   |
| `index.html`    | Page skeleton, links `style.css` and `dist/main.js`               |
| `style.css`     | Global `box-sizing` reset — styling starts in step 03             |
| `main.ts`       | Proves the pipeline works: writes a message into the page         |
| `.gitignore`    | Excludes `node_modules/` and `dist/` (generated, never submitted) |

## How it was created

```sh
npm init -y
npm install --save-dev typescript@6.0.3
```

No `ts-node`, no `@types/node`: the code runs in a browser, not in Node.js.
`@types/node` would make TypeScript accept `process`, `require`, `Buffer`…
which compile fine but crash at runtime in the browser.

## `tsconfig.json`

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "lib": ["ES2020", "DOM"],
        "strict": true,
        "outDir": "./dist"
    }
}
```

- `lib: ["DOM"]` — makes `document`, `HTMLElement`, `MouseEvent`… known to TypeScript.
- `strict: true` — same checks as `tsc --strict`, required by the subject.
- `outDir` — compiled `.js` goes to `dist/`, keeping sources and output apart.

## Linking HTML, CSS and JS

```html
<link rel="stylesheet" href="style.css" />
<script defer src="dist/main.js"></script>
```

`defer` runs the script **after** the HTML is parsed. Without it,
`document.querySelector` runs before the elements exist and returns `null`.

## `main.ts`

```ts
const tsStatus = document.querySelector<HTMLParagraphElement>("#ts-status");

if (tsStatus !== null) {
    tsStatus.textContent = "TypeScript compiled and loaded.";
}
```

- The generic `<HTMLParagraphElement>` gives the exact element type.
- `querySelector` may return `null`: it is checked explicitly, never with `!`.
- The variable is not called `status`: `main.ts` is a global script and the DOM
  lib already declares a global `status` (same for `name`), which would clash.

## Run it

```sh
npm install      # once, after a fresh clone
npm run build    # or: npx tsc
```

Open `index.html` in a browser: the paragraph must read
"TypeScript compiled and loaded.". If it still says "not loaded yet",
`dist/main.js` is missing or the `<script>` path is wrong.

During development use `npm run watch` (`tsc --watch`) and reload the page
after each change.

## Checklist

- [ ] `npx tsc` produces `dist/main.js` without errors
- [ ] The message changes when `index.html` is opened
- [ ] `node_modules/` and `dist/` are in `.gitignore`

Next: [Step 02 — HTML structure](../02-html-structure/README.md)
