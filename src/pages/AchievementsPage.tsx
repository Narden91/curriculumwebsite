import React from 'react';
import PageTopper from '../components/layout/PageTopper';
import AchievementsSection from '../components/sections/AchievementsSection';

const AchievementsPage: React.FC = () => {
    return (
        <>
            <PageTopper
                mark="§4.1"
                title="Hackathon"
                subtitle="A 24-hour build: privacy-preserving blockchain gaming with homomorphic encryption."
                badge="2nd place · IXH25 hackathon"
            />
            <AchievementsSection />
        </>
    );
};

export default AchievementsPage;
