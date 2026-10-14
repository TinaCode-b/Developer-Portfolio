import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <section className="page container" aria-labelledby="nf-title">
      <h1 id="nf-title">Page not found</h1>
      <p className="lead">That address doesn't match a page on this site.</p>
      <Link to="/" className="btn btn--primary">
        Go to the home page
      </Link>
    </section>
  );
}
