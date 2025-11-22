import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import './Stats.css';

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const stats = [
    {
      number: '10K+',
      label: 'Files Transferred',
      icon: '📁',
      color: 'purple',
      delay: 0.1,
    },
    {
      number: '99.9%',
      label: 'Uptime',
      icon: '⚡',
      color: 'blue',
      delay: 0.2,
    },
    {
      number: '50MB',
      label: 'Max File Size',
      icon: '💾',
      color: 'green',
      delay: 0.3,
    },
    {
      number: '<1s',
      label: 'Upload Speed',
      icon: '🚀',
      color: 'purple',
      delay: 0.4,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="stats" className="stats-section" ref={ref}>
      <motion.div
        className="stats-container"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`stat-card stat-${stat.color}`}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <motion.div
              className="stat-number"
              initial={{ scale: 0 }}
              animate={controls}
              transition={{ delay: stat.delay + 0.2, type: 'spring', stiffness: 200 }}
            >
              {stat.number}
            </motion.div>
            <div className="stat-label">{stat.label}</div>
            <div className={`stat-glow glow-${stat.color}`}></div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Stats;

