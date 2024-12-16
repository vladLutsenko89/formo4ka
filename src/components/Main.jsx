import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Main.css';

const Main = () => {
  return (
    <nav className="main-nav">
      <Link to="/peremishchennia" className="main-link">
        Переміщення
      </Link>
    </nav>
  );
};

export default Main;
