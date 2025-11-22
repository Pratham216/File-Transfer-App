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
        {/* Animated Background */}
        <div className="animated-bg">
          <motion.div 
            className="gradient-overlay"
            animate={{
              background: [
                "linear-gradient(135deg, #100a23 0%, #1e1b4b 50%, #0f172a 100%)",
                "linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #100a23 100%)",
                "linear-gradient(135deg, #0f172a 0%, #100a23 50%, #1e1b4b 100%)",
                "linear-gradient(135deg, #100a23 0%, #1e1b4b 50%, #0f172a 100%)"
              ],
              scale: [1, 1.01, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="particles">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                left: `${(i * 3.33) % 100}%`,
                top: `${(i * 5) % 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 50, 0],
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 6 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
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
