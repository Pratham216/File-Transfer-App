import React, { useEffect, useState } from "react";
import FileUpload from "./components/FileUpload";
import Header from "./components/Header/Header";
import Features from "./components/Features/Features";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: false,
      easing: 'ease-out-cubic',
      offset: 100
    });

    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.3}px)`, // Reduced parallax effect for smoother scrolling
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="App"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Animated Background */}
        <div className="animated-bg">
          <motion.div 
            className="gradient-overlay"
            animate={{
              background: [
                "linear-gradient(45deg, #00c6ff, #0072ff)",
                "linear-gradient(45deg, #ff6b6b, #556270)",
                "linear-gradient(45deg, #00c6ff, #0072ff)"
              ],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Floating Particles with improved animation */}
        <div className="particles">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              animate={{
                y: [0, -50, 0],
                x: [0, Math.sin(i) * 30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Main Content with improved animations */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <Header />
        </motion.div>

        <motion.div 
          className="content-wrapper"
          style={parallaxStyle}
        >
          <div className="section-container" data-aos="fade-up">
            <Features />
            <About />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="upload-section"
          >
            <FileUpload />
          </motion.div>

          <motion.div 
            className="contact-wrapper"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Contact />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
