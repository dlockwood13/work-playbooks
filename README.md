# Work Playbooks

Step-by-step, interactive playbooks for **change management, business analysis, and process improvement** - plus reusable templates, cheat sheets, and role-based career pathways. Run each playbook like a recipe: one step at a time, with progress saved locally.

**Live app:** https://dlockwood13.github.io/work-playbooks/

---

## What's inside

| Section | Contents |
|---|---|
| **Playbooks** | 47 interactive, step-by-step guides across Change Management (8), Business Analysis (30), and Process Improvement (9). |
| **Templates** | 27 ready-to-use templates across Proposals, Discovery & Onboarding, Contracts & Setup, BA Delivery (13), and Finance & Admin. |
| **Academic** | 25 study and academic-writing templates. |
| **Cheat sheets** | 4 quick references: Excel Essentials, SQL for BAs, Data Storytelling, and Statistics. |
| **Pathways** | 4 career pathways (Junior BA, BA, Senior BA, Lead BA), each with a staged learning route through the playbooks and a skills matrix. |

### The Business Analysis lifecycle

The Business Analysis playbooks are organised into a **methodology-agnostic BA lifecycle** (works for waterfall, agile, or hybrid), so you can navigate by where you are in an engagement rather than scanning a flat list:

0. **Foundations & Practice** - the lifecycle, principles, techniques, and capability
1. **Initiate & Scope** - frame the problem, vision, boundaries, roles, and objectives
2. **Understand Current State** - model how things work today before redesigning
3. **Elicit & Discover** - draw out real needs and test the riskiest assumptions
4. **Analyse & Design** - clear, testable requirements and a deliberate to-be design
5. **Prioritise, Justify & Decide** - prioritise, build the case, secure the decision
6. **Support Delivery & Validation** - keep requirements true and prove the solution works

### Career pathways & skills matrices

Each of the four roles has an ordered learning pathway that links directly to the relevant playbooks and cheat sheets, plus a skills matrix scoring 14 competencies against a 4-level scale (**Aware -> Working -> Proficient -> Expert**) with concrete guidance on how to improve and progress to the next role.

---

## Features

- **Interactive, step-by-step playbooks** built from instruction, checklist, and reference steps.
- **Progress tracking** saved per user in the browser (via IndexedDB) - your completed steps persist between visits.
- **Career pathways** that sequence content by role, with skills matrices.
- **Clickable pathway steps** that open the underlying playbook or cheat sheet.
- **Search and filter** across playbooks, templates, and cheat sheets.
- **Daily rotating quote** on the landing page.
- **Installable PWA** - works offline once loaded, with an add-to-home-screen prompt.
- **Fully responsive** for desktop and mobile.

---

## Tech stack

This app is intentionally a **single, self-contained `index.html`** - no build step and no dependencies to install.

- **React 18** via CDN (UMD build)
- **Babel Standalone** transpiles the inline JSX in the browser
- **Tailwind CSS** via CDN
- **IndexedDB** for local user accounts and progress
- **Service worker + web app manifest** (built at runtime as a Blob URL) for offline/PWA support
- Custom inline SVG icons (no icon-library dependency)

Because everything lives in one file, the app runs by simply opening `index.html` in a browser - locally or from any static host.

---

## Running locally

No install or build required:

```bash
# open the file directly in a browser
open index.html            # macOS
# or: xdg-open index.html   # Linux
# or just double-click index.html
```

If your browser restricts features on `file://`, serve the folder over HTTP instead:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

---

## Deploying

The site is hosted on **GitHub Pages**, served directly from the `main` branch root (Settings -> Pages -> "Deploy from a branch" -> `main` / `(root)`).

To publish a change, commit the updated `index.html` to `main`. GitHub Pages redeploys automatically in a minute or two - no build pipeline needed.

> This project is a single static file. There is no `src/`, bundler, or `package.json` - editing and shipping `index.html` is the whole workflow.

---

## Editing the content

All content lives in plain JavaScript arrays inside the `<script type="text/babel">` block in `index.html`. To add or change content, edit the relevant array:

| Array | What it holds |
|---|---|
| `PLAYBOOKS` | Every playbook: `id`, `title`, `category` (`change` / `ba` / `pi`), `description`, `estMinutes`, `steps[]`, optional `related[]`, and (for BA) a `stage` key. |
| `BA_LIFECYCLE` | The ordered BA lifecycle stages used to group the Business Analysis playbooks. |
| `TEMPLATES` / `TEMPLATE_CATEGORIES` | Templates and their categories. |
| `CHEAT_SHEETS` / `CHEAT_SHEET_CATEGORIES` | Cheat sheets and their categories. |
| `ACADEMIC_TEMPLATES` / `ACADEMIC_CATEGORIES` | Academic templates. |
| `PATHWAYS` / `COMPETENCY` | Career pathways, skills matrices, and the competency scale. |

**Playbook step shape:**

```js
{ type: 'instruction' | 'checklist' | 'reference',
  title: '...',
  body: '...',
  items: ['...']   // only for checklist steps
}
```

**To add a BA playbook to the lifecycle:** give it `category: 'ba'` and a `stage` matching one of the `BA_LIFECYCLE` keys (`foundations`, `initiate`, `current`, `elicit`, `design`, `decide`, `deliver`).

---

## Data & privacy

There is no backend. User accounts and progress are stored **only in the browser** via IndexedDB and never leave the device. Clearing site data resets everything.

---

## Notes

- Content is written to be **generic and brand-agnostic** so it applies to any organisation.
- Treat the app as a living reference - refine playbooks, templates, and pathways as your practice matures.
