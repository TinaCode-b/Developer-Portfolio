// Plain data, kept separate from markup — same pattern as SKILLS in
// Home.jsx. Adding or swapping a profile is a one-line change here.
const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Tinacode-b' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ernestina-boakye-dankwah' },
  { label: 'Instagram', href: 'https://www.instagram.com/iam_akuah' },
];

export default function Footer() {
  return (
    <footer className="site-footer sheet-frame">
      <p>Built section by section, rebuilt in React.</p>

      <nav className="social-links" aria-label="Social media">
        {SOCIAL_LINKS.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </nav>
    </footer>
  );
}
