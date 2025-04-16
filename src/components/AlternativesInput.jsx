import { useState } from 'react';
import '../styles/AlternativesInputStyles.css';

const AlternativesInput = ({ alternatives, onAlternativesChange, onNext, itemType = 'Phone' }) => {
  const [alternativesList, setAlternativesList] = useState(
    alternatives.map(alt => alt.trim()).filter(alt => alt !== '')
  );
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [error, setError] = useState('');

  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };

  const handleAlternativeChange = (index, value) => {
    const updatedAlternatives = [...alternativesList];
    updatedAlternatives[index] = value;
    setAlternativesList(updatedAlternatives);
  };

  const handleAddAlternative = () => {
    setAlternativesList([...alternativesList, '']);
  };

  const handleRemoveAlternative = (indexToRemove) => {
    setAlternativesList(alternativesList.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = () => {
    // Filter out any empty alternatives
    const validAlternatives = alternativesList
      .map(alt => alt.trim())
      .filter(alt => alt !== '');

    // Validate that we have at least 2 alternatives
    if (validAlternatives.length < 2) {
      setError(`Please enter at least 2 ${itemType.toLowerCase()} alternatives`);
      return;
    }

    // Clear any error
    setError('');

    // Update alternatives in parent component
    onAlternativesChange(validAlternatives);
    onNext();
  };

  return (
    <div className="alternatives-input-container">
      <div className="alternatives-header">
        <div className="header-with-icon">
          <svg className="alternatives-icon" viewBox="0 0 24 24" width="28" height="28">
            <path fill="currentColor" d="M19,3H5C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z" />
          </svg>
          <h2>Enter {itemType} Alternatives</h2>
          <button className="help-button-fixed" onClick={toggleHelpModal} aria-label="Help">?</button>
        </div>
      </div>
      
      <div className="alternatives-cards-container">
        {alternativesList.map((alternative, index) => (
          <div className="alternative-card" key={index}>
            <input
              type="text"
              value={alternative}
              onChange={(e) => handleAlternativeChange(index, e.target.value)}
              placeholder={`${itemType} ${index + 1}`}
              className="alternative-input"
            />
            <button 
              className="delete-button" 
              onClick={() => handleRemoveAlternative(index)}
              aria-label="Delete alternative"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
              </svg>
            </button>
          </div>
        ))}
        
        <button className="add-alternative-button" onClick={handleAddAlternative} aria-label="Add alternative">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="button-container">
        <button className="next-button" onClick={handleSubmit}>
          Next: Define Criteria
          <svg className="arrow-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
          </svg>
        </button>
      </div>

      {showHelpModal && (
        <div className="help-modal-overlay">
          <div className="help-modal">
            <button className="close-modal" onClick={toggleHelpModal}>×</button>
            <h3>Alternatives Instructions</h3>
            <p>
              Enter the alternatives for the item chosen. For example: if the item is phone, 
              you can enter iPhone 12, Samsung Galaxy S21, etc.
            </p>
            <p>
              If you are new and want to see how it works, you can just maintain the current data 
              and move to the next page.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlternativesInput;