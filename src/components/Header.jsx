import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logoImage from '../images/prapor-148.png';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-content">
            <div className="logo-container">
              <Link to="/" className="logo-link">
                <img src={logoImage} alt="Your Logo" className="logo-image" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
