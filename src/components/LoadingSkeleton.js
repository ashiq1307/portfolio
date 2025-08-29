import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  const shimmerVariants = {
    shimmer: {
      x: [-200, 200],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="loading-skeleton">
      {/* Header Skeleton */}
      <motion.div 
        className="skeleton-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="skeleton-brand">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-text"></div>
        </div>
        <div className="skeleton-nav">
          <div className="skeleton-nav-item"></div>
          <div className="skeleton-nav-item"></div>
          <div className="skeleton-nav-item"></div>
        </div>
      </motion.div>

      {/* Hero Skeleton */}
      <motion.div 
        className="skeleton-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="skeleton-hero-left">
          <div className="skeleton-title"></div>
          <div className="skeleton-subtitle"></div>
          <div className="skeleton-description"></div>
          <div className="skeleton-buttons">
            <div className="skeleton-button"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
        <div className="skeleton-hero-right">
          <div className="skeleton-profile-card">
            <div className="skeleton-profile-pic"></div>
            <div className="skeleton-profile-info">
              <div className="skeleton-name"></div>
              <div className="skeleton-bio"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Shimmer Effect Overlay */}
      <motion.div
        className="shimmer-overlay"
        variants={shimmerVariants}
        animate="shimmer"
      />
    </div>
  );
};

export default LoadingSkeleton;
