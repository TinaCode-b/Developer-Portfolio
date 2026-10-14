// A small, "dumb" component: it just displays whatever props it's given.
// This is the shape most reusable UI components take.
export default function SkillCard({ title, description, done }) {
  return (
    <li className="skill-card">
      <h3>
        {/* The dot's color is the visual cue, but color alone isn't
            accessible (WCAG 1.4.1) — someone using a screen reader, or
            who can't distinguish the two colors, needs the same info in
            text. The dot stays aria-hidden; this sr-only span carries
            the actual meaning. */}
        <span className={`skill-dot ${done ? 'is-done' : ''}`} aria-hidden="true"></span>
        <span className="sr-only">{done ? 'Completed: ' : 'In progress: '}</span>
        {title}
      </h3>
      <p>{description}</p>
    </li>
  );
}
