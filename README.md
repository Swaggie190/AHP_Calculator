# Phone Selector using AHP

This project implements the Analytic Hierarchy Process (AHP) to help select the ideal phone from a list of alternatives based on multiple criteria and user preferences.

## Project Overview

The application follows the AHP methodology:

1. Define the problem hierarchically (alternatives and criteria)
2. Create pairwise comparison matrices to establish priorities
3. Check for consistency in the comparisons
4. Synthesize the results to determine the best alternative

## Features

- Custom alternatives and criteria input
- Pairwise comparison matrices for criteria
- Direct specification input for alternatives
- Consistency checking with Consistency Ratio (CR) calculation
- Result visualization with rankings and scores

## How to Run

1. Ensure you have Node.js installed (v14 or higher recommended)
2. Clone the repository
3. Navigate to the project directory
4. Install dependencies:
   ```
   npm install
   ```
5. Start the development server:
   ```
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `dist` directory and can be served using any static file server.

## AHP Implementation Details

This application implements the AHP method with the following steps:

1. **Step 1**: Define alternatives (phones to choose from)
2. **Step 2**: Define criteria and create pairwise comparison matrix to determine criteria weights
3. **Step 3**: Enter specifications for each alternative against each criterion
4. **Step 4**: Synthesize results and display the best alternative

The consistency of the pairwise comparisons is checked using the Consistency Ratio (CR). If CR > 0.1, a warning is shown indicating potentially inconsistent judgments.

## Technologies Used

- React.js with Vite
- JavaScript (ES6+)
- CSS3