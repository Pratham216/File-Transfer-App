import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './HowItWorks.css';

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      number: '01',
      title: 'Select Files',
      description: 'Drag and drop your files or click to browse. Support for multiple files and various formats.',
      icon: '📤',
      color: 'purple',
    },
    {
      number: '02',
      title: 'Upload & Process',
      description: 'Watch as your files are securely uploaded with real-time progress tracking.',
      icon: '⚙️',
      color: 'blue',
    },
    {
      number: '03',
      title: 'Share Instantly',
      description: 'Get a shareable link and QR code. Share with anyone, anywhere, anytime.',
      icon: '🔗',
      color: 'green',
    },
  ];

  return (
    <section id="how-it-works" className="how-it-works-section" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="section-badge">
          <span className="badge-dot"></span>
          Process
        </span>
        <h2 className="section-title">
          How It <span className="gradient-text">Works</span>
        </h2>
        <p className="section-description">
          Three simple steps to transfer your files across the digital universe
        </p>
      </motion.div>

      <div className="steps-container">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={`step-card step-${step.color}`}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-icon">{step.icon}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
            {index < steps.length - 1 && (
              <div className="step-connector">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
            <div className={`step-glow glow-${step.color}`}></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

