import React from 'react';
import PageTopper from '../components/layout/PageTopper';
import EducationSection from '../components/sections/EducationSection';

const EducationPage: React.FC = () => {
    return (
        <>
            <PageTopper
                mark="§3"
                title="Education"
                subtitle="PhD in Artificial Intelligence (10/2025), research visit at NOVA IMS, MSc in Software Engineering."
            />
            <EducationSection />
        </>
    );
};

export default EducationPage;
