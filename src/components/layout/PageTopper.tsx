import React from 'react';
import './PageTopper.css';

interface PageTopperProps {
    title: string;
    subtitle?: string;
    badge?: string;
    /** Section mark shown before the badge, e.g. "§1" */
    mark?: string;
}

const PageTopper: React.FC<PageTopperProps> = ({ title, subtitle, badge, mark }) => {
    return (
        <div className="page-topper">
            <div className="page-topper-content">
                {(mark || badge) && (
                    <div className="page-badge">
                        {mark && <span className="page-mark">{mark}</span>}
                        {badge}
                    </div>
                )}
                <h1 className="page-title">{title}</h1>
                {subtitle && <p className="page-subtitle">{subtitle}</p>}
            </div>
        </div>
    );
};

export default PageTopper;
