// One skill: name, short description, and a text status (never color alone).
export default function SkillCard({ name, text, status }) {
  const learning = status === 'Learning';
  return (
    <li className="skill">
      <h3 className="skill__name">{name}</h3>
      <p className="skill__text">{text}</p>
      <p className="skill__status">
        <span className={`dot${learning ? ' dot--hollow' : ''}`} aria-hidden="true" />
        {status}
      </p>
    </li>
  );
}
