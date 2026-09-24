import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageTopper from '../components/layout/PageTopper';
import AchievementsSection from '../components/sections/AchievementsSection';

const AchievementsPage: React.FC = () => {
    return (
        <PageLayout>
            <PageTopper
                mark="§4.1"
                title="Hackathon"
                subtitle="A 24-hour build: privacy-preserving blockchain gaming with homomorphic encryption."
                badge="2nd place · IXH25 hackathon"
            />
            <AchievementsSection />
        </PageLayout>
    );
};

export default AchievementsPage;
