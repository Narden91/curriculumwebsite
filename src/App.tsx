// import { useState, useEffect } from 'react';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import EducationSection from './components/sections/EducationSection';
import ExperienceSection from './components/sections/ExperienceSection';
import PublicationsSection from './components/sections/PublicationsSection';
import AchievementsSection from './components/sections/AchievementsSection';
import GithubCarouselSection from './components/sections/GithubCarouselSection';
import ThemeToggleButton from './components/ui/ThemeToggleButton';
import InteractiveAiBackground from './components/ui/InteractiveAiBackground';
import Header from './components/common/Header';
import './App.css';

/**
 * Main App component featuring an interactive AI/Evolutionary Algorithm background.
 * Portfolio of Emanuele Nardone - PhD in Artificial Intelligence
 * 
 * The background visualizes concepts from evolutionary algorithms:
 * - Particles represent individuals in a population
 * - Neural connections between particles show relationships
 * - Visual elements for selection, crossover, and mutation appear over time
 * - Clicking in the background creates new particles and evolves the network
 * - Colored particles represent different generations
 */
function App() {
  // const [showInfo, setShowInfo] = useState(true);

  // // Hide the info badge after 10 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowInfo(false);
  //   }, 10000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="app">
      <InteractiveAiBackground />
      <Header />
      <ThemeToggleButton />
      <div className="content-wrapper">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <PublicationsSection />
        <AchievementsSection />
        <GithubCarouselSection />

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="container">
            <div className="section-header">
              <div className="section-number">07</div>
              <h2 className="section-title display-2">Get In Touch</h2>
              <p className="section-description">
                Let's connect and explore opportunities together.
              </p>
            </div>

            <div className="contact-content">
              <div className="contact-intro">
                <h3 className="contact-subtitle">Let's Start a Conversation</h3>
                <p className="contact-text">
                  Whether you're interested in AI research collaboration, seeking consultation on machine learning projects,
                  or looking to discuss potential opportunities in medical diagnostics and handwriting analysis,
                  I'd love to hear from you.
                </p>
              </div>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-method-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="contact-method-content">
                    <h4 className="contact-method-title">Email</h4>
                    <p className="contact-method-description">Drop me a line for research collaboration or project discussions</p>
                    <a href="mailto:emanuele.nardone@unicas.it" className="contact-method-link">
                      emanuele.nardone@unicas.it
                    </a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method-icon">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div className="contact-method-content">
                    <h4 className="contact-method-title">LinkedIn</h4>
                    <p className="contact-method-description">Connect with me for professional networking and collaborations</p>
                    <a href="https://www.linkedin.com/in/emanuelenardone/" target="_blank" rel="noopener noreferrer" className="contact-method-link">
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="contact-method-content">
                    <h4 className="contact-method-title">Location</h4>
                    <p className="contact-method-description">Based in Italy, available for remote collaboration worldwide</p>
                    <span className="contact-method-link">
                      Cassino, Italy
                    </span>
                  </div>
                </div>
              </div>

              <div className="contact-cta">
                <h3 className="contact-cta-title">Ready to Collaborate?</h3>
                <p className="contact-cta-text">
                  I'm always open to discussing new research opportunities, innovative AI projects,
                  and potential collaborations in the field of medical diagnostics and machine learning.
                </p>
                <div className="contact-buttons">
                  <a href="mailto:emanuele.nardone@unicas.it" className="btn btn-primary">
                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Send Email
                  </a>
                  <a href="https://www.linkedin.com/in/emanuelenardone/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <svg className="btn-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-left">
                <h3>Emanuele Nardone</h3>
                <p>PhD Student in Artificial Intelligence </p>
              </div>
              <div className="footer-right">
                <p>&copy; {new Date().getFullYear()} Emanuele Nardone. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}

export default App;