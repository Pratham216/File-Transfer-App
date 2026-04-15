import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Stats from "./components/Stats/Stats";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import FileUpload from "./components/FileUpload";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <AnimatePresence>
      <motion.div 
        className="App"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Animated Background Layers */}
        <div className="animated-bg">
          <motion.div 
            className="gradient-overlay layer-1"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="gradient-overlay layer-2"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Floating Particles - Reduced Count */}
        <div className="particles">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                left: `${(i * 5.5) % 100}%`,
                top: `${(i * 7) % 100}%`,
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, Math.sin(i) * 30, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <Hero />

        {/* Stats Section */}
        <Stats />

        {/* How It Works Section */}
        <HowItWorks />

        {/* File Upload Section */}
        <section id="upload" className="upload-section-wrapper">
          <motion.div
            className="upload-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <FileUpload />
          </motion.div>
        </section>

        {/* Footer */}
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
