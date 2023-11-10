/* eslint-disable react/react-in-jsx-scope */
import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import AuthProvider from './contexts/Auth/AuthProvider';

it('First test', () => {
  render(
    <AuthProvider
      value={{ dispatch: vi.fn(), user: null, isAuthenticated: false }}
    >
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    </AuthProvider>,
  );
  const message = screen.getByText(/Happening now/i);
  expect(message).toBeVisible();
});
