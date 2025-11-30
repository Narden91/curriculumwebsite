import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageTopper from '../components/layout/PageTopper';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';

const AboutPage: React.FC = () => {
    return (
        <PageLayout>
            <PageTopper
                title="About Me"
                subtitle="Get to know more about my background, skills, and interests"
                badge="PhD in Artificial Intelligence"
            />
            <AboutSection />
            <SkillsSection />
        </PageLayout>
    );
};

export default AboutPage;
