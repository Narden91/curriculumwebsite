import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageTopper from '../components/layout/PageTopper';
import PublicationsSection from '../components/sections/PublicationsSection';

const ResearchPage: React.FC = () => {
    return (
        <PageLayout>
            <PageTopper
                title="Research & Publications"
                subtitle="My research contributions and academic publications"
                badge="10+ Publications"
            />
            <PublicationsSection />
        </PageLayout>
    );
};

export default ResearchPage;
