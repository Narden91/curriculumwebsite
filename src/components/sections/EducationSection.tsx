import React from 'react';
import { educationData, type Degree } from '../../data/educationData';
import Timeline, { TimelineList, TimelineTags, type TimelineItem } from './Timeline';

function details(edu: Degree): React.ReactNode | undefined {
  const hasDetails =
    edu.dissertationTitle || edu.honors || edu.supervisors?.length || edu.additionalInfo?.length || edu.relevantCoursework?.length;
  if (!hasDetails) return undefined;
  return (
    <>
      {edu.dissertationTitle && (
        <>
          <h4 className="tl-label">Thesis</h4>
          <p className="tl-quote">{edu.dissertationTitle}</p>
        </>
      )}
      {edu.additionalInfo?.length ? <TimelineList items={edu.additionalInfo} label="Topics" /> : null}
      {edu.relevantCoursework?.length ? <TimelineTags items={edu.relevantCoursework} label="Relevant coursework" /> : null}
      {edu.honors && <span className="tl-honor">{edu.honors}</span>}
      {edu.supervisors?.length ? <p className="tl-note">Supervisors: {edu.supervisors.join(', ')}</p> : null}
    </>
  );
}

const items: TimelineItem[] = educationData.map((edu) => ({
  key: `${edu.degree}-${edu.year}`,
  date: edu.year,
  title: edu.degree,
  subtitle: `${edu.institution} · ${edu.field}`,
  content: details(edu),
}));

const EducationSection: React.FC = () => (
  <section id="education" className="section">
    <div className="container">
      <Timeline items={items} idPrefix="education" />
    </div>
  </section>
);

export default EducationSection;
