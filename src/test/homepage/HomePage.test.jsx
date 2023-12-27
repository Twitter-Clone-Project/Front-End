import { render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import { addLocale, setDefaultLocale } from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import Homepage from '../../tweetPage/Homepage';

const dispatch = vi.fn();
const user = {
  userId: '123',
  username: 'janesmith',
  screenName: 'Jane Smith',
  imageUrl: 'https://example.com/profile.jpg',
  bio: "I'm the original user.",
  followersCount: 2000,
  followingCount: 1000,
  isFollowed: true,
  isFollowing: true,
};
useAuth.mockReturnValue({
  dispatch: vi.fn(),
  isAuthenticated: true,
  user: user,
});
vi.mock('../../hooks/AuthContext.js');
addLocale(en);
setDefaultLocale('en');
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
describe('HomePage', () => {
  it('should send a request to get initial tweets', async () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <Homepage />
        </BrowserRouter>
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/1/timeline`,
        expect.objectContaining({
          method: 'GET',
          origin: true,
          credentials: 'include',
          withCredentials: true,
        }),
      );
    });
    const tweetList = getByTestId('tweetList');
    expect(tweetList).toBeInTheDocument();
  });
});
