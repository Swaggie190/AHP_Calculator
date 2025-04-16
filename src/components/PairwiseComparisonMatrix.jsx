import { useState } from 'react';
import {
  calculatePriorityVector,
  calculateConsistencyRatio,
  saatyScale,
  updateMatrixValue,
} from '../utils/ahpCalculations';

const PairwiseComparisonMatrix = ({
  alternatives,
  criteria,
  alternativesMatrices,
  onAlternativeMatrixChange,
  onPrevious,
  onNext,
}) => {
  const [currentCriterionIndex, setCurrentCriterionIndex] = useState(0);

  // Calculate the priority vector for current matrix
  const currentMatrix = alternativesMatrices[currentCriterionIndex];
  const priorityVector = calculatePriorityVector(currentMatrix);
  const consistencyRatio = calculateConsistencyRatio(
    currentMatrix,
    priorityVector
  );

  const handleMatrixValueChange = (rowIndex, colIndex, value) => {
    const newMatrix = updateMatrixValue(
      currentMatrix,
      rowIndex,
      colIndex,
      value
    );
    onAlternativeMatrixChange(currentCriterionIndex, newMatrix);
  };

  const handleCriterionChange = (e) => {
    setCurrentCriterionIndex(parseInt(e.target.value));
  };

  const handlePrevious = () => {
    if (currentCriterionIndex > 0) {
      setCurrentCriterionIndex(currentCriterionIndex - 1);
    } else {
      onPrevious();
    }
  };

  const handleNext = () => {
    if (currentCriterionIndex < criteria.length - 1) {
      setCurrentCriterionIndex(currentCriterionIndex + 1);
    } else {
      onNext();
    }
  };

  // Check if all comparisons have acceptable consistency ratios
  const allConsistencyRatiosAcceptable = alternativesMatrices.every(
    (matrix, index) => {
      const pv = calculatePriorityVector(matrix);
      const cr = calculateConsistencyRatio(matrix, pv);
      return cr <= 0.1;
    }
  );

  return (
    <div className="pairwise-comparison">
      <h2>Step 3: Compare Alternatives for Each Criterion</h2>

      <div className="criterion-selector">
        <label htmlFor="criterion-select">Current Criterion: </label>
        <select
          id="criterion-select"
          value={currentCriterionIndex}
          onChange={handleCriterionChange}
        >
          {criteria.map((criterion, index) => (
            <option key={index} value={index}>
              {criterion} ({index + 1}/{criteria.length})
            </option>
          ))}
        </select>
      </div>

      <p>
        Compare alternatives based on:{' '}
        <strong>{criteria[currentCriterionIndex]}</strong>
      </p>

      <div className="pairwise-matrix-container">
        <table className="pairwise-matrix">
          <thead>
            <tr>
              <th></th>
              {alternatives.map((alt, index) => (
                <th key={index} className="alternative-header">
                  {alt}
                </th>
              ))}
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {currentMatrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th>{alternatives[rowIndex]}</th>
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
                        {/* Add reciprocal values for less important alternatives */}
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
                                .find((s) => s.value === Math.round(1 / val))
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

      <div className="criterion-progress">
        <p>
          Progress: {currentCriterionIndex + 1} of {criteria.length} criteria
          evaluated
        </p>
      </div>

      <div className="button-container">
        <button className="secondary-button" onClick={handlePrevious}>
          {currentCriterionIndex > 0
            ? `Previous: ${criteria[currentCriterionIndex - 1]}`
            : 'Previous: Criteria Definition'}
        </button>
        <button className="primary-button" onClick={handleNext}>
          {currentCriterionIndex < criteria.length - 1
            ? `Next: ${criteria[currentCriterionIndex + 1]}`
            : 'Calculate Results'}
        </button>
      </div>

      {!allConsistencyRatiosAcceptable &&
        currentCriterionIndex === criteria.length - 1 && (
          <div className="warning-message">
            <p>
              Warning: Some of your comparison matrices have high consistency
              ratios (CR &gt; 0.1). This may affect the reliability of your
              results. Consider revising your comparisons.
            </p>
          </div>
        )}
    </div>
  );
};

export default PairwiseComparisonMatrix;
