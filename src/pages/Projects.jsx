import { useMemo, useState } from 'react';
import ProjectCard from '../components/ProjectCard.jsx';
import useGithubRepos from '../hooks/useGithubRepos.js';
import usePageTitle from '../hooks/usePageTitle.js';
import { SITE } from '../data/site.js';

export default function Projects() {
  usePageTitle('Projects', 'Public repositories from GitHub, loaded live through the GitHub REST API.');

  const { status, repos, error, retry } = useGithubRepos(SITE.githubUser);
  const [language, setLanguage] = useState('All');

  const languages = useMemo(
    () => ['All', ...[...new Set(repos.map((r) => r.language).filter(Boolean))].sort()],
    [repos]
  );
  const visible = language === 'All' ? repos : repos.filter((r) => r.language === language);

  let statusText = '';
  if (status === 'loading') statusText = 'Loading projects from GitHub…';
  if (status === 'success') statusText = `Showing ${visible.length} of ${repos.length} projects.`;

  return (
    <section className="page container" aria-labelledby="projects-title">
      <h1 id="projects-title">Projects</h1>
      <p className="lead">
        Public repositories from my GitHub account, loaded live through the GitHub REST API.
      </p>

      {status === 'success' && languages.length > 2 && (
        <div className="chips" role="group" aria-label="Filter projects by language">
          {languages.map((lang) => (
            <button
              key={lang}
              type="button"
              className="chip"
              aria-pressed={language === lang}
              onClick={() => setLanguage(lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      )}

      <p className="status-line" role="status" aria-live="polite">
        {statusText}
      </p>

      {status === 'loading' && (
        <ul className="project-grid" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i} className="project project--skeleton">
              <span className="skeleton skeleton--title" />
              <span className="skeleton" />
              <span className="skeleton skeleton--short" />
            </li>
          ))}
        </ul>
      )}

      {status === 'error' && (
        <div className="notice" role="alert">
          <p>{error}</p>
          <button type="button" className="btn btn--ghost" onClick={retry}>
            Try again
          </button>
        </div>
      )}

      {status === 'success' && repos.length === 0 && (
        <p className="notice">No public projects yet. Check back soon.</p>
      )}

      {status === 'success' && visible.length > 0 && (
        <ul className="project-grid">
          {visible.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </ul>
      )}
    </section>
  );
}
