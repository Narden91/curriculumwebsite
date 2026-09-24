import React from 'react';
import { Link } from 'react-router-dom';
import { technicalSkillsData, certificationsData, languagesData, professionalAchievementsData } from '../../data/publicationsData';

const SkillsSection: React.FC = React.memo(() => {
  return (
    <section id="skills" className="nb-section">
      <div className="container">
        <div className="nb-grid nb-head">
          <div className="nb-margin"><span className="section-mark">§4.1</span>Record</div>
          <h2 className="section-title">Skills, service and awards</h2>
        </div>

        {Object.entries(technicalSkillsData).map(([category, skills]) => (
          <div key={category} className="nb-row">
            <div className="nb-margin">{category}</div>
            <p className="nb-inline">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </p>
          </div>
        ))}

        <div className="nb-row">
          <div className="nb-margin">Service &amp; awards</div>
          <ul className="nb-entries">
            {professionalAchievementsData.map((a) => (
              <li key={a.title}>
                <p className="nb-entry-title">
                  {a.type === 'award' ? <span className="award-mark">{a.title}</span> : a.title}
                  {a.date && <span className="nb-entry-date mono">{a.date}</span>}
                </p>
                <p className="nb-entry-sub">{a.organization}</p>
                <p className="nb-entry-text">{a.description}</p>
              </li>
            ))}
            <li>
              <p className="nb-entry-title">
                Hackathons
                <span className="nb-entry-date mono">2025</span>
              </p>
              <p className="nb-entry-text">
                2nd place, Advanced Cryptography Track, IXH25 Italian XRPL Hackathon.{' '}
                <Link to="/achievements" viewTransition>Read the case study &rarr;</Link>
              </p>
            </li>
          </ul>
        </div>

        <div className="nb-row">
          <div className="nb-margin">Certifications</div>
          <ul className="nb-entries">
            {certificationsData.map((c) => (
              <li key={c.name}>
                <p className="nb-entry-title">
                  {c.name}
                  <span className="nb-entry-date mono">{c.date}</span>
                </p>
                <p className="nb-entry-sub">{c.issuer}</p>
                {c.description && <p className="nb-entry-text">{c.description}</p>}
              </li>
            ))}
          </ul>
        </div>

        <div className="nb-row">
          <div className="nb-margin">Languages</div>
          <p className="nb-inline">
            {languagesData.map((l) => (
              <span key={l.language}>
                {l.language} <span className="mono nb-level">{l.level}</span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;
