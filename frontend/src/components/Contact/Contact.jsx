import React from "react";
import "./Contact.css"; // Import the CSS for Contact section

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">Contact</h2>
      <p className="contact-content">
        Have questions or feedback? Reach out to us at <a href="mailto:support@filetransfer.com">support@filetransfer.com</a>.
      </p>
    </section>
  );
};

export default Contact;
