import React from 'react';
import PageTopper from '../components/layout/PageTopper';
import TopicFigure from '../components/figures/TopicFigure';
import { postdocGroups, postdocSummary } from '../data/postdocData';
import './PostdocPage.css';

// Figures are numbered continuously across groups (Fig. 5.1 ... 5.n).
const firstFigure = postdocGroups.map((_, g) =>
  postdocGroups.slice(0, g).reduce((n, group) => n + group.topics.length, 1),
);

const PostdocPage: React.FC = () => (
  <>
    <PageTopper
      mark="§1.3"
      title="Postdoc research"
      subtitle="Research topics at the Center for Photonics Sciences, University of Eastern Finland: ongoing work and the research plan. Machine learning is combined with physical forward models, experimental constraints, uncertainty and statistically valid evidence."
      badge="University of Eastern Finland · 2026 -"
    />

    {postdocGroups.map((group, g) => (
      <section key={group.title} className="nb-section">
        <div className="container">
          <div className="nb-grid nb-head">
            <div className="nb-margin">
              <span className="section-mark">§1.3.{g + 1}</span>
              {group.topics.length} topics
            </div>
            <div>
              <h2 className="section-title">{group.title}</h2>
              <p className="nb-paragraph">{group.intro}</p>
            </div>
          </div>

          <ol className="topic-grid">
            {group.topics.map((topic, t) => (
              <li key={topic.id} className="topic reveal" style={{ '--i': t } as React.CSSProperties}>
                <figure className="topic-figure">
                  <TopicFigure id={topic.id} label={topic.title} />
                  <figcaption className="mono">Fig. 5.{firstFigure[g] + t}</figcaption>
                </figure>
                <h3 className="topic-title serif">{topic.title}</h3>
                <p className="topic-summary">{topic.summary}</p>
                <p className="nb-inline topic-techniques mono">
                  {topic.techniques.map((technique) => (
                    <span key={technique}>{technique}</span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ))}

    <section className="nb-section">
      <div className="container nb-grid">
        <div className="nb-margin"><span className="section-mark">In short</span></div>
        <p className="postdoc-summary serif">{postdocSummary}</p>
      </div>
    </section>
  </>
);

export default PostdocPage;
