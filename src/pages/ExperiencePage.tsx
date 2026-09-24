import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageTopper from '../components/layout/PageTopper';
import ExperienceSection from '../components/sections/ExperienceSection';

const ExperiencePage: React.FC = () => {
    return (
        <PageLayout>
            <PageTopper
                mark="§2"
                title="Experience"
                subtitle="Research positions, teaching and service. Select an entry for details."
            />
            <ExperienceSection />
        </PageLayout>
    );
};

export default ExperiencePage;
