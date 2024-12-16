import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const thisYear = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-info">
            <h3 className="footer-title">Армія майбутнього</h3>
            <p className="footer-copyright">{`© ${thisYear} All rights reserved`}</p>
          </div>
          <div className="footer-links">
            <Link to="/about" className="footer-link">
              Про нас
            </Link>
            <Link to="/contacts" className="footer-link">
              Контакти
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
