import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Typewriter from 'typewriter-effect';
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa';

const Hero = ({ mousePosition }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        staggerChildren: 0.12,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const profileVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2
      }
    }
  };

  // Parallax effect based on mouse position
  const parallaxX = (mousePosition.x - window.innerWidth / 2) * 0.01;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) * 0.01;

  return (
    <motion.section 
      className="hero"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={heroVariants}
    >
      <motion.div 
        className="hero-left"
        variants={itemVariants}
        style={{
          transform: `translate(${parallaxX}px, ${parallaxY}px)`
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          I'm Ashiq —{' '}
          <span style={{ color: 'var(--accent)' }}>
                          <Typewriter
                options={{
                  strings: [
                    'building practical apps',
                    'crafting ML models',
                    'designing companion robots',
                    'creating simple UIs'
                  ],
                  autoStart: true,
                  loop: true,
                  typeSpeed: 500,
                  deleteSpeed: 100,
                  delay: 250
                  
                }}
              />
          </span>
        </motion.h2>
        
        <motion.p
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          I'm a Computer Science student with hands-on experience in Flutter, Python, TensorFlow and embedded systems. I design simple UIs and craft reliable prototypes — currently focused on KISAN, a salary prediction model, and the AURA companion robot.
        </motion.p>
        
                 <motion.div 
           className="cta"
           variants={itemVariants}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
         >
           <motion.button 
             className="btn"
             onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
             whileHover={{ scale: 1.05, y: -3 }}
             whileTap={{ scale: 0.95 }}
           >
             See projects
             <FaArrowDown />
           </motion.button>
         </motion.div>
      </motion.div>
      
      <motion.aside 
        className="hero-right"
        variants={profileVariants}
        style={{
          transform: `translate(${-parallaxX * 0.5}px, ${-parallaxY * 0.5}px)`
        }}
      >
        <motion.div 
          className="profile-card"
          whileHover={{ 
            y: -10,
            transition: { duration: 0.3 }
          }}
        >
          <motion.div 
            className="profile-pic"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <img src="/images/Screenshot 2025-08-09 111021.png" alt="Ashiq" />
          </motion.div>
          
          <motion.div 
            className="profile-meta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3>Ashiq Babu</h3>
            <p>CS Student • ML & Flutter • Aspiring CPL</p>
          </motion.div>
          
          <motion.div 
            style={{ marginTop: '16px', display: 'flex', gap: '12px' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a 
              className="btn" 
              href="https://github.com/ashiq1307" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub />
              GitHub
            </motion.a>
            <motion.a 
              className="ghost" 
              href="https://www.linkedin.com/in/ashiq-babu-904277247/" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin />
              LinkedIn
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          style={{ 
            fontSize: '0.85rem', 
            color: 'var(--muted)', 
            marginTop: '12px', 
            textAlign: 'center' 
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Phone: <a href="tel:+919074549166">9074549166</a> • <a href="mailto:ashiqb0703@gmail.com">ashiqb0703@gmail.com</a>
        </motion.div>
      </motion.aside>
    </motion.section>
  );
};

export default Hero;
