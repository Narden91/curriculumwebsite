import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './PageLayout.css';

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const isHome = location.pathname === '/';

    return (
        <div className="page-layout">
            <Navbar />
            <main className={`page-main ${isHome ? 'page-home' : ''}`}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PageLayout;
