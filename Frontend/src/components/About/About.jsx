import React from "react";
import "./About.css"; // Import the CSS for About section

const About = () => {
  return (
    <section id="about" className="about-section">
      <h2 className="about-title">About</h2>
      <div className="about-card">
      <p className="about-content">
      Our File Transfer App is crafted to provide a smooth and efficient file-sharing experience. Whether you're transferring large files for business or sharing personal documents, our app guarantees fast upload and download speeds. Security is our priority, with encrypted transfers ensuring your files are always protected. Designed with simplicity and cross-platform compatibility in mind, our app makes it easy to send and receive files on any device, making it the perfect solution for all your file-sharing needs.
       </p>
       </div>
    </section>
  );
};

export default About;
