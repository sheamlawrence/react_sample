import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Check Homepage is in document', () => {
  render(<App />);
  // const homeElement = screen.getByText()
  // expect(homeElement).toBeInTheDocument();
});
