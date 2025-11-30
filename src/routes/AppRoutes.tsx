import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('../pages/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ExperiencePage = lazy(() => import('../pages/ExperiencePage'));
const EducationPage = lazy(() => import('../pages/EducationPage'));
const ResearchPage = lazy(() => import('../pages/ResearchPage'));
const AchievementsPage = lazy(() => import('../pages/AchievementsPage'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));

/** Loading spinner shown during lazy page loading */
const PageLoader = () => (
    <div className="page-loader">
        <div className="page-loader-spinner" />
    </div>
);

const AppRoutes = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/research" element={<ResearchPage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* 404 redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
