import React from 'react';
import * as router from 'react-router';
import * as ReactRouter from 'react-router';
import FollowingList from '../../components/userComponents/FollowingList';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';

vi.mock('../../hooks/AuthContext.js');

describe('FollowingList', () => {
  const navigate = vi.fn();
  // const mockLocation = {
  //   pathname: '/app/Horses/following',
  //   state: {},
  //   key: '',
  //   search: '',
  //   hash: '',
  // };

  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    vi.spyOn(window, 'fetch');
    // Object.defineProperty(ReactRouter, 'useLocation', {
    //   value: vi.fn(),
    //   configurable: true,
    //   writable: true,
    // });
    // vi.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);

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
    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <FollowingList />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('FollowingList_0')).toBeInTheDocument();
    expect(getByTestId('FollowingList_1')).toBeInTheDocument();
    expect(getByTestId('FollowingList_2')).toBeInTheDocument();
  });

  it('test back Button', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <FollowingList />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('FollowingList_BackButton'));
    expect(window.location.pathname).toBe('/');
  });

  it('test request users from API', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
          data: {
            name: 'MohamedMaher',
            users: [
              { userId: '2', username: 'ArabianHorses', name: 'ArabianHorses' },
            ],
          },
        }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <FollowingList />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/undefined/followings`, //----------------------------> should change the window location
        {
          method: 'GET',
          origin: true,
          credentials: 'include',
          withCredentials: true,
        },
      );
    });
  });
});
