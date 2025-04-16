import { useState, useEffect } from 'react';

const AlternativesSpecificationInput = ({
  alternatives,
  criteria,
  criteriaWeights,
  specifications,
  onSpecificationsChange,
  onPrevious,
  onNext,
  itemType = 'Phone'
}) => {
  // Initialize specifications as a matrix: alternatives x criteria
  const [localSpecifications, setLocalSpecifications] = useState(specifications);
  const [showDefaultsButton, setShowDefaultsButton] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Reset specifications when alternatives or criteria change
  useEffect(() => {
    setLocalSpecifications(specifications);
  }, [specifications]);

  // Handle a change in specification value
  const handleSpecificationChange = (altIndex, critIndex, value) => {
    const newSpecifications = [...localSpecifications];
    newSpecifications[altIndex][critIndex] = value;
    setLocalSpecifications(newSpecifications);
    onSpecificationsChange(newSpecifications);
  };

  // Check if all specifications are filled
  const allSpecificationsFilled = localSpecifications.every(altSpecs => 
    altSpecs.every(spec => spec !== "")
  );

  // Toggle help modal
  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };

  // Fill with sample data for demonstration purposes
  const fillWithSampleData = () => {
    // Default values based on criteria and item type
    let defaultValues;
    
    if (itemType === 'Phone') {
      defaultValues = [
        // Memory(GB), Storage(GB), CPU(GHz), Price(FCFA), Brand(1-10)
        ['6', '128', '2.8', '650000', '9'],    // iPhone 12
        ['4', '64', '1.8', '87000', '5'],     // ItelA56
        ['6', '128', '2.0', '115000', '6'],    // Tecno Camon 12
        ['4', '64', '2.0', '100000', '6'],     // Infinix Hot 10
        ['8', '256', '2.6', '405000', '8'],    // Huawei P30
        ['8', '128', '2.8', '350000', '8'],    // Google Pixel 7
        ['6', '128', '2.2', '150000', '7'],    // Xiaomi Redmi Note 10
        ['8', '256', '3.0', '465000', '9'],    // Samsung Galaxy S22
        ['8', '256', '3.2', '700000', '8'],   // Motorola Razr+
        ['3', '64', '2.5', '350000', '9'],     // iPhone XR
        ['8', '256', '2.7', '405000', '9'],    // Samsung Galaxy Note 10
      ];
    } else if (itemType === 'Laptop') {
      // Example specs for laptops from lecture notes
      defaultValues = [
        ['350000', '1000', '2.1', '16', '8'],  // ASUS
        ['275000', '500', '3.2', '16', '7'],   // LENOVO
        ['375000', '1000', '2.7', '8', '8'],   // DELL
      ];
    } else {
      // Generate sample data for other item types
      defaultValues = alternatives.map((alt, index) => {
        return criteria.map((crit, critIndex) => {
          if (crit.toLowerCase().includes('price')) {
            return `${(index + 1) * 100 + 200}`;
          } else if (crit.toLowerCase().includes('memory') || crit.toLowerCase().includes('ram')) {
            return `${4 + index % 5}`;
          } else if (crit.toLowerCase().includes('storage')) {
            return `${64 * (1 + index % 4)}`;
          } else if (crit.toLowerCase().includes('cpu') || crit.toLowerCase().includes('frequency')) {
            return `${2.0 + (index % 10) / 10}`;
          } else if (crit.toLowerCase().includes('brand')) {
            return `${5 + index % 5}`;
          } else {
            return `${5 + index % 5}`;
          }
        });
      });
    }
    
    // Trim the defaultValues to match the current number of alternatives and criteria
    const trimmedDefaults = defaultValues.slice(0, alternatives.length).map(
      specs => specs.slice(0, criteria.length)
    );
    
    // Fill any missing values with defaults
    const newSpecs = alternatives.map((alt, altIndex) => {
      return criteria.map((crit, critIndex) => {
        // Use existing specification if available, otherwise use default
        if (trimmedDefaults[altIndex] && trimmedDefaults[altIndex][critIndex] !== undefined) {
          return trimmedDefaults[altIndex][critIndex];
        }
        // Fallback values
        if (crit.toLowerCase().includes('price')) {
          return `${(altIndex + 1) * 100 + 200}`;
        } else {
          return `${5 + altIndex % 5}`;
        }
      });
    });
    
    setLocalSpecifications(newSpecs);
    onSpecificationsChange(newSpecs);
    setShowDefaultsButton(false);
  };

  return (
    <div className="specifications-input">
      <div className="criteria-header">
        <div className="header-with-icon">
          <svg className="criteria-icon" viewBox="0 0 24 24" width="28" height="28">
            <path fill="currentColor" d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,19H5V5H19V19M17,11V13H7V11H17M13,7V9H7V7H13M7,15H17V17H7V15Z" />
          </svg>
          <h2>Enter Specifications for {itemType} Alternatives</h2>
          <button className="help-button-fixed" onClick={toggleHelpModal} aria-label="Help">?</button>
        </div>
      </div>
      {showDefaultsButton && (
        <button 
          className="secondary-button fill-defaults-button" 
          onClick={fillWithSampleData}
        >
          Fill with Sample Data
        </button>
      )}

      <div className="specifications-table-container">
        <table className="specifications-table">
          <thead>
            <tr>
              <th>{itemType}</th>
              {criteria.map((criterion, index) => (
                <th key={index}>
                  {criterion} ({(criteriaWeights[index] * 100).toFixed(1)}%)
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alternatives.map((alternative, altIndex) => (
              <tr key={altIndex}>
                <th>{alternative}</th>
                {criteria.map((criterion, critIndex) => (
                  <td key={critIndex}>
                    <input
                      type="text"
                      value={localSpecifications[altIndex][critIndex]}
                      onChange={(e) => handleSpecificationChange(altIndex, critIndex, e.target.value)}
                      placeholder={`${alternative}'s ${criterion}`}
                      className="specification-input"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!allSpecificationsFilled && (
        <div className="warning-message">
          <p>Please fill in all specification values before proceeding.</p>
        </div>
      )}

      <div className="button-container">
        <button className="back-button" onClick={onPrevious}>
          <svg className="arrow-icon-back" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
          </svg>
          Back to Criteria Comparison
        </button>
        <button 
          className="next-button" 
          onClick={onNext}
          disabled={!allSpecificationsFilled}
        >
          Calculate Results
          <svg className="arrow-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
          </svg>
        </button>
      </div>

      {showHelpModal && (
        <div className="help-modal-overlay">
          <div className="help-modal">
            <button className="close-modal" onClick={toggleHelpModal}>×</button>
            <h3>Specifications Instructions</h3>
            <p>
              In this step, you'll enter specific values for each alternative across all criteria.
            </p>
            <p>
              For example, if you're comparing phones and have criteria like "Battery Life" and "Price," 
              you would enter the actual battery capacity (e.g., 4000mAh) and price (e.g., 500000FCFA) for each phone.
            </p>
            <p>
              These values will be used to calculate the final rankings of alternatives based on the criteria weights 
              you defined in the previous step.
            </p>
            <p>
              You can use the "Fill with Sample Data" button to automatically populate the table with realistic 
              values if you're just exploring the application.
            </p>
            <p>
              All fields must be filled before proceeding to the results calculation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlternativesSpecificationInput;