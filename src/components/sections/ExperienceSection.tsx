import React from 'react';
import { experienceData } from '../../data/experienceData';
import Timeline, { TimelineList, TimelineTags, type TimelineItem } from './Timeline';

const items: TimelineItem[] = experienceData.map((exp) => ({
  key: `${exp.role}-${exp.duration}`,
  date: exp.duration,
  title: exp.role,
  subtitle: exp.location ? `${exp.company} · ${exp.location}` : exp.company,
  content: (
    <>
      <TimelineList items={exp.responsibilities} />
      {exp.achievements?.length ? <TimelineList items={exp.achievements} label="Highlights" /> : null}
      {exp.technologies?.length ? <TimelineTags items={exp.technologies} label="Technologies" /> : null}
      {exp.supervisors?.length ? <p className="tl-note">Supervisors: {exp.supervisors.join(', ')}</p> : null}
    </>
  ),
}));

const ExperienceSection: React.FC = () => (
  <section id="experience" className="section">
    <div className="container">
      <Timeline items={items} idPrefix="experience" />
    </div>
  </section>
);

export default ExperienceSection;
