import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageTopper from '../components/layout/PageTopper';
import EducationSection from '../components/sections/EducationSection';

const EducationPage: React.FC = () => {
    return (
        <PageLayout>
            <PageTopper
                title="Education"
                subtitle="PhD in Artificial Intelligence (10/2025), research visit at NOVA IMS, MSc in Software Engineering."
            />
            <EducationSection />
        </PageLayout>
    );
};

export default EducationPage;
