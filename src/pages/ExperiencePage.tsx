import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageTopper from '../components/layout/PageTopper';
import ExperienceSection from '../components/sections/ExperienceSection';

const ExperiencePage: React.FC = () => {
    return (
        <PageLayout>
            <PageTopper
                title="Professional Experience"
                subtitle="My career journey and professional accomplishments"
                badge="3+ Years"
            />
            <ExperienceSection />
        </PageLayout>
    );
};

export default ExperiencePage;
