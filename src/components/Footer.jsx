import React from 'react';
import '../styles/FooterStyles.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <p>Copyright &copy; {currentYear} AHP_calculator</p>
    </footer>
  );
};

export default Footer;