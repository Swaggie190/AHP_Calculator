import React, { useState } from 'react';
import '../styles/HeaderStyles.css';

const Header = ({ itemType = 'Phone' }) => {
  const [showHelpModal, setShowHelpModal] = useState(false);

  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-title">
          <svg className="ahp-logo" viewBox="0 0 24 24" width="36" height="36">
            <path fill="currentColor" d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z" />
          </svg>
          <h1 className="ahp-title">AHP CALCULATOR</h1>
        </div>
        <p className="subtitle">Select the ideal item based on your preferences</p>
        <button className="help-button" onClick={toggleHelpModal} aria-label="Help">?</button>
      </div>
      
      {showHelpModal && (
        <div className="help-modal-overlay">
          <div className="help-modal">
            <button className="close-modal" onClick={toggleHelpModal}>×</button>
            <h3>About AHP Calculator</h3>
            <p>
              The Analytic Hierarchy Process (AHP) is a structured technique for organizing and analyzing 
              complex decisions. This calculator helps you:
            </p>
            <ul>
              <li>Break down your decision into comparable criteria</li>
              <li>Compare alternatives based on your preferences</li>
              <li>Calculate the optimal choice using mathematical principles</li>
            </ul>
            <p>
              Perfect for making informed decisions when selecting products, services, 
              or solutions with multiple competing factors.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;