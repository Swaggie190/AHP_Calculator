/**
 * Calculate the priority vector from a pairwise comparison matrix
 * @param {Array<Array<number>>} matrix - The pairwise comparison matrix
 * @returns {Array<number>} - The priority vector (weights)
 */
export const calculatePriorityVector = (matrix) => {
  const size = matrix.length;
  const rowSums = Array(size).fill(0);
  const columnSums = Array(size).fill(0);
  const normalizedMatrix = Array(size)
    .fill()
    .map(() => Array(size).fill(0));
  const priorityVector = Array(size).fill(0);

  // Calculate column sums
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      columnSums[j] += matrix[i][j];
    }
  }

  // Normalize matrix and calculate row averages
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      normalizedMatrix[i][j] = matrix[i][j] / columnSums[j];
      rowSums[i] += normalizedMatrix[i][j];
    }
    priorityVector[i] = rowSums[i] / size;
  }

  return priorityVector;
};

/**
 * Calculate the consistency ratio to check if the pairwise comparisons are consistent
 * @param {Array<Array<number>>} matrix - The pairwise comparison matrix
 * @param {Array<number>} priorityVector - The priority vector
 * @returns {number} - The consistency ratio
 */
export const calculateConsistencyRatio = (matrix, priorityVector) => {
  const size = matrix.length;
  const randomConsistencyIndex = {
    1: 0.0,
    2: 0.0,
    3: 0.58,
    4: 0.9,
    5: 1.12,
    6: 1.24,
    7: 1.32,
    8: 1.41,
    9: 1.45,
    10: 1.49,
  };

  // Calculate the weighted sum vector
  const weightedSum = Array(size).fill(0);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      weightedSum[i] += matrix[i][j] * priorityVector[j];
    }
  }

  // Calculate the consistency vector
  const consistencyVector = Array(size).fill(0);
  for (let i = 0; i < size; i++) {
    consistencyVector[i] = weightedSum[i] / priorityVector[i];
  }

  // Calculate lambda max
  const lambdaMax =
    consistencyVector.reduce((sum, value) => sum + value, 0) / size;

  // Calculate consistency index
  const consistencyIndex = (lambdaMax - size) / (size - 1);

  // Calculate consistency ratio
  const consistencyRatio = consistencyIndex / randomConsistencyIndex[size];

  return consistencyRatio;
};

/**
 * Create a reciprocal pairwise comparison matrix from the upper triangular part
 * @param {Array<Array<number>>} upperTriangular - The upper triangular part of the matrix
 * @returns {Array<Array<number>>} - The complete reciprocal matrix
 */
export const createReciprocalMatrix = (upperTriangular) => {
  const size = upperTriangular.length;
  const matrix = Array(size)
    .fill()
    .map(() => Array(size).fill(0));

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (i === j) {
        matrix[i][j] = 1; // Diagonal elements are always 1
      } else if (i < j) {
        matrix[i][j] = upperTriangular[i][j];
        matrix[j][i] = 1 / upperTriangular[i][j]; // Reciprocal value
      }
    }
  }

  return matrix;
};

/**
 * Calculate the final scores for alternatives based on their specifications and criteria weights
 * Following the AHP synthesis approach from lecture notes
 * @param {Array<Array<string|number>>} specifications - Matrix of alternative specifications for each criterion
 * @param {Array<number>} criteriaWeights - Weights for each criterion
 * @param {Array<string>} criteria - List of criterion names
 * @returns {Array<number>} - The final scores for each alternative
 */
export const synthesizeResults = (specifications, criteriaWeights, criteria) => {
  const numAlternatives = specifications.length;
  const numCriteria = criteriaWeights.length;
  const finalScores = Array(numAlternatives).fill(0);
  
  // For each criterion, determine if higher is better or lower is better
  const criteriaHigherIsBetter = criteria.map(criterion => {
    // For price, lower is better
    if (criterion.toLowerCase().includes('price')) {
      return false;
    }
    // For all other criteria, higher is better
    return true;
  });
  
  // Process each criterion
  for (let critIndex = 0; critIndex < numCriteria; critIndex++) {
    // Extract all values for this criterion
    const criterionValues = specifications.map(altSpecs => {
      const value = parseFloat(altSpecs[critIndex]);
      return isNaN(value) ? 0 : value;
    });
    
    // Find best value (max for higher is better, min for lower is better)
    let bestValue;
    if (criteriaHigherIsBetter[critIndex]) {
      bestValue = Math.max(...criterionValues);
    } else {
      // For criteria where lower is better (e.g., price)
      bestValue = Math.min(...criterionValues.filter(v => v > 0));
    }
    
    // Skip if best value is 0 or undefined
    if (!bestValue) continue;
    
    // Calculate normalized scores for each alternative for this criterion
    for (let altIndex = 0; altIndex < numAlternatives; altIndex++) {
      const value = parseFloat(specifications[altIndex][critIndex]);
      if (isNaN(value) || value === 0) continue;
      
      let score;
      if (criteriaHigherIsBetter[critIndex]) {
        // Higher values are better (e.g., memory, storage)
        score = value / bestValue;
      } else {
        // Lower values are better (e.g., price)
        score = bestValue / value;
      }
      
      // Add weighted score to final score
      finalScores[altIndex] += score * criteriaWeights[critIndex];
    }
  }
  
  return finalScores;
};

/**
 * Generate a complete pairwise comparison matrix from an array of preference values
 * @param {Array<number>} preferences - Array of preference values
 * @returns {Array<Array<number>>} - Complete pairwise comparison matrix
 */
export const generatePairwiseMatrix = (items) => {
  const n = items.length;
  const matrix = Array(n)
    .fill()
    .map(() => Array(n).fill(1)); // Initialize with 1s

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // Default to 1 for no preference
      matrix[i][j] = 1;
      matrix[j][i] = 1;
    }
  }

  return matrix;
};

/**
 * Saaty's Scale for AHP
 */
export const saatyScale = [
  { value: 1, label: '1 - Equal importance' },
  { value: 2, label: '2 - Weak' },
  { value: 3, label: '3 - Moderate importance' },
  { value: 4, label: '4 - Moderate plus' },
  { value: 5, label: '5 - Strong importance' },
  { value: 6, label: '6 - Strong plus' },
  { value: 7, label: '7 - Very strong importance' },
  { value: 8, label: '8 - Very, very strong' },
  { value: 9, label: '9 - Extreme importance' },
];

/**
 * Update a single value in a pairwise comparison matrix and maintain reciprocal property
 * @param {Array<Array<number>>} matrix - The current matrix
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {number} value - New value
 * @returns {Array<Array<number>>} - Updated matrix
 */
export const updateMatrixValue = (matrix, row, col, value) => {
  const newMatrix = [...matrix.map((row) => [...row])];
  newMatrix[row][col] = value;

  // Update reciprocal value
  if (row !== col) {
    newMatrix[col][row] = 1 / value;
  }

  return newMatrix;
};