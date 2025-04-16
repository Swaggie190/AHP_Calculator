import React from 'react';

const ResultsDisplay = ({ results, onReset, itemType = 'Phone' }) => {
  // Find the best alternative (highest score)
  const bestAlternative = results[0];

  // Calculate the maximum score for the chart scaling
  const maxScore = Math.max(...results.map((result) => result.score));

  return (
    <div className="results-display">
      <h2>Results: Your Ideal {itemType}</h2>

      <div className="best-alternative">
        <h3>Your Ideal Choice:</h3>
        <div className="best-alternative-card">
          <h4>{bestAlternative.alternative}</h4>
          <p>Score: {(bestAlternative.score * 100).toFixed(1)}%</p>
        </div>
      </div>

      <div className="all-results">
        <h3>All Alternatives Ranked:</h3>
        <table className="results-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>{itemType}</th>
              <th>Score</th>
              <th>Comparison</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className={index === 0 ? 'top-result' : ''}>
                <td>{index + 1}</td>
                <td>{result.alternative}</td>
                <td>{(result.score * 100).toFixed(1)}%</td>
                <td>
                  <div className="score-bar-container">
                    <div
                      className="score-bar"
                      style={{
                        width: `${(result.score / maxScore) * 100}%`,
                        backgroundColor: index === 0 ? '#4CAF50' : '#2196F3',
                      }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-container">
        <button className="primary-button" onClick={onReset}>
          Start Over
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;