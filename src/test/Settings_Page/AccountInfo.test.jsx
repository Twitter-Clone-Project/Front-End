import React from 'react';
import * as router from 'react-router';
import AccountInfo from '../../components/Settings-page/AccountInfo';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import OwnToaster from '../../components/OwnToaster';

vi.mock('../../hooks/AuthContext.js');

describe('AccountInfo', () => {
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
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <AccountInfo />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('AccountInfo_0')).toBeInTheDocument();
    expect(getByTestId('AccountInfo_Link_0')).toBeInTheDocument();
    expect(getByTestId('AccountInfo_Link_1')).toBeInTheDocument();
  });

  it('chack Navigation to email', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <AccountInfo />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('AccountInfo_Link_0')).toBeInTheDocument();
    fireEvent.click(getByTestId('AccountInfo_Link_0'));
    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(`/app/settings/accountinfo/email`, {
      preventScrollReset: undefined,
      relative: undefined,
      replace: false,
      state: undefined,
      unstable_viewTransition: undefined,
    });
  });
  it('chack Navigation to updateusername', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <AccountInfo />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('AccountInfo_Link_1')).toBeInTheDocument();
    fireEvent.click(getByTestId('AccountInfo_Link_1'));
    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(
      `/app/settings/accountinfo/updateusername`,
      {
        preventScrollReset: undefined,
        relative: undefined,
        replace: false,
        state: undefined,
        unstable_viewTransition: undefined,
      },
    );
  });
});
