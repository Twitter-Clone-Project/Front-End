/* eslint-disable react/react-in-jsx-scope */
import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

it('First test', () => {
  render(<App />);
  const message = screen.getByText(/twitter/i);
  expect(message).toBeVisible();
});
