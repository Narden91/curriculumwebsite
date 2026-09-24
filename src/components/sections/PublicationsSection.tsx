import React, { useMemo, useState } from 'react';
import { publicationsData, scholarStats, publicationsUpdatedAt, type Publication } from '../../data/publicationsData';
import { heroData } from '../../data/heroData';
import './PublicationsSection.css';

type Filter = 'all' | Publication['type'];

const TYPE_LABELS: Record<Publication['type'], string> = {
  journal: 'Journal',
  conference: 'Conference',
  preprint: 'Preprint',
  other: 'Other',
};

const count = (type: Publication['type']) => publicationsData.filter((p) => p.type === type).length;

const presentTypes = (Object.keys(TYPE_LABELS) as Publication['type'][]).filter((t) => count(t) > 0);

const PublicationsSection: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');

  const byYear = useMemo(() => {
    const groups = new Map<string, Publication[]>();
    for (const p of publicationsData) {
      if (filter !== 'all' && p.type !== filter) continue;
      const year = p.year ? String(p.year) : 'Undated';
      groups.set(year, [...(groups.get(year) ?? []), p]);
    }
    return [...groups.entries()];
  }, [filter]);

  return (
    <section id="publications" className="publications-section section">
      <div className="container">
        <dl className="pub-stats">
          {scholarStats && (
            <>
              <div className="pub-stat">
                <dt>Citations</dt>
                <dd className="mono">{scholarStats.citations}</dd>
              </div>
              <div className="pub-stat">
                <dt>h-index</dt>
                <dd className="mono">{scholarStats.hIndex}</dd>
              </div>
              <div className="pub-stat">
                <dt>i10-index</dt>
                <dd className="mono">{scholarStats.i10Index}</dd>
              </div>
            </>
          )}
          <div className="pub-stat">
            <dt>Journal articles</dt>
            <dd className="mono">{count('journal')}</dd>
          </div>
          <div className="pub-stat">
            <dt>Conference papers</dt>
            <dd className="mono">{count('conference')}</dd>
          </div>
        </dl>
        <p className="pub-source mono">
          List from <a href={heroData.orcid} target="_blank" rel="noopener noreferrer">ORCID</a>
          {scholarStats && (
            <>
              {' '}· citations from <a href={heroData.scholar} target="_blank" rel="noopener noreferrer">Google Scholar</a>{' '}
              ({scholarStats.updatedAt})
            </>
          )}
          {' '}· last sync {publicationsUpdatedAt}
        </p>

        <div className="pub-filters" role="group" aria-label="Filter by type">
          {(['all', ...presentTypes] as Filter[]).map((t) => (
            <button
              key={t}
              type="button"
              className="pub-chip"
              aria-pressed={filter === t}
              onClick={() => setFilter(t)}
            >
              {t === 'all' ? 'All' : TYPE_LABELS[t]}
              <span className="pub-chip-count mono">{t === 'all' ? publicationsData.length : count(t)}</span>
            </button>
          ))}
        </div>

        {byYear.length === 0 ? (
          <p className="pub-empty">No publications of this type yet.</p>
        ) : (
          byYear.map(([year, pubs]) => (
            <div key={year} className="pub-year-group">
              <h2 className="pub-year mono">{year}</h2>
              <ol className="pub-list">
                {pubs.map((p, i) => (
                  <li
                    key={p.doi ?? p.title}
                    className="pub-item reveal"
                    style={{ '--i': i } as React.CSSProperties}
                  >
                    <div className="pub-main">
                      <h3 className="pub-title">
                        {p.doi ? (
                          <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer">
                            {p.title}
                          </a>
                        ) : (
                          p.title
                        )}
                      </h3>
                      {p.authors.length > 0 && (
                        <p className="pub-authors">
                          {p.authors.map((a, idx) => (
                            <React.Fragment key={idx}>
                              {a.includes('Nardone') ? <strong>{a}</strong> : a}
                              {idx < p.authors.length - 1 && ', '}
                            </React.Fragment>
                          ))}
                        </p>
                      )}
                      <p className="pub-venue">
                        {p.venue && <em>{p.venue}</em>}
                        {p.volume && `, ${p.volume}`}
                        {p.pages && `, ${p.pages}`}
                      </p>
                    </div>
                    <div className="pub-meta">
                      <span className={`pub-type pub-type-${p.type}`}>{TYPE_LABELS[p.type]}</span>
                      {p.citations !== undefined && p.citations > 0 && (
                        <span className="pub-cites mono">
                          {p.citations} {p.citations === 1 ? 'citation' : 'citations'}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default PublicationsSection;
