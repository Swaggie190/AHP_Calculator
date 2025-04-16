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

  // Fill with sample data for demonstration purposes
  const fillWithSampleData = () => {
    // Default values based on criteria and item type
    let defaultValues;
    
    if (itemType === 'Phone') {
      defaultValues = [
        // Memory(GB), Storage(GB), CPU(GHz), Price($), Brand(1-10)
        ['6', '128', '2.8', '999', '9'],    // iPhone 12
        ['4', '64', '1.8', '150', '5'],     // ItelA56
        ['6', '128', '2.0', '200', '6'],    // Tecno Camon 12
        ['4', '64', '2.0', '180', '6'],     // Infinix Hot 10
        ['8', '256', '2.6', '700', '8'],    // Huawei P30
        ['8', '128', '2.8', '600', '8'],    // Google Pixel 7
        ['6', '128', '2.2', '250', '7'],    // Xiaomi Redmi Note 10
        ['8', '256', '3.0', '800', '9'],    // Samsung Galaxy S22
        ['8', '256', '3.2', '1200', '8'],   // Motorola Razr+
        ['3', '64', '2.5', '600', '9'],     // iPhone XR
        ['8', '256', '2.7', '700', '9'],    // Samsung Galaxy Note 10
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
      <h2>Step 3: Enter Specifications for {itemType} Alternatives</h2>
      <p>Enter the specification value for each alternative and criterion:</p>

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
        <button className="secondary-button" onClick={onPrevious}>
          Previous: Define Criteria
        </button>
        <button 
          className="primary-button" 
          onClick={onNext}
          disabled={!allSpecificationsFilled}
        >
          Calculate Results
        </button>
      </div>
    </div>
  );
};

export default AlternativesSpecificationInput;