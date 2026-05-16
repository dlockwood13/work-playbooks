# Work Playbooks

Step-by-step interactive playbooks for change management, business analysis, and process improvement.

## Features
- 20 interactive playbooks across Change, BA, and Process Improvement
- 11 freelance templates (proposals, contracts, discovery, finance)
- 4 cheat sheets (Excel, SQL, Data Storytelling, Statistics)
- Progress tracking saved locally per user
- Daily rotating quote
- Sections-first landing; subsections as modal drill-downs
- Mobile responsive

## Stack
- React 18 + Vite
- Tailwind CSS via CDN (no build step needed)
- Lucide React icons
- LocalStorage for persistence

## Local development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

```bash
npm install
npm run deploy
```

This runs `vite build` then `gh-pages -d dist`.

**Required GitHub setup:**
1. Go to repo Settings → Pages
2. Set Source to `gh-pages` branch
3. Your site will be live at `https://<username>.github.io/work-playbooks/`

## Manual deploy (no npm)

If you prefer, just run:
```bash
npm install
npm run build
```
Then push the `dist/` folder contents to your `gh-pages` branch manually.

## Tailwind CDN

This project uses Tailwind via CDN for zero build-step styling. If you want to switch to the PostCSS plugin for tree-shaking, install `tailwindcss`, `postcss`, and `autoprefixer`, then add a `tailwind.config.js`.
