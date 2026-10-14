import { useCallback, useEffect, useState } from 'react';

const TTL_MS = 10 * 60 * 1000;
const cacheKey = (user) => `gh-repos:${user}`;

// sessionStorage can throw (private mode, blocked storage), so every access is guarded.
function readCache(user) {
  try {
    const raw = sessionStorage.getItem(cacheKey(user));
    if (!raw) return null;
    const { time, repos } = JSON.parse(raw);
    return Date.now() - time < TTL_MS ? repos : null;
  } catch {
    return null;
  }
}

function writeCache(user, repos) {
  try {
    sessionStorage.setItem(cacheKey(user), JSON.stringify({ time: Date.now(), repos }));
  } catch {
    /* ignore */
  }
}

function clearCache(user) {
  try {
    sessionStorage.removeItem(cacheKey(user));
  } catch {
    /* ignore */
  }
}

const pick = (r) => ({
  id: r.id,
  name: r.name,
  description: r.description,
  url: r.html_url,
  homepage: r.homepage,
  language: r.language,
  stars: r.stargazers_count,
  pushedAt: r.pushed_at,
});

// Fetches public, non-fork repositories for a GitHub user.
// status: 'loading' | 'success' | 'error'
export default function useGithubRepos(username) {
  const [state, setState] = useState({ status: 'loading', repos: [], error: '' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const cached = readCache(username);
    if (cached) {
      setState({ status: 'success', repos: cached, error: '' });
      return undefined;
    }

    const controller = new AbortController();
    setState({ status: 'loading', repos: [], error: '' });

    fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => {
        if (res.status === 403 || res.status === 429) {
          throw new Error('GitHub is limiting requests right now. Try again in a few minutes.');
        }
        if (!res.ok) throw new Error(`GitHub returned an error (${res.status}).`);
        return res.json();
      })
      .then((data) => {
        const repos = data.filter((r) => !r.fork).map(pick);
        writeCache(username, repos);
        setState({ status: 'success', repos, error: '' });
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setState({
          status: 'error',
          repos: [],
          error: err.message || 'Could not reach GitHub. Check your connection and try again.',
        });
      });

    return () => controller.abort();
  }, [username, attempt]);

  const retry = useCallback(() => {
    clearCache(username);
    setAttempt((n) => n + 1);
  }, [username]);

  return { ...state, retry };
}
