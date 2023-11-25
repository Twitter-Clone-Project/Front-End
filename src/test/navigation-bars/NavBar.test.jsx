/* eslint-disable no-shadow */
import React from 'react';
import * as router from 'react-router';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../../components/navigation-bars/NavBar';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import reducer from '../../contexts/Auth/reducer';
import AppLayout from '../../components/app-layout/AppLayout';
import ProtectedRoute from '../../components/ProtectedRoute';
import { AuthContext, useAuth } from '../../hooks/AuthContext';

vi.mock('../../hooks/AuthContext.js');

describe('Navigation components', () => {
  const navigate = vi.fn();

  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    vi.spyOn(window, 'fetch');
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });
  it('render NavBar properly', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('nav-bar')).toBeInTheDocument();
  });
});
