import React from 'react';
import * as router from 'react-router';
import UserItem from '../../components/userComponents/UserItem';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import OwnToaster from '../../components/OwnToaster';

vi.mock('../../hooks/AuthContext.js');

describe('UserItem', () => {
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
    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserItem
              isFollowed={false}
              isFollowing={false}
              userPicture="image-url"
              userName="JohnDoe"
              userID="john_doe"
              discription="Some description"
              following="10"
              followers="20"
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('UserItem_john_doe_0')).toBeInTheDocument();
    expect(queryByTestId('UserItem_john_doe_1')).not.toBeInTheDocument();
    expect(getByTestId('UserItem_john_doe_2')).toBeInTheDocument();
    expect(getByTestId('UserItem_john_doe_2')).toHaveTextContent('Follow');
  });

  it('test hover to show popOver', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserItem
              isFollowed={false}
              isFollowing={false}
              userPicture="image-url"
              userName="JohnDoe"
              userID="john_doe"
              discription="Some description"
              following="10"
              followers="20"
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    fireEvent.mouseOver(getByTestId('UserItem_john_doe_img'));
    // await new Promise((resolve) => setTimeout(resolve, 700));
    // fireEvent.mouseOver(getByTestId('UserItem_john_doe_3'));
    // fireEvent.mouseOut(getByTestId('UserItem_john_doe_3'));
    // fireEvent.mouseOut(getByTestId('UserItem_john_doe_img'));
    // await new Promise((resolve) => setTimeout(resolve, 600));
  });

  it('should appear Following in the button when the user is Followed', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserItem
              isFollowed={true}
              isFollowing={false}
              userPicture="image-url"
              userName="JohnDoe"
              userID="john_doe"
              discription="Some description"
              following="10"
              followers="20"
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('UserItem_john_doe_2')).toHaveTextContent('Following');
    fireEvent.mouseEnter(getByTestId('UserItem_john_doe_2'));
    expect(getByTestId('UserItem_john_doe_2')).toHaveTextContent('Unfollow');
    fireEvent.mouseLeave(getByTestId('UserItem_john_doe_2'));
  });

  it('should appear Follows Element when the user is Following you', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserItem
              isFollowed={false}
              isFollowing={true}
              userPicture="image-url"
              userName="JohnDoe"
              userID="john_doe"
              discription="Some description"
              following="10"
              followers="20"
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(queryByTestId('UserItem_john_doe_1')).toBeInTheDocument();
  });

  it('should not appear Follow Button when the user is the same one', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { queryByTestId, getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserItem
              isFollowed={false}
              isFollowing={false}
              userPicture="image-url"
              userName="JohnDoe"
              userID="Horses"
              discription="Some description"
              following="10"
              followers="20"
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(queryByTestId('UserItem_john_doe_2')).not.toBeInTheDocument();
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
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserItem
              isFollowed={false}
              isFollowing={false}
              userPicture="image-url"
              userName="JohnDoe"
              userID="john_doe"
              discription="Some description"
              following="10"
              followers="20"
            />
          </ProtectedRoute>
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    expect(getByTestId('UserItem_john_doe_2')).not.toBeDisabled();
    fireEvent.click(getByTestId('UserItem_john_doe_2'));
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/john_doe/follow`,
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
        Promise.resolve({ status: true, message: 'Unfollowed Successfully' }),
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
            <UserItem
              isFollowed={true}
              isFollowing={false}
              userPicture="image-url"
              userName="JohnDoe"
              userID="john_doe"
              discription="Some description"
              following="10"
              followers="20"
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('UserItem_john_doe_2')).not.toBeDisabled();
    fireEvent.click(getByTestId('UserItem_john_doe_2'));
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/john_doe/unfollow`,
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

  it('should go to user profile on click on name, userName or img', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserItem
              isFollowed={false}
              isFollowing={false}
              userPicture="image-url"
              userName="JohnDoe"
              userID="john_doe"
              discription="Some description"
              following="10"
              followers="20"
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    fireEvent.click(getByTestId('UserItem_john_doe_toUserProfile'));
    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(`/app/john_doe`, {
      preventScrollReset: undefined,
      relative: undefined,
      replace: false,
      state: undefined,
      unstable_viewTransition: undefined,
    });
  });
});
