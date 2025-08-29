import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import LoadingSkeleton from './components/LoadingSkeleton';
import Galaxy from './components/Galaxy';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const openModal = (project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
  };

  return (
    <div className="App">
      {/* Interactive Galaxy Background */}
      <Galaxy 
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.8}
        glowIntensity={0.6}
        saturation={0.8}
        hueShift={240}
        twinkleIntensity={0.3}
        rotationSpeed={0.03}
        repulsionStrength={2}
        transparent={true}
      />

      <Header />
      
      <main>
        <Hero mousePosition={mousePosition} />
        <Projects onProjectClick={openModal} />
      </main>

      <Footer />

      <AnimatePresence>
        {isModalOpen && (
          <ProjectModal 
            project={currentProject} 
            onClose={closeModal} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 9999,
              background: 'var(--bg)'
            }}
          >
            <LoadingSkeleton />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
