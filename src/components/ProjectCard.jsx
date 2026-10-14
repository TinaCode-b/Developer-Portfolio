export default function ProjectCard({ name, description, htmlUrl, language }) {
  return (
    <article className="project-card">
      <h3>{name}</h3>
      <p>{description || 'No description provided.'}</p>
      {language && <p className="project-lang">{language}</p>}
      {/* Two a11y fixes here: screen reader users often scan a page by
          jumping link-to-link, where identical "View repo →" text on
          every card is ambiguous out of context — the sr-only span adds
          the project name back in. And target="_blank" changes context
          without warning, so we say so explicitly. */}
      <a href={htmlUrl} target="_blank" rel="noreferrer" className="project-link">
        View repo<span className="sr-only"> for {name}</span>
        <span aria-hidden="true"> →</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </article>
  );
}
