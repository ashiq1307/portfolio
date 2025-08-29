import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Header = () => {
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="nav-inner">
        <motion.div 
          className="brand"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/images/profilepic.jpg" alt="Ashiq" />
          <h1>Ashiq Babu</h1>
        </motion.div>
        
        <motion.nav variants={itemVariants}>
          <motion.a 
            href="#projects"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Projects
          </motion.a>
          <motion.a 
            href="https://github.com/ashiq1307" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub style={{ marginRight: '4px' }} />
            GitHub
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/ashiq-babu-904277247/" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedin style={{ marginRight: '4px' }} />
            LinkedIn
          </motion.a>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;
