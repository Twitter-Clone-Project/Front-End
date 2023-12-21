import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { v4 as uuid4 } from 'uuid';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import { addLocale, setDefaultLocale } from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Tweet from '../../tweetPage/Tweet';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import Homepage from '../../tweetPage/Homepage';

// const data = [
//   {
//     id: '123456',
//     isRetweet: true,
//     text: 'This is a retweet!',
//     createdAt: '2023-11-29T21:33',
//     attachmentsURL: ['https://example.com/image.jpg'],
//     retweetedUser: {
//       userId: '789',
//       username: 'johndoe',
//       screenName: 'John Doe',
//       profileImageURL: 'https://example.com/profile.jpg',
//       bio: "I'm a retweeted user.",
//       followersCount: 1000,
//       followingCount: 500,
//       isFollowed: true,
//       isFollowing: true,
//     },
//     user: {
//       userId: '123',
//       username: 'janesmith',
//       screenName: 'Jane Smith',
//       profileImageURL: 'https://example.com/profile.jpg',
//       bio: "I'm the original user.",
//       followersCount: 2000,
//       followingCount: 1000,
//       isFollowed: true,
//       isFollowing: true,
//     },
//     isLiked: true,
//     isRetweeted: false,
//     isReplied: true,
//     likesCount: 10,
//     retweetsCount: 5,
//     repliesCount: 3,
//   },
// ];
const key = uuid4();
const setTweets = vi.fn();
const dispatch = vi.fn();
const user = {
  userId: '123',
  username: 'janesmith',
  screenName: 'Jane Smith',
  profileImageURL: 'https://example.com/profile.jpg',
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
