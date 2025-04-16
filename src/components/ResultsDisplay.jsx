import React, { useState } from 'react';

const ResultsDisplay = ({ results, onReset, itemType = 'Phone' }) => {
  // Find the best alternative (highest score)
  const bestAlternative = results[0];
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Calculate the maximum score for the chart scaling
  const maxScore = Math.max(...results.map((result) => result.score));

  // Toggle help modal
  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };

  return (
    <div className="results-display criteria-input-container">
      <div className="criteria-header">
        <div className="header-with-icon">
          <svg className="criteria-icon" viewBox="0 0 24 24" width="28" height="28">
            <path fill="currentColor" d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z" />
          </svg>
          <h2>Decision Analysis Results</h2>
          <button className="help-button-fixed" onClick={toggleHelpModal} aria-label="Help">?</button>
        </div>
      </div>

      <p className="results-summary">Based on your criteria and specifications, we've analyzed and ranked your {itemType} alternatives:</p>

      <div className="best-alternative">
        <h3>Your Ideal Choice:</h3>
        <div className="best-alternative-card">
          <svg className="trophy-icon" viewBox="0 0 24 24" width="32" height="32">
            <path fill="#FFD700" d="M20.2,2H19.5H18C17.1,2 16,3 16,4H8C8,3 6.9,2 6,2H4.5H3.8H2V11C2,12 3,13 4,13H6.2C6.6,15 7.9,16.7 11,17V19.1C8.8,19.3 8,20.4 8,21.7V22H16V21.7C16,20.4 15.2,19.3 13,19.1V17C16.1,16.7 17.4,15 17.8,13H20C21,13 22,12 22,11V2H20.2M4,11V4H6V6V11C5.1,11 4.3,11 4,11M20,11C19.7,11 18.9,11 18,11V6V4H20V11Z" />
          </svg>
          <div className="best-alternative-info">
            <h4>{bestAlternative.alternative}</h4>
            <p className="best-score">Score: {(bestAlternative.score * 100).toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="all-results">
        <h3>All Alternatives Ranked:</h3>
        <div className="results-table-container">
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
                          background: index === 0 
                            ? 'var(--success-gradient)' 
                            : index < 3 
                              ? 'var(--primary-gradient)'
                              : 'linear-gradient(90deg, #64748b 0%, #94a3b8 100%)',
                        }}
                      ></div>
                      <span className="score-percentage">
                        {((result.score / maxScore) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="results-explanation">
        <p>The scores represent how well each alternative matches your specified criteria and their relative importance.</p>
      </div>

      <div className="button-container">
        <button className="next-button" onClick={onReset}>
          <svg className="reset-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
          </svg>
          Start New Decision
        </button>
      </div>

      {showHelpModal && (
        <div className="help-modal-overlay">
          <div className="help-modal">
            <button className="close-modal" onClick={toggleHelpModal}>×</button>
            <h3>Understanding Your Results</h3>
            <p>
              This page shows the final outcome of your decision analysis process using the Analytic Hierarchy Process (AHP).
            </p>
            <p>
              <strong>Your Ideal Choice</strong> is the alternative that best matches your criteria based on:
              <ul>
                <li>The specifications you provided for each alternative</li>
                <li>The relative importance (weights) you assigned to each criterion</li>
              </ul>
            </p>
            <p>
              <strong>All Alternatives Ranked</strong> shows how each option compares to the best choice.
              The percentage bars indicate relative performance, with the top choice representing 100%.
            </p>
            <p>
              To start a new decision analysis, click the "Start New Decision" button.
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .results-display {
          background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: var(--shadow-lg);
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        
        .results-summary {
          margin-bottom: 1.5rem;
          font-size: 1.05rem;
          color: var(--text-color-light);
        }
        
        .best-alternative {
          margin: 2rem 0;
        }
        
        .best-alternative h3 {
          color: var(--primary-color);
          font-family: 'Montserrat', sans-serif;
          margin-bottom: 1rem;
        }
        
        .best-alternative-card {
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: var(--shadow-md);
          border: 1px solid #6ee7b7;
          display: flex;
          align-items: center;
        }
        
        .trophy-icon {
          margin-right: 1.5rem;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
        
        .best-alternative-info {
          flex: 1;
        }
        
        .best-alternative-info h4 {
          font-size: 1.5rem;
          color: var(--success-color);
          margin: 0 0 0.5rem 0;
          font-family: 'Montserrat', sans-serif;
        }
        
        .best-score {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--success-color);
          margin: 0;
        }
        
        .all-results h3 {
          color: var(--primary-color);
          font-family: 'Montserrat', sans-serif;
          margin: 2rem 0 1rem;
        }
        
        .results-table-container {
          overflow-x: auto;
          margin-bottom: 1rem;
          border-radius: 0.75rem;
          box-shadow: var(--shadow-md);
        }
        
        .results-table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 0.75rem;
          overflow: hidden;
        }
        
        .results-table th, 
        .results-table td {
          padding: 0.75rem 1rem;
          text-align: center;
          border: 1px solid var(--border-color);
        }
        
        .results-table thead th {
          background: var(--primary-gradient);
          color: white;
          font-weight: 600;
        }
        
        .top-result {
          background-color: #ecfdf5;
        }
        
        .score-bar-container {
          height: 24px;
          background-color: #f1f5f9;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          width: 100%;
          min-width: 150px;
        }
        
        .score-bar {
          height: 100%;
          border-radius: 12px;
          transition: width 0.6s ease;
        }
        
        .score-percentage {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .results-explanation {
          background-color: #f8fafc;
          padding: 1rem;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
          border: 1px solid var(--border-color);
        }
        
        .results-explanation p {
          margin: 0;
          color: var(--text-color-light);
        }
        
        .reset-icon {
          margin-right: 0.5rem;
        }
        
        @media (max-width: 768px) {
          .results-display {
            padding: 1.5rem;
          }
          
          .best-alternative-card {
            flex-direction: column;
            text-align: center;
          }
          
          .trophy-icon {
            margin-right: 0;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ResultsDisplay;