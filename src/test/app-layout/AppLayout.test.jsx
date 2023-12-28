import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import AppLayout from '../../components/app-layout/AppLayout';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../hooks/AuthContext';
import { ChatProvider } from '../../contexts/ChatProvider';

vi.mock('../../hooks/AuthContext.js');

describe('AppLayout', () => {
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
  it('renders without crashing', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy ' },
      token: 'token',
    });
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <ProtectedRoute>
            <ChatProvider>
              <AppLayout />
            </ChatProvider>
          </ProtectedRoute>
        </AuthProvider>
      </BrowserRouter>,
    );
    expect(getByTestId('app-layout')).toBeInTheDocument();
  });
  // Add more tests here...
});
