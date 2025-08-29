import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const Projects = ({ onProjectClick }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const projects = [
    {
      id: 1,
      title: "Salary Prediction",
      description: "Gradient boosting classifier trained on cleaned adult dataset to predict >50K income. Feature engineering and model comparison included.",
      image: "/images/Perfil 2.jpg",
      alt: "Salary prediction",
      type: "github",
      url: "https://github.com/ashiq1307/Employer_salary_prediction_gradientbossting.git",
      tags: ["ML", "Python", "TensorFlow", "Gradient Boosting"]
    },
    {
      id: 2,
      title: "KISAN",
      description: "Marketplace app for farmers to sell directly to wholesalers. Uses ObjectBox locally, with planned Firebase sync and administrative MSP controls.",
      image: "/images/Screenshot 2025-08-09 110707.png",
      alt: "KISAN app",
      type: "github",
      url: "https://github.com/ashiq1307/KISAN.git",
      tags: ["Flutter", "Mobile", "ObjectBox", "Firebase"]
    },
    {
      id: 3,
      title: "AURA (In progress)",
      description: "Emotionally intelligent desktop companion robot with OLED display, speech I/O and sentiment analysis. Prototype under active development.",
      image: "/images/download (2).gif",
      alt: "AURA robot",
      type: "modal",
      modalData: {
        title: "AURA — Desktop companion (In progress)",
        content: "AURA is a compact desktop companion robot designed to assist with emotional wellbeing. Current prototype includes an OLED display, microphone/speaker, motorized expressions and basic sentiment analysis. Hardware and AI integration ongoing."
      },
      tags: ["Hardware", "AI", "Embedded", "Sentiment Analysis"]
    },
    {
      id: 4,
      title: "Test Driving App",
      description: "Concept app for scheduling and managing vehicle test drives. UX prototype with booking flow and admin dashboard planned.",
      image: "/images/porsche.jpg",
      alt: "Test drive app",
      type: "modal",
      modalData: {
        title: "Test Driving App — Prototype",
        content: "Test Driving App is a prototype for booking and managing vehicle test drives. Features planned: booking flow, admin dashboard, and analytics. UX and backend are currently in design/prototyping."
      },
      tags: ["UX Design", "Prototype", "Booking System", "Admin Dashboard"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 32,
      scale: 0.96
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const handleProjectClick = (project) => {
    if (project.type === 'github') {
      window.open(project.url, '_blank');
    } else if (project.type === 'modal') {
      onProjectClick(project);
    }
  };

  return (
    <section id="projects" className="section">
      <motion.h3
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Selected Projects
      </motion.h3>
      
      <motion.div 
        className="grid"
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="card"
            variants={cardVariants}
            whileHover={{ 
              y: -10,
              scale: 1.015,
              boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
              transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleProjectClick(project)}
          >
            <div className="thumb">
              <img src={project.image} alt={project.alt} />
              <motion.div
                className="card-overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(124, 241, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px'
                }}
              >
                {project.type === 'github' ? (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    style={{
                      background: 'rgba(0, 0, 0, 0.8)',
                      color: 'var(--accent)',
                      padding: '12px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <FaGithub />
                    View on GitHub
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    style={{
                      background: 'rgba(0, 0, 0, 0.8)',
                      color: 'var(--accent)',
                      padding: '12px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <FaExternalLinkAlt />
                    Learn More
                  </motion.div>
                )}
              </motion.div>
            </div>
            
            <div className="info">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              
              <motion.div 
                className="project-tags"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '12px'
                }}
              >
                {project.tags.map((tag, tagIndex) => (
                  <motion.span
                    key={tagIndex}
                    style={{
                      background: 'rgba(124, 241, 255, 0.1)',
                      color: 'var(--accent)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      border: '1px solid rgba(124, 241, 255, 0.2)'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * tagIndex }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
