import SkillCard from '../components/SkillCard.jsx';
import usePageTitle from '../hooks/usePageTitle.js';

// Plain data, not JSX. Keeping it separate from the markup means
// adding a 6th skill is a one-line change, not a copy-pasted block.
const SKILLS = [
  { title: 'Semantic HTML', description: 'Structuring content with the right element for the job.', done: true },
  { title: 'CSS & the box model', description: 'Margin, border, padding, content — and how they interact.', done: true },
  { title: 'Flexbox layout', description: 'Arranging and aligning content along a single axis.', done: true },
  { title: 'Typography & spacing', description: 'Building a readable hierarchy with type and rhythm.', done: true },
  { title: 'React components & JSX', description: 'Breaking the UI into small, reusable, composable pieces.', done: false },
];

export default function Home() {
  usePageTitle(null);

  return (
    <>
      <section className="hero sheet-frame">
        <span className="hero-kicker">Web Developer · KNUST</span>
        <h1 className="hero-title">
          Personal <span className="accent">Developer</span> Portfolio
        </h1>
        <p className="hero-sub">
          Built in React: components, state, routing, and a live feed
          of my GitHub projects — instead of one static HTML file.
        </p>
      </section>

      <section className="about sheet-frame">
        <h2>About</h2>
        <p>
          I'm Ernestina — a web developer and student at KNUST (Kwame
          Nkrumah University of Science and Technology). I'm learning to
          build for the web from first principles, and this page is proof
          of that progression.
        </p>
        <p>
          It started as plain semantic HTML and CSS, and is now
          componentized React with client-side routing, a live GitHub feed,
          and production polish — accessibility, SEO, and performance.
        </p>
      </section>

      <section className="skills sheet-frame">
        <h2>Skills under construction</h2>
        <ul className="skills-grid">
          {SKILLS.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </ul>
      </section>
    </>
  );
}
