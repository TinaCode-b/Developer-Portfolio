import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard.jsx';

const GITHUB_USERNAME = 'TinaCode-b';

export default function Projects() {
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

      {isLoading && <p className="projects-status">Loading repositories…</p>}

      {error && (
        <p className="projects-status is-error">
          Couldn't load projects right now ({error}).
        </p>
      )}

      {!isLoading && !error && repos.length === 0 && (
        <p className="projects-status">No public repositories found.</p>
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
