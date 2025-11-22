import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-brand">
            <div className="footer-logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="footer-title">TransferHub</h3>
            <p className="footer-tagline">
              Next-generation file transfer technology. Fast, secure, and reliable.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-heading">Product</h4>
              <ul className="footer-list">
                <li><a href="#hero">Home</a></li>
                <li><a href="#upload">Upload</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#stats">Stats</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Resources</h4>
              <ul className="footer-list">
                <li><a href="#">Documentation</a></li>
                <li><a href="#">API Reference</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Connect</h4>
              <ul className="footer-list">
                <li><a href="#">GitHub</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Discord</a></li>
                <li><a href="#">Email</a></li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="footer-divider"></div>
          <div className="footer-copyright">
            <p>&copy; {currentYear} TransferHub. All rights reserved.</p>
            <p className="footer-tech">
              Built with <span className="heart">❤️</span> using cutting-edge technology
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

