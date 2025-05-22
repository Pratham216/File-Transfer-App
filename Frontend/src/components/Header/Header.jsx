import React from "react";
import "./Header.css"; 
import Button from "../Button/Button";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">FileTransfer</div>
      <nav>
        <ul className="nav-list">
          <li>
            <a href="#features" className="nav-item">
              Features
            </a>
          </li>
          <li>
            <a href="#about" className="nav-item">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-item">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <Button/>
    </header>
  );
};

export default Header;
