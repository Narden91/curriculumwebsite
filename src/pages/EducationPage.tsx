import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageTopper from '../components/layout/PageTopper';
import EducationSection from '../components/sections/EducationSection';

const EducationPage: React.FC = () => {
    return (
        <PageLayout>
            <PageTopper
                title="Education & Certifications"
                subtitle="My academic background and continuous learning"
                badge="PhD Candidate"
            />
            <EducationSection />
        </PageLayout>
    );
};

export default EducationPage;
