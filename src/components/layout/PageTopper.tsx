import React from 'react';
import './PageTopper.css';

interface PageTopperProps {
    title: string;
    subtitle?: string;
    badge?: string;
}

const PageTopper: React.FC<PageTopperProps> = ({ title, subtitle, badge }) => {
    return (
        <div className="page-topper">
            <div className="page-topper-content">
                {badge && <div className="page-badge">{badge}</div>}
                <h1 className="page-title">{title}</h1>
                {subtitle && <p className="page-subtitle">{subtitle}</p>}
            </div>
        </div>
    );
};

export default PageTopper;
