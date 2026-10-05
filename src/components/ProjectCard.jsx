export default function ProjectCard({ name, description, htmlUrl, language }) {
  return (
    <article className="project-card">
      <h3>{name}</h3>
      <p>{description || 'No description provided.'}</p>
      {language && <p className="project-lang">{language}</p>}
      <a href={htmlUrl} target="_blank" rel="noreferrer" className="project-link">
        View repo →
      </a>
    </article>
  );
}
