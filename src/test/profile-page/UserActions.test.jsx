import React from 'react';
import * as router from 'react-router';
import UserActions from '../../components/user-profile-card/UserActions';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';

vi.mock('../../hooks/AuthContext.js');

describe('UserActions', () => {
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
      user: { name: 'Arabian', username: 'arabianhorses' },
    });
    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: false,
                isBlocked: false,
                isBlockingMe: false,
                isMuted: false,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('Horses-UserActions-1')).toBeInTheDocument();
    expect(getByTestId('Horses-UserActions-2')).toBeInTheDocument();
    expect(getByTestId('Horses-UserActions-8')).toBeInTheDocument();
    expect(getByTestId('Horses-UserActions-8')).toHaveTextContent('Follow');
  });

  it('should open drop down list when click on button', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'arabianhorses' },
    });
    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: false,
                isBlocked: false,
                isBlockingMe: false,
                isMuted: false,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('Horses-UserActions-2')).toBeInTheDocument();
    fireEvent.click(getByTestId('Horses-UserActions-2'));
    expect(getByTestId('Horses-UserActions-3')).toBeInTheDocument();
    expect(getByTestId('Horses-UserActions-4')).toBeInTheDocument();
    expect(getByTestId('Horses-UserActions-5')).toBeInTheDocument();
    expect(getByTestId('Horses-UserActions-6')).toBeInTheDocument();
    expect(getByTestId('Horses-UserActions-7')).toBeInTheDocument();
  });

  it('should when user is blocked the mute button should not appear', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'arabianhorses' },
    });
    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: false,
                isBlocked: true,
                isBlockingMe: false,
                isMuted: false,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('Horses-UserActions-2')).toBeInTheDocument();
    fireEvent.click(getByTestId('Horses-UserActions-2'));
    expect(getByTestId('Horses-UserActions-3')).toBeInTheDocument();
    expect(queryByTestId('Horses-UserActions-4')).not.toBeInTheDocument();
    expect(queryByTestId('Horses-UserActions-5')).not.toBeInTheDocument();
    expect(getByTestId('Horses-UserActions-6')).toBeInTheDocument();
    expect(getByTestId('Horses-UserActions-7')).toBeInTheDocument();
    expect(getByTestId('Horses-UserActions-8')).toHaveTextContent('Blocked');
    fireEvent.mouseEnter(getByTestId('Horses-UserActions-8'));
    expect(getByTestId('Horses-UserActions-8')).toHaveTextContent('Unblock');
  });

  it('should appear Following in the button when the user is Followed', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'arabianhorses' },
    });
    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: true,
                isBlocked: false,
                isBlockingMe: false,
                isMuted: false,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    expect(getByTestId('Horses-UserActions-8')).toHaveTextContent('Following');
    fireEvent.mouseEnter(getByTestId('Horses-UserActions-8'));
    expect(getByTestId('Horses-UserActions-8')).toHaveTextContent('Unfollow');
  });

  it('handles follow correctly', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ status: true, message: 'Followed Successfully' }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: false,
                isBlocked: false,
                isBlockingMe: false,
                isMuted: false,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('Horses-UserActions-8'));
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/Horses/follow`,
        {
          method: 'POST',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
  });

  it('handles unfollow correctly', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ status: true, message: 'UnFollowed Successfully' }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: true,
                isBlocked: false,
                isBlockingMe: false,
                isMuted: false,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('Horses-UserActions-8'));
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/Horses/unfollow`,
        {
          method: 'DELETE',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
  });

  it('handles Block correctly', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ status: true, message: 'Blocked Successfully' }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: false,
                isBlocked: false,
                isBlockingMe: false,
                isMuted: false,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('Horses-UserActions-2'));
    expect(getByTestId('Horses-UserActions-6')).toBeInTheDocument();
    fireEvent.click(getByTestId('Horses-UserActions-6'));

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/Horses/block`,
        {
          method: 'POST',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
  });

  it('handles unBlock correctly', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ status: true, message: 'unBlocked Successfully' }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: false,
                isBlocked: true,
                isBlockingMe: false,
                isMuted: false,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('Horses-UserActions-2'));
    expect(getByTestId('Horses-UserActions-6')).toBeInTheDocument();
    fireEvent.click(getByTestId('Horses-UserActions-6'));
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/Horses/unblock`,
        {
          method: 'DELETE',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
    fireEvent.click(getByTestId('Horses-UserActions-8'));
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/Horses/unblock`,
        {
          method: 'DELETE',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
  });

  it('handles Mute correctly', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ status: true, message: 'Muted Successfully' }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: false,
                isBlocked: false,
                isBlockingMe: false,
                isMuted: false,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('Horses-UserActions-2'));
    expect(getByTestId('Horses-UserActions-4')).toBeInTheDocument();
    fireEvent.click(getByTestId('Horses-UserActions-4'));

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/Horses/mute`,
        {
          method: 'POST',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
  });

  it('handles unMute correctly', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ status: true, message: 'UnMuted Successfully' }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: false,
                isBlocked: false,
                isBlockingMe: false,
                isMuted: true,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('Horses-UserActions-2'));
    expect(getByTestId('Horses-UserActions-4')).toBeInTheDocument();
    fireEvent.click(getByTestId('Horses-UserActions-4'));

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/Horses/unmute`,
        {
          method: 'DELETE',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
  });

  it('handles follow correctly', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({ status: false, message: 'Followed Successfully' }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: false,
                isBlocked: false,
                isBlockingMe: false,
                isMuted: false,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('Horses-UserActions-8'));
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/Horses/follow`,
        {
          method: 'POST',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
  });

  it('handles unfollow correctly', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({ status: false, message: 'UnFollowed Successfully' }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: true,
                isBlocked: false,
                isBlockingMe: false,
                isMuted: false,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('Horses-UserActions-8'));
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/Horses/unfollow`,
        {
          method: 'DELETE',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
  });

  it('handles Block correctly', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({ status: false, message: 'Blocked Successfully' }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: false,
                isBlocked: false,
                isBlockingMe: false,
                isMuted: false,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('Horses-UserActions-2'));
    expect(getByTestId('Horses-UserActions-6')).toBeInTheDocument();
    fireEvent.click(getByTestId('Horses-UserActions-6'));

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/Horses/block`,
        {
          method: 'POST',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
  });

  it('handles unBlock correctly', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({ status: false, message: 'unBlocked Successfully' }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: false,
                isBlocked: true,
                isBlockingMe: false,
                isMuted: false,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('Horses-UserActions-2'));
    expect(getByTestId('Horses-UserActions-6')).toBeInTheDocument();
    fireEvent.click(getByTestId('Horses-UserActions-6'));
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/Horses/unblock`,
        {
          method: 'DELETE',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
    fireEvent.click(getByTestId('Horses-UserActions-8'));
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/Horses/unblock`,
        {
          method: 'DELETE',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
  });

  it('handles Mute correctly', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({ status: false, message: 'Muted Successfully' }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: false,
                isBlocked: false,
                isBlockingMe: false,
                isMuted: false,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('Horses-UserActions-2'));
    expect(getByTestId('Horses-UserActions-4')).toBeInTheDocument();
    fireEvent.click(getByTestId('Horses-UserActions-4'));

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/Horses/mute`,
        {
          method: 'POST',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
  });

  it('handles unMute correctly', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({ status: false, message: 'UnMuted Successfully' }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserActions
              user={{
                name: 'Arabian',
                username: 'Horses',
                followersCount: 2,
                followingsCount: 1,
                isFollowed: false,
                isBlocked: false,
                isBlockingMe: false,
                isMuted: true,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('Horses-UserActions-2'));
    expect(getByTestId('Horses-UserActions-4')).toBeInTheDocument();
    fireEvent.click(getByTestId('Horses-UserActions-4'));

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/Horses/unmute`,
        {
          method: 'DELETE',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
  });
});
