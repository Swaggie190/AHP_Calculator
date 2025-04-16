import { useState } from 'react';
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
  const [criteriaText, setCriteriaText] = useState(criteria.join('\n'));
  const [showPairwiseComparison, setShowPairwiseComparison] = useState(false);
  const [error, setError] = useState('');

  // Calculate the priority vector for display
  const priorityVector = calculatePriorityVector(criteriaMatrix);
  const consistencyRatio = calculateConsistencyRatio(
    criteriaMatrix,
    priorityVector
  );

  const handleCriteriaTextChange = (e) => {
    setCriteriaText(e.target.value);
  };

  const handleDefineCriteria = () => {
    // Parse the text into an array of criteria
    const newCriteria = criteriaText
      .split('\n')
      .map((c) => c.trim())
      .filter((c) => c !== '');

    // Validate that we have at least 2 criteria
    if (newCriteria.length < 2) {
      setError('Please enter at least 2 criteria');
      return;
    }

    // Clear any error
    setError('');

    // Update criteria in parent component
    onCriteriaChange(newCriteria);
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

  return (
    <div className="criteria-input">
      {!showPairwiseComparison ? (
        <>
          <h2>Step 2: Define Criteria</h2>
          <p>Enter each criterion on a new line:</p>

          <textarea
            rows={10}
            value={criteriaText}
            onChange={handleCriteriaTextChange}
            placeholder="Enter each criterion on a new line"
            className="criteria-textarea"
          />

          {error && <p className="error-message">{error}</p>}

          <div className="button-container">
            <button className="secondary-button" onClick={onPrevious}>
              Previous: Phone Alternatives
            </button>
            <button className="primary-button" onClick={handleDefineCriteria}>
              Next: Criteria Comparison
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>Step 2: Pairwise Comparison of Criteria</h2>
          <p>Compare the importance of each criterion relative to others:</p>

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
            <p>
              Consistency Ratio: {consistencyRatio.toFixed(3)}
              {consistencyRatio > 0.1
                ? ' (Warning: CR > 0.1, comparisons may be inconsistent)'
                : ' (Good: CR < 0.1, comparisons are consistent)'}
            </p>
          </div>

          <div className="button-container">
            <button
              className="secondary-button"
              onClick={() => setShowPairwiseComparison(false)}
            >
              Back to Criteria Definition
            </button>
            <button className="primary-button" onClick={onNext}>
              Next: Compare Alternatives
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CriteriaInput;
