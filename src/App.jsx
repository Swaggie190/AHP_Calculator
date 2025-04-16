import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AlternativesInput from './components/AlternativesInput';
import CriteriaInput from './components/CriteriaInput';
import AlternativesSpecificationInput from './components/AlternativesSpecificationInput';
import ResultsDisplay from './components/ResultsDisplay';
import {
  calculatePriorityVector,
  synthesizeResults,
  generatePairwiseMatrix,
} from './utils/ahpCalculations';
import './styles/global.css';

const App = () => {
  // Default item type is Phone (can be changed to "Laptop", "Car", etc.)
  const [itemType, setItemType] = useState('Phone');
  
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

  // Default specifications for phones to save time during demo
  const defaultPhoneSpecs = [
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

  // State management
  const [step, setStep] = useState(1);
  const [alternatives, setAlternatives] = useState(defaultPhones);
  const [criteria, setCriteria] = useState(defaultCriteria);
  const [criteriaMatrix, setCriteriaMatrix] = useState(() =>
    generatePairwiseMatrix(defaultCriteria)
  );
  const [specifications, setSpecifications] = useState(() => 
    defaultPhoneSpecs || alternatives.map(() => criteria.map(() => ""))
  );
  const [results, setResults] = useState(null);

  // Change item type - now will only be available on first page
  const handleItemTypeChange = (newType) => {
    setItemType(newType);
  };

  // Handler to move to next step
  const handleNextStep = () => {
    if (step === 3) {
      // Calculate criteria weights
      const criteriaWeights = calculatePriorityVector(criteriaMatrix);
      
      // Calculate final results using the new synthesis approach
      const scores = synthesizeResults(specifications, criteriaWeights, criteria);

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
    
    // Reset specifications with new alternatives
    if (itemType === 'Phone' && newAlternatives.length === defaultPhones.length) {
      // Keep using default phone specs if we're still using phones and have the same count
      setSpecifications(defaultPhoneSpecs);
    } else {
      // Otherwise, reset to empty specs
      setSpecifications(
        newAlternatives.map(() => criteria.map(() => ""))
      );
    }
  };

  // Handler for updating criteria
  const handleCriteriaChange = (newCriteria) => {
    setCriteria(newCriteria);
    setCriteriaMatrix(generatePairwiseMatrix(newCriteria));
    
    // Reset specifications with new criteria
    setSpecifications(
      alternatives.map(() => newCriteria.map(() => ""))
    );
  };

  // Handler for updating criteria matrix
  const handleCriteriaMatrixChange = (newMatrix) => {
    setCriteriaMatrix(newMatrix);
  };

  // Handler for updating specifications
  const handleSpecificationsChange = (newSpecifications) => {
    setSpecifications(newSpecifications);
  };

  // Reset the application
  const handleReset = () => {
    setStep(1);
    setAlternatives(defaultPhones);
    setCriteria(defaultCriteria);
    setCriteriaMatrix(generatePairwiseMatrix(defaultCriteria));
    setSpecifications(defaultPhoneSpecs);
    setResults(null);
  };

  // Item type selector component - moved inside the first page component
  const ItemTypeSelector = () => (
    <div className="item-type-selector">
      <label htmlFor="item-type">Item Type: </label>
      <select 
        id="item-type" 
        value={itemType} 
        onChange={(e) => handleItemTypeChange(e.target.value)}
      >
        <option value="Phone">Phone</option>
        <option value="Laptop">Laptop</option>
        <option value="Car">Car</option>
        <option value="TV">TV</option>
        <option value="Camera">Camera</option>
        <option value="Item">Generic Item</option>
      </select>
    </div>
  );

  // Get criteria weights for display in specification input
  const criteriaWeights = calculatePriorityVector(criteriaMatrix);

  return (
    <div className="app-container">
      <Header itemType={itemType} />

      <div className="app-content">
        {step === 1 && (
          <>
            <ItemTypeSelector />
            <AlternativesInput
              alternatives={alternatives}
              onAlternativesChange={handleAlternativesChange}
              onNext={handleNextStep}
              itemType={itemType}
            />
          </>
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
          <AlternativesSpecificationInput
            alternatives={alternatives}
            criteria={criteria}
            criteriaWeights={criteriaWeights}
            specifications={specifications}
            onSpecificationsChange={handleSpecificationsChange}
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
            itemType={itemType}
          />
        )}

        {step === 4 && (
          <ResultsDisplay 
            results={results} 
            onReset={handleReset} 
            itemType={itemType}
          />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default App;