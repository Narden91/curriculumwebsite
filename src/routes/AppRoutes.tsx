import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

// Pages are split into their own chunks; the layout (navbar, footer) is loaded once.
const HomePage = lazy(() => import('../pages/HomePage'));
const ResearchPage = lazy(() => import('../pages/ResearchPage'));
const PostdocPage = lazy(() => import('../pages/PostdocPage'));
const ExperiencePage = lazy(() => import('../pages/ExperiencePage'));
const EducationPage = lazy(() => import('../pages/EducationPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const AchievementsPage = lazy(() => import('../pages/AchievementsPage'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));

const AppRoutes = () => (
    <Routes>
        <Route element={<PageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="research" element={<ResearchPage />} />
            <Route path="postdoc" element={<PostdocPage />} />
            <Route path="experience" element={<ExperiencePage />} />
            <Route path="education" element={<EducationPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="achievements" element={<AchievementsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
    </Routes>
);

export default AppRoutes;
