import React, { useState, type ReactNode } from 'react';
import { ChevronDownIcon } from '../icons';
import './Timeline.css';

export interface TimelineItem {
  key: string;
  date: string;
  title: string;
  subtitle: string;
  /** Expandable details; entries without it render as a plain, non-interactive row. */
  content?: ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  /** Prefix for the panel ids that aria-controls points to. */
  idPrefix: string;
}

/** Left-rail timeline shared by Experience and Education. The first entry starts open. */
const Timeline: React.FC<TimelineProps> = ({ items, idPrefix }) => {
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set(items[0] ? [items[0].key] : []));

  const toggle = (key: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(key)) next.add(key);
      return next;
    });

  return (
    <ol className="tl">
      {items.map((item, index) => {
        const isOpen = open.has(item.key);
        const panelId = `${idPrefix}-panel-${index}`;
        const expandable = item.content != null;
        return (
          <li key={item.key} className="tl-item reveal" style={{ '--i': index } as React.CSSProperties}>
            <span className="tl-date mono">{item.date}</span>
            <div className="tl-body">
              <button
                type="button"
                className="tl-head"
                aria-expanded={expandable ? isOpen : undefined}
                aria-controls={expandable ? panelId : undefined}
                onClick={() => toggle(item.key)}
                disabled={!expandable}
              >
                <span className="tl-title">{item.title}</span>
                <span className="tl-sub">{item.subtitle}</span>
                {expandable && <ChevronDownIcon className="tl-chevron" />}
              </button>
              {expandable && (
                <div id={panelId} className="tl-panel" hidden={!isOpen}>
                  {item.content}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Timeline;

/** Bulleted list used inside timeline panels. */
export const TimelineList: React.FC<{ items: string[]; label?: string }> = ({ items, label }) => (
  <>
    {label && <h4 className="tl-label">{label}</h4>}
    <ul className="tl-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </>
);

/** Monospace tags (technologies, coursework) used inside timeline panels. */
export const TimelineTags: React.FC<{ items: string[]; label: string }> = ({ items, label }) => (
  <ul className="tl-tags" aria-label={label}>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);
