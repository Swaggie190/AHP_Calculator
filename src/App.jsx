import { useState } from 'react';
import Header from './components/Header';
import AlternativesInput from './components/AlternativesInput';
import CriteriaInput from './components/CriteriaInput';
import PairwiseComparisonMatrix from './components/PairwiseComparisonMatrix';
import ResultsDisplay from './components/ResultsDisplay';
import {
  calculateFinalScores,
  generatePairwiseMatrix,
} from './utils/ahpCalculations';
import './styles/global.css';

const App = () => {
  // Default values based on project requirements
  const defaultPhones = [
    'iPhone 12',
    'ItelA56',
    'Tecno Camon 12',
    'Infinix Hot 10',
    'Huawei P30',
    'Google Pixel 7',
    'Xiaomi Redmi Note 10',
    'Samsung Galaxy S22',
    'Motorola Razr+',
    'iPhone XR',
    'Samsung Galaxy Note 10',
  ];

  const defaultCriteria = [
    'Memory',
    'Storage',
    'CPU frequency',
    'Price',
    'Brand',
  ];

  // State management
  const [step, setStep] = useState(1);
  const [alternatives, setAlternatives] = useState(defaultPhones);
  const [criteria, setCriteria] = useState(defaultCriteria);
  const [criteriaMatrix, setCriteriaMatrix] = useState(() =>
    generatePairwiseMatrix(defaultCriteria)
  );
  const [alternativesMatrices, setAlternativesMatrices] = useState(() =>
    defaultCriteria.map(() => generatePairwiseMatrix(defaultPhones))
  );
  const [results, setResults] = useState(null);

  // Handler to move to next step
  const handleNextStep = () => {
    if (step === 3) {
      // Calculate final results
      const scores = calculateFinalScores(criteriaMatrix, alternativesMatrices);

      // Find the indices sorted by score (highest to lowest)
      const rankedIndices = scores
        .map((score, index) => ({ score, index }))
        .sort((a, b) => b.score - a.score)
        .map((item) => item.index);

      // Create ranked results
      const rankedResults = rankedIndices.map((index) => ({
        alternative: alternatives[index],
        score: scores[index],
      }));

      setResults(rankedResults);
    }

    setStep((prevStep) => prevStep + 1);
  };

  // Handler to go back to previous step
  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Handler for updating alternatives
  const handleAlternativesChange = (newAlternatives) => {
    setAlternatives(newAlternatives);
    // Reset alternative matrices with new dimensions
    setAlternativesMatrices(
      criteria.map(() => generatePairwiseMatrix(newAlternatives))
    );
  };

  // Handler for updating criteria
  const handleCriteriaChange = (newCriteria) => {
    setCriteria(newCriteria);
    setCriteriaMatrix(generatePairwiseMatrix(newCriteria));
    // Reset alternative matrices with new criteria count
    setAlternativesMatrices(
      newCriteria.map(() => generatePairwiseMatrix(alternatives))
    );
  };

  // Handler for updating criteria matrix
  const handleCriteriaMatrixChange = (newMatrix) => {
    setCriteriaMatrix(newMatrix);
  };

  // Handler for updating alternative matrices
  const handleAlternativeMatrixChange = (criterionIndex, newMatrix) => {
    setAlternativesMatrices((prevMatrices) => {
      const newMatrices = [...prevMatrices];
      newMatrices[criterionIndex] = newMatrix;
      return newMatrices;
    });
  };

  // Reset the application
  const handleReset = () => {
    setStep(1);
    setAlternatives(defaultPhones);
    setCriteria(defaultCriteria);
    setCriteriaMatrix(generatePairwiseMatrix(defaultCriteria));
    setAlternativesMatrices(
      defaultCriteria.map(() => generatePairwiseMatrix(defaultPhones))
    );
    setResults(null);
  };

  return (
    <div className="app-container">
      <Header />

      <div className="app-content">
        {step === 1 && (
          <AlternativesInput
            alternatives={alternatives}
            onAlternativesChange={handleAlternativesChange}
            onNext={handleNextStep}
          />
        )}

        {step === 2 && (
          <CriteriaInput
            criteria={criteria}
            onCriteriaChange={handleCriteriaChange}
            criteriaMatrix={criteriaMatrix}
            onCriteriaMatrixChange={handleCriteriaMatrixChange}
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
          />
        )}

        {step === 3 && (
          <PairwiseComparisonMatrix
            alternatives={alternatives}
            criteria={criteria}
            alternativesMatrices={alternativesMatrices}
            onAlternativeMatrixChange={handleAlternativeMatrixChange}
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
          />
        )}

        {step === 4 && (
          <ResultsDisplay results={results} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default App;
