import { render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import MutedUsers from '../../components/Settings-page/MutedUsers';
import OwnToaster from '../../components/OwnToaster';

vi.mock('../../hooks/AuthContext.js');
describe('Blocked Users', () => {
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

  it('should send a request to get muted users', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <MutedUsers />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('muted-users-page')).toBeInTheDocument();
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/mutedUsers`,
        {
          method: 'GET',
          origin: true,
          credentials: 'include',
          withCredentials: true,
        },
      );
    });
  });
  it('should display users', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    window.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
          data: {
            users: [
              {
                userId: '2',
                username: 'Mo_2',
                name: 'Mahmoud The Second',
                bio: 'Test Bio 👌',
                imageUrl: null,
                isFollowed: false,
                isFollowing: false,
                followersCount: '4',
                followingsCount: '0',
              },
            ],
          },
        }),
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <MutedUsers />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('muted-users-page')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByTestId('UserItem_Mo_2_0')).toBeInTheDocument();
    });
  });
  it('should display No users', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    window.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
          data: {
            users: [],
          },
        }),
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <MutedUsers />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('muted-users-page')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByTestId("You didn't mute any accounts.")).toBeInTheDocument();
    });
  });
  it('should recieve error from request', async () => {
    window.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: false,
          message: 'error',
        }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <MutedUsers />
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    expect(getByTestId('muted-users-page')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByText('error')).toBeInTheDocument();
    });
  });
});
