import { Link } from 'react-router-dom';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import usePageTitle from '../hooks/usePageTitle.js';

export default function Home() {
  usePageTitle(
    '',
    'Portfolio of Ernestina, a web developer and KNUST student. React projects, live GitHub repositories, and a contact form.'
  );

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__inner">
          <h1 id="hero-title">I build websites from first principles.</h1>
          <p className="lead">
            I'm Ernestina, a web developer and student at KNUST. This site began as plain HTML and
            CSS and is now a React app with a live feed of my GitHub projects.
          </p>
          <div className="actions">
            <Link to="/projects" className="btn btn--primary">
              See my projects
            </Link>
            <Link to="/contact" className="btn btn--ghost">
              Send a message
            </Link>
          </div>
        </div>
      </section>
      <About />
      <Skills />
    </>
  );
}
