// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Model from './model/Model.js';
import Board from './model/Board.js';
import App from './App';

import { configurations } from './model/Board.js'; 

const initialConfig = configurations[0];
  // Let's say you select the first configuration (4x4) as default.

test('Model initializes with correct board size', () => {
  const model = new Model(initialConfig);
  console.log(model.board);
  expect(model.board.size).toBe(4);  // assuming you're using the 4x4 configuration by default
});

test('Model allows board configuration selection', () => {
  const model = new Model(configurations[1]);
  model.selectGroup(1);  // Selecting second configuration, for instance

  // Check if board has been set up with new configuration
  expect(model.board.size).toBe(5);  // assuming second configuration is 5x5
  
  const model2 = new Model(configurations[2]);
  
  model2.selectGroup(2);
  expect(model2.board.size).toBe(6);
});