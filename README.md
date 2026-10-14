# Ernestina | Developer Portfolio

A personal developer portfolio built with React and Vite. It started as a static HTML/CSS site and was rebuilt in four course sprints: semantic foundations, responsive and interactive layouts, a React rebuild with live GitHub data, and a final polish-and-ship pass.

**Live site:** https://developer-portfolio-tina-daf2.vercel.app/

## Pages

- **Home**: hero, about, and skills
- **Projects**: public repositories loaded live from the GitHub REST API, with a language filter
- **Contact**: validated contact form

## Tech stack

- React 18 and React Router 6
- Vite 5 (build tool and dev server)
- Plain CSS with custom properties (no framework)
- Fonts: Newsreader and Hanken Grotesk (Google Fonts)

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # preview the production build
```

## Project structure

```
src/
  components/   Navbar, Footer, About, Skills, SkillCard, ProjectCard, FormField, RouteAnnouncer
  pages/        Home, Projects, Contact, NotFound (lazy-loaded routes)
  hooks/        usePageTitle, useGithubRepos
  utils/        validate, sendMessage
  data/         site.js (name, links, skills: edit this to update content)
  App.jsx       Route definitions and layout
  main.jsx      Entry point
  styles.css    All styling, organized by section
public/         favicon.svg, og-image.png, robots.txt, sitemap.xml
```

## Configuration

- **Content and links:** edit `src/data/site.js`. Set `linkedin`, `instagram`, and `email` to show them in the footer and on the Contact page. Empty values are hidden.
- **Contact form delivery:** the form validates in the browser. To actually deliver messages, create a form endpoint (for example on [Formspree](https://formspree.io)) and add its URL as the environment variable `VITE_FORM_ENDPOINT` in Vercel (Project Settings, Environment Variables), then redeploy. Without it, the form runs in demo mode and does not send anything.

## Sprint requirements checklist

### Sprint 1: Foundations
| Requirement | Where |
| --- | --- |
| HTML and semantic structure | `header`, `nav`, `main`, `section`, `article`, `footer`, one `h1` per page, ordered headings |
| CSS fundamentals and box model | `box-sizing: border-box` reset, consistent spacing scale in `styles.css` |
| Flexbox | Header, nav, button groups, footer, filter chips |
| Typography and spacing hierarchy | Two-typeface scale, fluid `clamp()` headings, line length capped near 62 characters |
| Git and GitHub basics | Repository on GitHub, this README |

### Sprint 2: Responsive and interactive
| Requirement | Where |
| --- | --- |
| CSS Grid | Section layout (title and content columns), skills grid, project grid |
| Responsive design and media queries | Mobile drawer below 700px, split layout above 900px, fluid type and spacing |
| JavaScript and DOM events | Mobile menu (click, Escape, Tab), scroll lock, form events |
| Form handling and client validation | `Contact.jsx`, `utils/validate.js`: required fields, email format, message length, inline errors |
| Transitions and micro-animations | Button, link, input, chip, and drawer transitions; one hero reveal on load |

### Sprint 3: Rebuild in React
| Requirement | Where |
| --- | --- |
| Components and JSX | `src/components`, `src/pages` |
| useState and useEffect | Navbar drawer, Contact form, language filter, `useGithubRepos` |
| React Router | `App.jsx` with `NavLink` active states and a 404 route |
| Reusable components and props | `SkillCard`, `ProjectCard`, `FormField` |
| GitHub REST API | `useGithubRepos.js`: loading, error with retry, empty state, abort on unmount, 10 minute session cache |

### Sprint 4: Polish and ship
| Requirement | Where |
| --- | --- |
| Production deployment | Vercel, with SPA rewrites and long-term asset caching in `vercel.json` |
| README and documentation | This file |
| SEO and Open Graph | Title and description per page, canonical URL, Open Graph and Twitter cards, `og-image.png`, JSON-LD, `robots.txt`, `sitemap.xml` |
| Accessibility (WCAG AA) | Skip link, visible focus rings, route-change focus and live announcement, labelled form fields with `aria-invalid` and `aria-describedby`, status never shown by color alone, 44px touch targets, `prefers-reduced-motion` respected, menu focus trap |
| Performance | Route-based code splitting, font `preconnect`, no images in the page body, minimal CSS and JS |

## Checking quality before you submit

1. Run `npm run build && npm run preview`.
2. Open Chrome DevTools, Lighthouse, and run Performance, Accessibility, Best Practices, and SEO on the live URL in an incognito window.
3. Test with the keyboard only: Tab through every page, open the mobile menu, and submit the form with errors.
4. Paste the live URL into a link-preview tool (for example opengraph.xyz) to confirm the preview image loads.

## Author

Built by Ernestina ([@TinaCode-b](https://github.com/TinaCode-b)), student at KNUST, as part of a front-end development course.
