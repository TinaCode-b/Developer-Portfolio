// A small, "dumb" component: it just displays whatever props it's given.
// This is the shape most reusable UI components take.
export default function SkillCard({ title, description, done }) {
  return (
    <li className="skill-card">
      <h3>
        <span className={`skill-dot ${done ? 'is-done' : ''}`} aria-hidden="true"></span>
        {title}
      </h3>
      <p>{description}</p>
    </li>
  );
}
