import { SITE } from '../data/site.js';

const LABELS = { github: 'GitHub', linkedin: 'LinkedIn', instagram: 'Instagram' };

export default function Footer() {
  const social = Object.entries(LABELS).filter(([key]) => SITE.links[key]);
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Built section by section, then rebuilt in React.
        </p>
        <ul className="site-footer__links" aria-label="Social links">
          {social.map(([key, label]) => (
            <li key={key}>
              <a href={SITE.links[key]} target="_blank" rel="noopener noreferrer">
                {label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
