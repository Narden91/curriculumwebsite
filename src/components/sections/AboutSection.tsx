import React from 'react';
import { aboutData } from '../../data/aboutData';

const AboutSection: React.FC = React.memo(() => {
  const [lede, ...rest] = aboutData.summary;

  return (
    <section id="about" className="nb-section">
      <div className="container">
        <div className="nb-row nb-row-first">
          <div className="nb-margin"><span className="section-mark">§4.0</span>Summary</div>
          <div>
            <p className="nb-lede serif">{lede}</p>
            {rest.map((paragraph, index) => (
              <p key={index} className="nb-paragraph">{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="nb-row">
          <div className="nb-margin">Current role</div>
          <p className="nb-paragraph">{aboutData.currentRole}</p>
        </div>

        <div className="nb-row">
          <div className="nb-margin">Research focus</div>
          <p className="nb-paragraph">{aboutData.researchFocus}</p>
        </div>

        <div className="nb-row">
          <div className="nb-margin">Expertise</div>
          <p className="nb-inline">
            {aboutData.expertise.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
