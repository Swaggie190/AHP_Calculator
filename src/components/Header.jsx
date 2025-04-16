import React from 'react';

const Header = ({ itemType = 'Phone' }) => {
  return (
    <header className="app-header">
      <h1>{itemType} Selector using AHP</h1>
      <p>
        Analytic Hierarchy Process for selecting the ideal {itemType.toLowerCase()} based on your
        preferences
      </p>
    </header>
  );
};

export default Header;