# Step 03 — CSS styling

Goal: a polished, responsive design with visual effects, written mobile-first,
entirely in `style.css`.

Starts from [step 02](../02-html-structure/README.md); only `style.css` changes.

## Stylesheet layout

`style.css` is split into commented blocks, in page order:

1. Reset & variables
2. Header & navigation
3. Sections
4. Skills
5. Cards (experience, education)
6. Contact form
7. Footer
8. Tablet and desktop media query
9. Reduced-motion media query

## 1. Box model reset

```css
*, *::before, *::after {
    box-sizing: border-box;
}
```

With `border-box`, `width` includes padding and border: a `200px` box stays
`200px` whatever its padding. Layouts become predictable.

## 2. CSS variables

```css
:root {
    --color-accent: #0038ff;
    --radius: 12px;
    --transition: 0.3s ease;
}
```

Every colour, radius and duration is defined once and used with `var(--…)`.
Changing the theme means changing these values only — step 04 uses this to
add a dark mode by overriding the variables.

## 3. Flexbox

Used everywhere a row/column alignment is needed:

| Selector        | Mobile            | ≥ 768px                       |
| --------------- | ----------------- | ----------------------------- |
| `.site-header`  | column, centred   | row, `space-between`          |
| `.nav-links`    | row, `wrap`       | row, `wrap`                   |
| `.skills-grid`  | column            | row + `wrap`, items `flex: 1 1 200px` |
| `.cards`        | column            | row + `wrap`, items `flex: 1 1 280px` |
| `.contact-form` | column            | column                        |

`flex: 1 1 280px` means: start at 280px, grow to fill the line, shrink if
needed — cards wrap to the next line automatically when space runs out.
`gap` handles spacing between items (no margins on children).

## 4. Transitions

```css
.card {
    transition: transform var(--transition), box-shadow var(--transition);
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
}
```

Syntax: `property duration timing-function`, comma-separated for several
properties. Transitions are applied to cards, skill items, nav links, form
fields (focus ring) and the submit button.

`prefers-reduced-motion` disables them for users who asked their OS for less
animation.

## 5. Responsive design — mobile first

Base rules target small screens (everything stacked in one column). One
`@media (min-width: 768px)` block then switches lists to rows for tablet and
desktop. Writing it this way round keeps the base CSS simple and the media
query short.

Test it with the browser dev tools (`F12` → device toolbar), at least at
375px (phone), 768px (tablet) and 1280px (desktop).

## Other details

- `position: sticky` keeps the header visible while scrolling.
- `scroll-margin-top` on sections stops the sticky header from hiding the
  section title after clicking an anchor link.
- `scroll-behavior: smooth` animates anchor navigation.
- `:focus-visible` gives keyboard users the same highlight as hover.

## Run it

```sh
npm install
npm run build
```

Open `index.html` and resize the window: the header, skills and cards switch
from one column to rows at 768px; cards lift on hover.

## Checklist

- [ ] No `style=""` in HTML, no `<style>` block
- [ ] At least one transition or animation
- [ ] Readable at 375px, 768px and 1280px, no horizontal scroll
- [ ] All colours come from the variables in `:root`

Previous: [Step 02](../02-html-structure/README.md) · Next: [Step 04 — TypeScript & DOM](../04-typescript-dom/README.md)
