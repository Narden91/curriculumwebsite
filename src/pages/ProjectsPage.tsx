import React from 'react';
import PageTopper from '../components/layout/PageTopper';
import GithubProjectsSection from '../components/sections/GithubProjectsSection';

const ProjectsPage: React.FC = () => {
    return (
        <>
            <PageTopper
                mark="§5"
                title="Projects"
                subtitle="Open-source code from research and side projects, pulled live from GitHub."
            />
            <GithubProjectsSection />
        </>
    );
};

export default ProjectsPage;
