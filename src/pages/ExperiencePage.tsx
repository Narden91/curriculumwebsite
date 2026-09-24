import React from 'react';
import PageTopper from '../components/layout/PageTopper';
import ExperienceSection from '../components/sections/ExperienceSection';

const ExperiencePage: React.FC = () => {
    return (
        <>
            <PageTopper
                mark="§2"
                title="Experience"
                subtitle="Research positions, teaching and service. Select an entry for details."
            />
            <ExperienceSection />
        </>
    );
};

export default ExperiencePage;
