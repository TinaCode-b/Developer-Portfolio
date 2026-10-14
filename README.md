# Personal Developer Portfolio

A single-page developer portfolio built with React and Vite — rebuilt from an original static HTML/CSS version as a learning project, progressing through semantic markup, Flexbox/Grid layout, componentized React with client-side routing, and finally production polish (accessibility, SEO, performance).

**Live site:** [developer-portfolio-tina-daf2.vercel.app](https://developer-portfolio-tina-daf2.vercel.app/)

## Features

- **Hero, About, Skills, Projects, and Contact** sections, each a dedicated route
- **Client-side routing** with React Router — no full page reloads between pages
- **Live GitHub projects** — the Projects page fetches real repositories from the GitHub REST API on load
- **Validated contact form** — client-side validation (required fields, email format, minimum message length) with accessible error messaging
- **Responsive mobile navigation** — a slide-in drawer below 700px, with keyboard support (Escape to close, no focus trap)
- **Accessibility** — skip link, route-change focus/title management, `aria-live` status regions, WCAG AA color contrast, screen-reader-only context on ambiguous links and color-coded indicators
- **SEO** — descriptive meta tags, Open Graph and Twitter Card previews, a generated social preview image
- **Performance** — route-based code splitting so each page only loads the JavaScript it needs

## Tech stack

- [React 18](https://react.dev/)
- [React Router 6](https://reactrouter.com/)
- [Vite](https://vitejs.dev/) — build tool and dev server
- Plain CSS (no framework) with CSS custom properties for theming

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/     Reusable UI pieces (Navbar, SkillCard, ProjectCard, ...)
  pages/          One component per route (Home, Projects, Contact)
  hooks/          Shared logic (usePageTitle)
  App.jsx         Route definitions and top-level layout
  main.jsx        Entry point — renders <App /> into the DOM
  styles.css      All styling
public/
  favicon.svg
  og-image.png    Social preview image for link previews
```

## Configuration

The GitHub username used to fetch projects is set as a constant in `src/pages/Projects.jsx`:

```js
const GITHUB_USERNAME = 'TinaCode-b';
```

The canonical URL and Open Graph image URLs in `index.html` use a placeholder Vercel URL — update them to match your real deployment URL after your first deploy.

## Deployment

This project deploys to [Vercel](https://vercel.com) as a static Vite build. See the deployment steps shared alongside this README, or Vercel's own [Vite deployment guide](https://vercel.com/docs/frameworks/vite).

## Author

Built by Tina ([@TinaCode-b](https://github.com/TinaCode-b)) as part of a front-end development course, Sprint 4: Polish & Ship.
