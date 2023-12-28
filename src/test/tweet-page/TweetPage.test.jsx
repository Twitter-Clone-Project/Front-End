/* eslint-disable no-unused-expressions */
import { render, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import TweetPage from '../../Pages/TweetPage';

const data = [
  {
    id: '123456',
    isRetweet: true,
    text: 'This is a retweet!',
    createdAt: '2023-11-29T21:33',
    attachmentsURL: ['https://example.com/image.jpg'],
    retweetedUser: {
      userId: '789',
      username: 'johndoe',
      screenName: 'John Doe',
      profileImageURL: 'https://example.com/profile.jpg',
      bio: "I'm a retweeted user.",
      followersCount: 1000,
      followingCount: 500,
      isFollowed: true,
      isFollowing: true,
    },
    user: {
      userId: '123',
      username: 'janesmith',
      screenName: 'Jane Smith',
      profileImageURL: 'https://example.com/profile.jpg',
      bio: "I'm the original user.",
      followersCount: 2000,
      followingCount: 1000,
      isFollowed: true,
      isFollowing: true,
    },
    isLiked: true,
    isRetweeted: false,
    isReplied: true,
    likesCount: 10,
    retweetsCount: 5,
    repliesCount: 3,
  },
];
const dispatch = vi.fn();
useAuth.mockReturnValue({
  dispatch: vi.fn(),
  isAuthenticated: true,
  user: data[0].user,
});
// vi.mock('./api'); // Mocking the API function
vi.mock('../../hooks/AuthContext.js');
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

// ... (Previous test setup code remains the same)

describe('TweetPage', () => {
  it('renders the tweet-page component successfully', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <TweetPage />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    expect(getByTestId('tweet-page')).to.exist;
    expect(getByTestId('tweet-page-backbtn')).to.exist;
    expect(getByTestId('tweet-post-header')).to.exist;
  });

  it('navigates back on click on the back button', () => {
    // Mock pastPath with the correct pathname
    const pastPath = { pathname: '/app/janesmith' }; // Adjust this path as needed
    // Set up useLocation mock to return the correct pastPath
    vi.spyOn(router, 'useLocation').mockImplementation(() => ({
      state: { pastPath },
    }));

    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <TweetPage />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    const backButton = getByTestId(`tweet-page-backbtn`);
    fireEvent.click(backButton);

    // Ensure that navigate was called with the expected pastPath
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(pastPath.pathname);
  });

  it('displays the correct text in the header', () => {
    const postText = 'Post'; // Replace this with the expected post text

    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <TweetPage />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    const postHeader = getByTestId('tweet-post-header');
    expect(postHeader.textContent).toBe(postText);
  });

  it('renders the spinner initially', () => {
    const { getByTestId, queryByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <TweetPage />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    const tweetComponent = queryByTestId('tweet-component'); // Replace with your test ID
    const spinner = getByTestId('spinner-component'); // Replace with your spinner test ID

    // Assuming tweetData is set to false initially
    expect(tweetComponent).not.to.exist;
    expect(spinner).to.exist;
  });

  it('test request tweets from API', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
          data: {
            status: 'true',
            data: [
              {
                id: '123456',
                isRetweet: true,
                text: 'This is a retweet!',
                createdAt: '2023-11-29T21:33',
                attachmentsURL: ['https://example.com/image.jpg'],
                retweetedUser: {
                  userId: '789',
                  username: 'johndoe',
                  screenName: 'John Doe',
                  profileImageURL: 'https://example.com/profile.jpg',
                  bio: "I'm a retweeted user.",
                  followersCount: 1000,
                  followingCount: 500,
                  isFollowed: true,
                  isFollowing: true,
                },
                user: {
                  userId: '123',
                  username: 'janesmith',
                  screenName: 'Jane Smith',
                  profileImageURL: 'https://example.com/profile.jpg',
                  bio: "I'm the original user.",
                  followersCount: 2000,
                  followingCount: 1000,
                  isFollowed: true,
                  isFollowing: true,
                },
                isLiked: true,
                isRetweeted: false,
                isReplied: true,
                likesCount: 10,
                retweetsCount: 5,
                repliesCount: 3,
              },
            ],
          },
        }),
    });
    render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <TweetPage />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    await waitFor(() => {
      //   expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}tweets/undefined`,
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
