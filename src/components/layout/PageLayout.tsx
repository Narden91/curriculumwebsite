import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './PageLayout.css';

/** Persistent shell: navbar and footer stay mounted while the routed page changes. */
const PageLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="page-layout">
            <Navbar />
            <main className={pathname === '/' ? 'page-main page-home' : 'page-main'}>
                <Suspense fallback={<div className="page-loader" aria-busy="true" />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
};

export default PageLayout;
