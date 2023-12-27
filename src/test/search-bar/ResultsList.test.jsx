/* eslint-disable no-unused-expressions */
import { fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import ResultsList from '../../components/search-bar/ResultsList';

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

describe('ResultsList', () => {
  it('renders the component successfully', () => {
    const { getByText, getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <ResultsList
              //   testId="no-search-results"
              results={[{ username: 'test-name' }]}
              value="test"
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    expect(getByTestId('search-bar-serachtest')).to.exist;
    expect(getByTestId('search-bar-gototest')).to.exist;
    expect(getByTestId('search-bar-testresults')).to.exist;
    fireEvent.click(getByTestId('search-bar-serachtest'));
    expect(navigate).toHaveBeenCalledWith('/app/search/tweets?q=test', {
      state: {
        pastPath: {
          hash: '',
          key: 'default',
          pathname: '/',
          search: '',
          state: null,
        },
      },
    });
    // fireEvent.click(getByTestId('search-bar-gototest'));
    // expect(navigate).toHaveBeenCalledWith('/app/test');
    expect(navigate).toBeCalledTimes(1);

    // expect(getByText(`No results for "TEST"`)).toBeInTheDocument();
  });
});
