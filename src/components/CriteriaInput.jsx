import { useState } from 'react';
import '../styles/CriteriaInputStyles.css';
import {
  calculatePriorityVector,
  calculateConsistencyRatio,
  saatyScale,
  updateMatrixValue,
} from '../utils/ahpCalculations';

const CriteriaInput = ({
  criteria,
  onCriteriaChange,
  criteriaMatrix,
  onCriteriaMatrixChange,
  onPrevious,
  onNext,
}) => {
  const [criteriaList, setCriteriaList] = useState(
    criteria.map(crit => crit.trim()).filter(crit => crit !== '')
  );
  const [showPairwiseComparison, setShowPairwiseComparison] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [error, setError] = useState('');

  // Calculate the priority vector for display
  const priorityVector = calculatePriorityVector(criteriaMatrix);
  const consistencyRatio = calculateConsistencyRatio(
    criteriaMatrix,
    priorityVector
  );

  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };

  const handleCriteriaChange = (index, value) => {
    const updatedCriteria = [...criteriaList];
    updatedCriteria[index] = value;
    setCriteriaList(updatedCriteria);
  };

  const handleAddCriterion = () => {
    setCriteriaList([...criteriaList, '']);
  };

  const handleRemoveCriterion = (indexToRemove) => {
    setCriteriaList(criteriaList.filter((_, index) => index !== indexToRemove));
  };

  const handleDefineCriteria = () => {
    // Filter out any empty criteria
    const validCriteria = criteriaList
      .map(crit => crit.trim())
      .filter(crit => crit !== '');

    // Validate that we have at least 2 criteria
    if (validCriteria.length < 2) {
      setError('Please enter at least 2 criteria');
      return;
    }

    // Clear any error
    setError('');

    // Update criteria in parent component
    onCriteriaChange(validCriteria);
    setShowPairwiseComparison(true);
  };

  const handleMatrixValueChange = (rowIndex, colIndex, value) => {
    const newMatrix = updateMatrixValue(
      criteriaMatrix,
      rowIndex,
      colIndex,
      value
    );
    onCriteriaMatrixChange(newMatrix);
  };

  // Get help content based on the current view
  const getHelpContent = () => {
    if (showPairwiseComparison) {
      return (
        <>
          <h3>Pairwise Comparison Instructions</h3>
          <p>
            This matrix allows you to compare the relative importance of each criterion against the others.
          </p>
          <p>
            For each pair of criteria, select how much more important the row criterion is compared to the column criterion.
            A value of 1 means equal importance, while 9 means the row criterion is extremely more important.
          </p>
          <p>
            The consistency ratio (CR) measures how logical your comparisons are. A value less than 0.1 indicates good consistency.
            If your CR is above 0.1, consider revising some of your judgments to make them more consistent.
          </p>
          <p>
            The weights column shows the calculated importance of each criterion as a percentage, based on your comparisons.
          </p>
        </>
      );
    } else {
      return (
        <>
          <h3>Criteria Instructions</h3>
          <p>
            Enter the criteria that are important for your decision. For example: if you're choosing a phone, 
            your criteria might include battery life, camera quality, price, etc.
          </p>
          <p>
            In the next step, you'll compare how important each criterion is relative to others using 
            the pairwise comparison matrix. This helps in giving appropriate weight to each criterion.
          </p>
          <p>
            Add as many criteria as needed, but keep in mind that too many criteria can make the comparison process
            more complex.
          </p>
        </>
      );
    }
  };

  return (
    <div className="criteria-input-container">
      {!showPairwiseComparison ? (
        <>
          <div className="criteria-header">
            <div className="header-with-icon">
              <svg className="criteria-icon" viewBox="0 0 24 24" width="28" height="28">
                <path fill="currentColor" d="M3,3H21V5H3V3M3,7H21V9H3V7M3,11H21V13H3V11M3,15H21V17H3V15M3,19H21V21H3V19Z" />
              </svg>
              <h2>Define Criteria</h2>
              <button className="help-button-fixed" onClick={toggleHelpModal} aria-label="Help">?</button>
            </div>
          </div>

          <div className="criteria-cards-container">
            {criteriaList.map((criterion, index) => (
              <div className="criterion-card" key={index}>
                <input
                  type="text"
                  value={criterion}
                  onChange={(e) => handleCriteriaChange(index, e.target.value)}
                  placeholder={`Criterion ${index + 1}`}
                  className="criterion-input"
                />
                <button 
                  className="delete-button" 
                  onClick={() => handleRemoveCriterion(index)}
                  aria-label="Delete criterion"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                  </svg>
                </button>
              </div>
            ))}
            
            <button className="add-criterion-button" onClick={handleAddCriterion} aria-label="Add criterion">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
              </svg>
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="button-container">
            <button className="back-button" onClick={onPrevious}>
              <svg className="arrow-icon-back" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
              </svg>
              Back to Alternatives
            </button>
            <button className="next-button" onClick={handleDefineCriteria}>
              Next: Criteria Comparison
              <svg className="arrow-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="criteria-header">
            <div className="header-with-icon">
              <svg className="criteria-icon" viewBox="0 0 24 24" width="28" height="28">
                <path fill="currentColor" d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10,9H8V7H10V9M12,17H8V15H12V17M16,9H14V7H16V9M16,17H14V15H16V17Z" />
              </svg>
              <h2>Pairwise Comparison of Criteria</h2>
              <button className="help-button-fixed" onClick={toggleHelpModal} aria-label="Help">?</button>
            </div>
          </div>
          <p className="comparison-instruction">Compare the importance of each criterion relative to others:</p>

          <div className="pairwise-matrix-container">
            <table className="pairwise-matrix">
              <thead>
                <tr>
                  <th></th>
                  {criteria.map((criterion, index) => (
                    <th key={index}>{criterion}</th>
                  ))}
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {criteriaMatrix.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <th>{criteria[rowIndex]}</th>
                    {row.map((value, colIndex) => (
                      <td key={colIndex}>
                        {rowIndex === colIndex ? (
                          1 // Diagonal elements are always 1
                        ) : rowIndex < colIndex ? (
                          <select
                            value={value}
                            onChange={(e) =>
                              handleMatrixValueChange(
                                rowIndex,
                                colIndex,
                                parseFloat(e.target.value)
                              )
                            }
                            className="comparison-select"
                          >
                            {saatyScale.map((scale) => (
                              <option key={scale.value} value={scale.value}>
                                {scale.label}
                              </option>
                            ))}
                            {/* Add reciprocal values for less important criteria */}
                            {[
                              1 / 9,
                              1 / 8,
                              1 / 7,
                              1 / 6,
                              1 / 5,
                              1 / 4,
                              1 / 3,
                              1 / 2,
                            ].map((val) => (
                              <option key={`recip-${val}`} value={val}>
                                {`1/${Math.round(1 / val)} - ${
                                  saatyScale
                                    .find(
                                      (s) => s.value === Math.round(1 / val)
                                    )
                                    ?.label.split(' - ')[1]
                                } (reciprocal)`}
                              </option>
                            ))}
                          </select>
                        ) : (
                          // Display reciprocal values (read-only)
                          value.toFixed(2)
                        )}
                      </td>
                    ))}
                    <td className="weight-cell">
                      {(priorityVector[rowIndex] * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="consistency-info">
            <p className={consistencyRatio > 0.1 ? "consistency-warning" : "consistency-good"}>
              Consistency Ratio: {consistencyRatio.toFixed(3)}
              {consistencyRatio > 0.1
                ? ' (Warning: CR > 0.1, comparisons may be inconsistent)'
                : ' (Good: CR < 0.1, comparisons are consistent)'}
            </p>
          </div>

          <div className="button-container">
            <button className="back-button" onClick={() => setShowPairwiseComparison(false)}>
              <svg className="arrow-icon-back" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
              </svg>
              Back to Criteria Definition
            </button>
            <button className="next-button" onClick={onNext}>
              Next: Compare Alternatives
              <svg className="arrow-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
              </svg>
            </button>
          </div>
        </>
      )}

      {showHelpModal && (
        <div className="help-modal-overlay">
          <div className="help-modal">
            <button className="close-modal" onClick={toggleHelpModal}>×</button>
            {getHelpContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CriteriaInput;