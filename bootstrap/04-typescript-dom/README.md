# Step 04 — TypeScript & DOM

Goal: make the page interactive from strict TypeScript. The skills section is
rendered from a typed array, a button toggles a dark theme, and the contact
form shows a confirmation.

Starts from [step 03](../03-css-styling/README.md). Changes:

| File         | Change                                                                   |
| ------------ | ------------------------------------------------------------------------ |
| `index.html` | `#skills-list` is now **empty**; `#theme-toggle` button added to the header |
| `style.css`  | Dark theme, toggle button, skill badges, form feedback + `fade-in` keyframes |
| `main.ts`    | All the DOM logic                                                        |

## `main.ts` structure

```
interface Skill            the data shape
const skills: Skill[]      the data
renderSkill / renderSkills data -> DOM
setupThemeToggle           click listener
showFeedback               creates / updates the confirmation <p>
setupContactForm           submit listener
-- entry point --          select elements, null-check, wire everything
```

Each function receives the element it works on as a typed parameter. Only the
entry point at the bottom calls `querySelector`, so `null` is handled in one
place and the functions never deal with it.

## 1. Typed selection

```ts
const skillsList = document.querySelector<HTMLUListElement>("#skills-list");
```

Without the generic, the type is `Element | null` and properties like
`.value` or `.reset()` are not available. With it, TypeScript knows the
exact interface.

## 2. Null safety — no `!`

`querySelector` returns `null` when nothing matches. Every result is checked:

```ts
if (skillsList !== null) {
    renderSkills(skillsList, skills);
}
```

`element!` (non-null assertion) is forbidden by the subject and penalised like
`any`: it silences the check instead of handling the case.

## 3. Rendering from typed data

```ts
interface Skill {
    name: string;
    level: "beginner" | "intermediate" | "expert";
}
```

`level` is a union of string literals: `{ level: "expret" }` is a compile
error. `renderSkill` builds one `<li>` with `createElement`/`textContent`, and
`renderSkills` replaces the list content in one call:

```ts
list.replaceChildren(...items.map(renderSkill));
```

The level also becomes a CSS modifier class (`skill-level--expert`), so the
colour of each badge comes from `style.css`, not from TypeScript.

`textContent` is used rather than `innerHTML`: text is never parsed as HTML,
so data can't inject markup.

To add a skill, add one line to the `skills` array — the HTML doesn't change.

## 4. Theme toggle

```ts
const isDark = document.body.classList.toggle("dark");
```

`classList.toggle` returns the new state. TypeScript only flips a class; the
CSS overrides the `:root` variables under `body.dark`, and the `body`
transition animates the change. `aria-pressed` tells screen readers the
button state.

## 5. Contact form

```ts
form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const sender = new FormData(form).get("name");
    const senderName = typeof sender === "string" ? sender.trim() : "";
    showFeedback(form, `Thank you ${senderName}, your message has been sent.`);
    form.reset();
});
```

- `submit` only fires once the browser's own validation (`required`,
  `type="email"`) passes, so no manual validation is needed.
- `preventDefault()` stops the page reload (there is no backend).
- `FormData.get` returns `FormDataEntryValue | null` (a `string` or a `File`),
  narrowed with `typeof` instead of a cast.
- `showFeedback` creates the `<p class="form-feedback">` the first time and
  reuses it afterwards, so repeated submissions don't stack messages.
  `role="status"` makes screen readers announce it.

## 6. Why no top-level `name` or `status` variables

`main.ts` is a global script (no `import`/`export`). The DOM lib already
declares globals such as `name` and `status`; redeclaring them with `const`
fails to compile. Use specific names (`senderName`, `tsStatus`…).

## Run it

```sh
npm install
npm run build        # equivalent to: npx tsc
```

Open `index.html`, then check:

1. Five skills appear with coloured badges (none are in the HTML).
2. "Dark mode" switches the theme and becomes "Light mode".
3. Submitting an empty form is blocked by the browser.
4. A valid submission shows the green confirmation and clears the form.

## Checklist (subject constraints)

- [ ] `npx tsc --strict` compiles with 0 errors
- [ ] No `any`, no `!` non-null assertion
- [ ] At least one section rendered from a typed array (interface + loop)
- [ ] Interactive elements beyond the contact form (theme toggle)
- [ ] Visible confirmation added to the DOM after submission
- [ ] No framework, no external library
- [ ] W3C validator: 0 errors

Previous: [Step 03](../03-css-styling/README.md) · Back to [overview](../README.md)
