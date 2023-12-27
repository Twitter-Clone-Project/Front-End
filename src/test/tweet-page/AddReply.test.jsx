/* eslint-disable no-unused-expressions */
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import AddReply from '../../Pages/AddReply';

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

describe('AddReply', () => {
  it('renders the component successfully', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <AddReply />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    expect(getByTestId('add-reply')).to.exist;
    expect(getByTestId('reply-field')).to.exist;
    expect(getByTestId('reply-user-profileImg')).to.exist;
    expect(getByTestId('reply-text-field')).to.exist;
    expect(getByTestId('reply-emoji')).to.exist;
    expect(getByTestId('reply-submit-button')).to.exist;
    expect(getByTestId('reply-submit-button')).toBeDisabled();
  });

  it('show replying to @ on focus', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <AddReply replyFor={data[0].user.username} />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('reply-field'));
    expect(screen.getByText('Replying to')).toBeInTheDocument();
    expect(screen.getByText(`@${data[0].user.username}`)).toBeInTheDocument();
  });

  it('changed the input field value while typing', async () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <AddReply />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    const inputField = screen.getByPlaceholderText('Post your reply');
    fireEvent.change(inputField, {
      target: { value: 'testing' },
    });
    expect(inputField).toHaveDisplayValue('testing');
    expect(getByTestId('reply-submit-button')).toBeEnabled();
  });

  it('submits the reply and reset the input field', async () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <AddReply />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    const inputField = screen.getByPlaceholderText('Post your reply');
    fireEvent.change(inputField, {
      target: { value: 'testing' },
    });
    fireEvent.click(getByTestId('reply-submit-button'));
    expect(inputField).toHaveDisplayValue('');
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}tweets/undefined/addReply`,
        {
          method: 'POST',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
          body: '{"text":"testing"}',
        },
      );
    });
  });

  it('heads to profile page upon clicking on user image', async () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <AddReply />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('reply-user-profileImg'));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(`/app/${data[0].user.username}`);
  });
});
