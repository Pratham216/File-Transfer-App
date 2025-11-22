import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="grid-overlay"></div>
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
      </div>

      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="badge-dot"></span>
            Next-Gen File Transfer
          </motion.span>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Transfer Files{' '}
            <span className="gradient-text">Instantly</span>
            <br />
            Across the{' '}
            <span className="gradient-text-alt">Digital Universe</span>
          </motion.h1>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Lightning-fast, secure file sharing powered by cutting-edge technology.
            Upload, share, and download files with zero friction. Experience the future of data transfer.
          </motion.p>

          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.a 
              href="#upload"
              className="cta-button primary"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Transfer</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>

            <motion.a 
              href="#how-it-works"
              className="cta-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Learn More</span>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="transfer-animation">
            {/* Source Node */}
            <div className="node source-node">
              <div className="node-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="node-label">Source</div>
            </div>

            {/* Destination Node */}
            <div className="node dest-node">
              <div className="node-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M18 8V3M18 3H13M18 3L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="node-label">Destination</div>
            </div>

            {/* Transfer Path */}
            <div className="transfer-path">
              <svg className="path-line" viewBox="0 0 400 100" preserveAspectRatio="none">
                <path
                  d="M 50 50 Q 200 20 350 50"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Flying File Icons */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="flying-file"
                style={{
                  left: `${15 + (i * 2)}%`,
                  top: `${45 + (i % 3) * 8}%`,
                }}
                animate={{
                  x: [0, 300, 300],
                  y: [
                    0,
                    (i % 2 === 0 ? -30 : 30),
                    (i % 2 === 0 ? -40 : 40),
                  ],
                  scale: [0.8, 1.2, 1],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              >
                <div className="file-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 2V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="file-trail"></div>
                </div>
              </motion.div>
            ))}

            {/* Data Particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="data-particle"
                style={{
                  left: `${20 + (i * 3)}%`,
                  top: `${40 + (i % 4) * 12}%`,
                }}
                animate={{
                  x: [0, 280],
                  y: [0, (i % 2 === 0 ? -20 : 20)],
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              >
                <div className="particle-dot"></div>
              </motion.div>
            ))}

            {/* Speed Lines */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`speed-${i}`}
                className="speed-line"
                style={{
                  left: `${25 + (i * 5)}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  x: [0, 250],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "linear",
                }}
              />
            ))}

            {/* Speed Indicator */}
            <motion.div
              className="speed-indicator"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="speed-value">High</div>
              <div className="speed-label">Transfer Speed</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

