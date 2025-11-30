import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageTopper from '../components/layout/PageTopper';
import GithubCarouselSection from '../components/sections/GithubCarouselSection';

const ProjectsPage: React.FC = () => {
    return (
        <PageLayout>
            <PageTopper
                title="GitHub Projects"
                subtitle="My open-source projects and research contributions"
                badge="50+ Repositories"
            />
            <GithubCarouselSection />
        </PageLayout>
    );
};

export default ProjectsPage;
