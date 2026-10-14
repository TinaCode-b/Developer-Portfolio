const dateFormat = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' });

export default function ProjectCard({ repo }) {
  const { name, description, url, homepage, language, pushedAt } = repo;
  return (
    <li>
      <article className="project">
        <h3 className="project__name">{name}</h3>
        <p className={`project__text${description ? '' : ' is-empty'}`}>
          {description || 'No description on GitHub yet.'}
        </p>
        <p className="project__meta">
          {language && <span className="tag">{language}</span>}
          <span>
            Updated <time dateTime={pushedAt}>{dateFormat.format(new Date(pushedAt))}</time>
          </span>
        </p>
        <p className="project__links">
          <a href={url} target="_blank" rel="noopener noreferrer">
            View code<span className="sr-only"> for {name} on GitHub (opens in a new tab)</span>
          </a>
          {homepage && (
            <a href={homepage} target="_blank" rel="noopener noreferrer">
              Live site<span className="sr-only"> for {name} (opens in a new tab)</span>
            </a>
          )}
        </p>
      </article>
    </li>
  );
}
