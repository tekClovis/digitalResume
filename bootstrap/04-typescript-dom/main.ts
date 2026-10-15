interface Skill {
    name: string;
    level: "beginner" | "intermediate" | "expert";
}

const skills: Skill[] = [
    { name: "C", level: "intermediate" },
    { name: "TypeScript", level: "intermediate" },
    { name: "HTML/CSS", level: "beginner" },
    { name: "Git", level: "intermediate" },
    { name: "Unix shell", level: "intermediate" },
];

function renderSkill(skill: Skill): HTMLLIElement {
    const li = document.createElement("li");
    const label = document.createElement("span");
    const badge = document.createElement("span");

    li.className = "skill-item";
    label.textContent = skill.name;
    badge.className = `skill-level skill-level--${skill.level}`;
    badge.textContent = skill.level;
    li.append(label, badge);
    return li;
}

function renderSkills(list: HTMLUListElement, items: Skill[]): void {
    list.replaceChildren(...items.map(renderSkill));
}

function setupThemeToggle(button: HTMLButtonElement): void {
    button.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark");

        button.textContent = isDark ? "Light mode" : "Dark mode";
        button.setAttribute("aria-pressed", String(isDark));
    });
}

function showFeedback(form: HTMLFormElement, text: string): void {
    let feedback = form.querySelector<HTMLParagraphElement>(".form-feedback");

    if (feedback === null) {
        feedback = document.createElement("p");
        feedback.className = "form-feedback";
        feedback.setAttribute("role", "status");
        form.appendChild(feedback);
    }
    feedback.textContent = text;
}

function setupContactForm(form: HTMLFormElement): void {
    form.addEventListener("submit", (event: SubmitEvent) => {
        event.preventDefault();

        const sender = new FormData(form).get("name");
        const senderName = typeof sender === "string" ? sender.trim() : "";

        showFeedback(form, `Thank you ${senderName}, your message has been sent.`);
        form.reset();
    });
}

const skillsList = document.querySelector<HTMLUListElement>("#skills-list");
const themeToggle = document.querySelector<HTMLButtonElement>("#theme-toggle");
const contactForm = document.querySelector<HTMLFormElement>("#contact-form");

if (skillsList !== null) {
    renderSkills(skillsList, skills);
}
if (themeToggle !== null) {
    setupThemeToggle(themeToggle);
}
if (contactForm !== null) {
    setupContactForm(contactForm);
}
