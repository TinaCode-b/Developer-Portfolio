import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard.jsx';
import usePageTitle from '../hooks/usePageTitle.js';

const GITHUB_USERNAME = 'TinaCode-b';

export default function Projects() {
  usePageTitle('Projects');

  // Three pieces of state: the data itself, whether we're still loading,
  // and whether something went wrong. Each one drives a different part
  // of the UI below.
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect with an empty dependency array ([]) means: run this once,
  // right after the component first renders — this is the React
  // equivalent of "when the page loads, go fetch the data."
  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`
        );

        if (!response.ok) {
          throw new Error(`GitHub API responded with ${response.status}`);
        }

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return (
    <section className="projects sheet-frame">
      <h2>Projects</h2>
      <p className="section-lede">
        Live from my GitHub — pulled dynamically via the GitHub REST API.
      </p>

      {/* role="status" + aria-live="polite" means a screen reader
          announces this text whenever it changes, even though focus
          stays wherever the user already was — important here because
          fetching happens automatically, with no user-initiated action
          like a button click to anchor the announcement to. */}
      {isLoading && (
        <p className="projects-status" role="status" aria-live="polite">
          Loading repositories…
        </p>
      )}

      {error && (
        <p className="projects-status is-error" role="status" aria-live="polite">
          Couldn't load projects right now ({error}).
        </p>
      )}

      {!isLoading && !error && repos.length === 0 && (
        <p className="projects-status" role="status" aria-live="polite">
          No public repositories found.
        </p>
      )}

      <div className="projects-grid">
        {repos.map((repo) => (
          <ProjectCard
            key={repo.id}
            name={repo.name}
            description={repo.description}
            htmlUrl={repo.html_url}
            language={repo.language}
          />
        ))}
      </div>
    </section>
  );
}
