import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageTopper from '../components/layout/PageTopper';
import AchievementsSection from '../components/sections/AchievementsSection';

const AchievementsPage: React.FC = () => {
    return (
        <PageLayout>
            <PageTopper
                title="Achievements & Awards"
                subtitle="Recognition and accomplishments in hackathons and competitions"
                badge="🥈 Hackathon Winner"
            />
            <AchievementsSection />
        </PageLayout>
    );
};

export default AchievementsPage;
