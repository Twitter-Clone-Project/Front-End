/* eslint-disable no-unused-expressions */
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import Reply from '../../Pages/Reply';

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
      userId: '1',
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
vi.mock('react-time-ago', () => ({
  default: vi.fn(() => <span>MockedTimeAgo</span>),
}));
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

describe('Reply', () => {
  it('renders the component successfully for the same user', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <Reply
              data={{
                id: '1',
                createdAt: '2023-11-29T21:33',
                replyText: 'text',
                replyUserId: '1',
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    expect(getByTestId(`${data.id}`)).to.exist;
    expect(getByTestId(`${data.id}-left-column`)).to.exist;
    expect(getByTestId(`${data.id}-right-column`)).to.exist;
    expect(getByTestId(`${data.replyId}-reply-menu`)).to.exist;
    // expect(getByTestId('reply-text-field')).to.exist;
    // expect(getByTestId('reply-emoji')).to.exist;
    // expect(getByTestId('reply-submit-button')).to.exist;
    // expect(getByTestId('reply-submit-button')).toBeDisabled();
  });

  it('renders the component successfully for different user', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <Reply
              data={{
                replyId: '1',
                createdAt: '2023-11-29T21:33',
                replyText: 'text',
                replyUserId: '2',
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    expect(getByTestId(`1`)).to.exist;
    expect(getByTestId(`1-left-column`)).to.exist;
    expect(getByTestId(`1-right-column`)).to.exist;
    // expect(getByTestId(`${data.id}-reply-menu`)).not.toBeInTheDocument();
    // expect(getByTestId('reply-text-field')).to.exist;
    // expect(getByTestId('reply-emoji')).to.exist;
    // expect(getByTestId('reply-submit-button')).to.exist;
    // expect(getByTestId('reply-submit-button')).toBeDisabled();
  });

  it('shows username and names successfully', async () => {
    render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <Reply
              data={{
                id: '1',
                createdAt: '2023-11-29T21:33',
                replyText: 'text',
                replyUserId: '2',
                username: 'nour',
                screenName: 'nourayman',
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    // console.log(reply[0].replyId);
    // fireEvent.click(getByTestId(`${reply[0].replyId}menubtn`));
    // expect(getByTestId(`${reply[0].replyId}menu`)).to.exist;
    // fireEvent.click(getByTestId(`${reply[0].replyId}-deletebtn`));
    expect(screen.getByText('nour')).toBeInTheDocument();
    expect(screen.getByText('nourayman')).toBeInTheDocument();
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(2);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/nour/followers`,
        {
          method: 'GET',
          origin: true,
          credentials: 'include',
          withCredentials: true,
        },
      );
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/nour/followings`,
        {
          method: 'GET',
          origin: true,
          credentials: 'include',
          withCredentials: true,
        },
      );
    });
    // fireEvent.click(getByTestId(`${reply[0].replyId}menubtn`));
    // expect(getByTestId(`${reply[0].replyId}menu`)).not.to.exist;
  });

  it('naviages to profile when clicking on the name field', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <Reply
              data={{
                replyId: '1',
                createdAt: '2023-11-29T21:33',
                replyText: 'text',
                replyUserId: '2',
                username: 'nour',
                screenName: 'nourayman',
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId(`1-name-field`));
    // expect(navigate).toHaveBeenCalledTimes(2);
    expect(navigate).toHaveBeenCalledWith(`/app/nour`);
  });
  it('naviages to profile when clicking on the image field', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <Reply
              data={{
                replyId: '1',
                createdAt: '2023-11-29T21:33',
                replyText: 'text',
                replyUserId: '2',
                username: 'nour',
                screenName: 'nourayman',
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId(`1-left-column`));
    // expect(navigate).toHaveBeenCalledTimes(2);
    expect(navigate).toHaveBeenCalledWith(`/app/nour`);
  });
});
