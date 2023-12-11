import React from 'react';
import * as router from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../../components/navigation-bars/NavBar';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../hooks/AuthContext';

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useLocation: vi.fn().mockImplementation(() => ({ pathname: '/app/home' })),
  };
});
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
  it('logout click', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: {
        name: 'mahmoud',
        username: 'MoSobhy',
        followersCount: 1,
        followingsCount: 2,
        imageUrl: 'http://localhost:3000/default-avatar.png',
      },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <NavBar />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    fireEvent.click(getByTestId('darwer-logout-btn'));
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/logout');
    });
  });
});
