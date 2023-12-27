import React from 'react';
import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../../components/navigation-bars/NavBar';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../hooks/AuthContext';
import { ChatProvider } from '../../contexts/ChatProvider';

vi.mock('../../hooks/AuthContext.js');

describe('Floating Header components', () => {
  beforeEach(() => {
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
  it('render floating header without home', async () => {
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
    const { queryByTestId } = render(
      <AuthProvider>
        <ChatProvider>
          <BrowserRouter>
            <ProtectedRoute>
              <NavBar />
            </ProtectedRoute>
          </BrowserRouter>
        </ChatProvider>
      </AuthProvider>,
    );

    expect(queryByTestId('mobile-top-nav')).not.toBeInTheDocument();
  });
});
