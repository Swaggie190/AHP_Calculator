import { useState } from 'react';

const AlternativesInput = ({ alternatives, onAlternativesChange, onNext, itemType = 'Phone' }) => {
  const [alternativeText, setAlternativeText] = useState(
    alternatives.join('\n')
  );
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setAlternativeText(e.target.value);
  };

  const handleSubmit = () => {
    // Parse the text into an array of alternatives
    const newAlternatives = alternativeText
      .split('\n')
      .map((alt) => alt.trim())
      .filter((alt) => alt !== '');

    // Validate that we have at least 2 alternatives
    if (newAlternatives.length < 2) {
      setError(`Please enter at least 2 ${itemType.toLowerCase()} alternatives`);
      return;
    }

    // Clear any error
    setError('');

    // Update alternatives in parent component
    onAlternativesChange(newAlternatives);
    onNext();
  };

  return (
    <div className="alternatives-input">
      <h2>Step 1: Enter {itemType} Alternatives</h2>
      <p>Enter each {itemType.toLowerCase()} alternative on a new line:</p>

      <textarea
        rows={15}
        value={alternativeText}
        onChange={handleChange}
        placeholder={`Enter each ${itemType.toLowerCase()} alternative on a new line`}
        className="alternatives-textarea"
      />

      {error && <p className="error-message">{error}</p>}

      <div className="button-container">
        <button className="primary-button" onClick={handleSubmit}>
          Next: Define Criteria
        </button>
      </div>
    </div>
  );
};

export default AlternativesInput;