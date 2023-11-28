/* eslint-disable no-shadow */
import React from 'react';
import * as router from 'react-router';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../../components/navigation-bars/NavBar';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../hooks/AuthContext';

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
            <NavBar />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('nav-bar')).toBeInTheDocument();
    expect(getByTestId('mobile-top-nav')).toBeInTheDocument();
    expect(getByTestId('drawer-btn')).toBeInTheDocument();
    expect(getByTestId('drawer-overlay')).toBeInTheDocument();
    expect(getByTestId('close-drawer-btn')).toBeInTheDocument();

    fireEvent.click(getByTestId('drawer-btn'));
    fireEvent.keyPress(getByTestId('nav-bar'), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });
    fireEvent.scroll(global.window, { target: { scrollY: 100 } });
    fireEvent.scroll(global.window, { target: { scrollY: -100 } });
    fireEvent.click(getByTestId('close-drawer-btn'));
    fireEvent.keyDown(getByTestId('close-drawer-btn'));
    fireEvent.click(getByTestId('drawer-overlay'));
  });
  it('logout click', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
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

    fireEvent.click(getByTestId('nav-logout-btn'));
    await waitFor(() => {
      expect(navigate).toBeCalledWith('/logout');
    });
  });
  it('following link click', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
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

    fireEvent.click(getByTestId('following-btn'));
    await waitFor(() => {
      expect(navigate).toBeCalledWith('/app/MoSobhy/following');
    });
    fireEvent.keyDown(getByTestId('following-btn'));
    await waitFor(() => {
      expect(navigate).toBeCalledWith('/app/MoSobhy/following');
    });
  });
  it('followers link click', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
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

    fireEvent.click(getByTestId('followers-btn'));
    await waitFor(() => {
      expect(navigate).toBeCalledWith('/app/MoSobhy/follower');
    });
    fireEvent.keyDown(getByTestId('followers-btn'));
    await waitFor(() => {
      expect(navigate).toBeCalledWith('/app/MoSobhy/follower');
    });
  });
});