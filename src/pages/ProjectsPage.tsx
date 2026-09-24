import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageTopper from '../components/layout/PageTopper';
import GithubProjectsSection from '../components/sections/GithubProjectsSection';

const ProjectsPage: React.FC = () => {
    return (
        <PageLayout>
            <PageTopper
                mark="§5"
                title="Projects"
                subtitle="Open-source code from research and side projects, pulled live from GitHub."
            />
            <GithubProjectsSection />
        </PageLayout>
    );
};

export default ProjectsPage;
