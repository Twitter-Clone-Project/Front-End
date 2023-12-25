import React from 'react';
import * as router from 'react-router';
import SettingsList from '../../components/Settings-page/SettingsList';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import OwnToaster from '../../components/OwnToaster';

vi.mock('../../hooks/AuthContext.js');

describe('SettingsList', () => {
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
            <SettingsList windowWidth={1000} />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('SettingsList_0')).toBeInTheDocument();
    expect(getByTestId('SettingsList_Link_0')).toBeInTheDocument();
    expect(getByTestId('SettingsList_Link_1')).toBeInTheDocument();
    expect(getByTestId('SettingsList_Link_2')).toBeInTheDocument();
    expect(getByTestId('SettingsList_Link_3')).toBeInTheDocument();
  });

  it('chack Navigation to account info', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <SettingsList windowWidth={1000} />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('SettingsList_Link_0')).toBeInTheDocument();
    fireEvent.click(getByTestId('SettingsList_Link_0'));
    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(`/app/settings/accountinfo`, {
      preventScrollReset: undefined,
      relative: undefined,
      replace: false,
      state: undefined,
      unstable_viewTransition: undefined,
    });
  });
  it('chack Navigation to changepassword', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <SettingsList windowWidth={1000} />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('SettingsList_Link_1')).toBeInTheDocument();
    fireEvent.click(getByTestId('SettingsList_Link_1'));
    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(`/app/settings/changepassword`, {
      preventScrollReset: undefined,
      relative: undefined,
      replace: false,
      state: undefined,
      unstable_viewTransition: undefined,
    });
  });
  it('chack Navigation to blockedusers', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <SettingsList windowWidth={1000} />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('SettingsList_Link_2')).toBeInTheDocument();
    fireEvent.click(getByTestId('SettingsList_Link_2'));
    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(`/app/settings/blockedusers`, {
      preventScrollReset: undefined,
      relative: undefined,
      replace: false,
      state: undefined,
      unstable_viewTransition: undefined,
    });
  });

  it('chack Navigation to mutedusers', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <SettingsList windowWidth={1000} />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('SettingsList_Link_3')).toBeInTheDocument();
    fireEvent.click(getByTestId('SettingsList_Link_3'));
    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(`/app/settings/mutedusers`, {
      preventScrollReset: undefined,
      relative: undefined,
      replace: false,
      state: undefined,
      unstable_viewTransition: undefined,
    });
  });
});

// expect(navigate).toHaveBeenCalled();
//     expect(navigate).toHaveBeenCalledWith(`/app/john_doe`, {
//       preventScrollReset: undefined,
//       relative: undefined,
//       replace: false,
//       state: undefined,
//       unstable_viewTransition: undefined,
//     });
