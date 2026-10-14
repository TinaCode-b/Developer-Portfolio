import SkillCard from './SkillCard.jsx';
import { SKILLS } from '../data/site.js';

export default function Skills() {
  return (
    <section className="section" aria-labelledby="skills-title">
      <div className="container split">
        <h2 id="skills-title" className="section__title">
          Skills
        </h2>
        <ul className="skills-grid">
          {SKILLS.map((skill) => (
            <SkillCard key={skill.id} name={skill.name} text={skill.text} status={skill.status} />
          ))}
        </ul>
      </div>
    </section>
  );
}
