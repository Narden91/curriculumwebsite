import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageTopper from '../components/layout/PageTopper';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';

const AboutPage: React.FC = () => {
    return (
        <PageLayout>
            <PageTopper
                mark="§4"
                title="About"
                subtitle="Background, research focus, skills, service and awards."
                badge="Postdoc · University of Eastern Finland"
            />
            <AboutSection />
            <SkillsSection />
        </PageLayout>
    );
};

export default AboutPage;
