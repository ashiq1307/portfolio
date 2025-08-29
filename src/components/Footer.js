import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPhone, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const footerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={footerVariants}
    >
      <motion.div 
        className="contact"
        variants={itemVariants}
      >
        <motion.a 
          href="tel:+919074549166"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <FaPhone />
          9074549166
        </motion.a>
        <motion.a 
          href="mailto:ashiqb0703@gmail.com"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <FaEnvelope />
          ashiqb0703@gmail.com
        </motion.a>
      </motion.div>
      
      <motion.div 
        style={{ 
          marginTop: '16px', 
          color: 'var(--muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
        variants={itemVariants}
      >
        © 2025 Ashiq Babu
        <motion.span
          animate={{ 
            scale: [1, 1.2, 1],
            color: ['var(--muted)', 'var(--accent)', 'var(--muted)']
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaHeart />
        </motion.span>
        Made with React & Framer Motion
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
