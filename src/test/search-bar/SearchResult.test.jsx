/* eslint-disable no-unused-expressions */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import SearchResult from '../../components/search-bar/SearchResult';

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

describe('SearchResult', () => {
  it('renders the component successfully in search bar', () => {
    const { getByText, getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <SearchResult
              //   testId="no-search-results"
              data={{
                username: 'test-name',
                screenName: 'test',
                id: '1',
                isFollowed: false,
              }}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    expect(getByTestId('search-result-1')).to.exist;
    expect(getByText('@test-name')).toBeInTheDocument();
    expect(getByText('test')).toBeInTheDocument();
    fireEvent.click(getByTestId('search-result-1'));
    expect(navigate).toBeCalledWith('/app/test-name');
  });
  it('renders the component successfully in search page', async () => {
    const { getByText, getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <SearchResult
              //   testId="no-search-results"
              data={{
                username: 'test-name',
                screenName: 'test',
                id: '1',
                isFollowed: false,
              }}
              searchPage
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({
          status: false,
        }),
    });
    expect(getByTestId('search-result-1')).to.exist;
    expect(getByTestId('PopoverUserCard_test-name_1')).to.exist;
    expect(getByText('@test-name')).toBeInTheDocument();
    expect(getByText('test')).toBeInTheDocument();
    fireEvent.click(getByTestId('PopoverUserCard_test-name_1'));
    await waitFor(() => {
      //   expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/test-name/follow`,
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
  it('handles follow in search page', async () => {
    const { getByText, getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <SearchResult
              //   testId="no-search-results"
              data={{
                username: 'test-name',
                screenName: 'test',
                id: '1',
                isFollowed: true,
              }}
              searchPage
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('search-result-1')).to.exist;
    expect(getByTestId('PopoverUserCard_test-name_1')).to.exist;
    expect(getByText('@test-name')).toBeInTheDocument();
    expect(getByText('test')).toBeInTheDocument();
    fireEvent.click(getByTestId('PopoverUserCard_test-name_1'));
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({
          status: false,
        }),
    });
    await waitFor(() => {
      //   expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/test-name/unfollow`,
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
    // expect(getByText('unfollow')).toBeInTheDocument();

    // expect(getByTestId('search-bar-gototest')).to.exist;
    // expect(getByTestId('search-bar-testresults')).to.exist;
    // fireEvent.click(getByTestId('search-bar-serachtest'));
    // expect(navigate).toHaveBeenCalledWith('/app/search/tweets?q=test', {
    //   state: {
    //     pastPath: {
    //       hash: '',
    //       key: 'default',
    //       pathname: '/',
    //       search: '',
    //       state: null,
    //     },
    //   },
    // });
    // fireEvent.click(getByTestId('search-bar-gototest'));
    // expect(navigate).toHaveBeenCalledWith('/app/test');
    // expect(navigate).toBeCalledTimes(2);

    // expect(getByText(`No results for "TEST"`)).toBeInTheDocument();
  });
  it('get blocked', async () => {
    const { getByText, getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <SearchResult
              //   testId="no-search-results"
              data={{
                username: 'test-name',
                screenName: 'test',
                id: '1',
                isFollowed: true,
              }}
              searchPage
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.mouseEnter(getByTestId('PopoverUserCard_test-name_1'));
    expect(getByText('Unfollow')).toBeInTheDocument();
    fireEvent.mouseLeave(getByTestId('PopoverUserCard_test-name_1'));
    expect(getByText('Following')).toBeInTheDocument();
  });

  it('sets popoverIsBlocked to true based on API response', async () => {
    const mockData = {
      status: true,
      data: {
        users: [{ username: 'test-name' }],
      },
    };

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const { getByText, getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <SearchResult
              data={{
                username: 'test-name',
                screenName: 'test',
                id: '1',
                isFollowed: false,
              }}
              searchPage
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    // Ensure the API call is made
    expect(window.fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_DOMAIN}users/blockedUsers`,
      {
        method: 'GET',
        origin: true,
        credentials: 'include',
        withCredentials: true,
      },
    );

    // Wait for state changes or UI updates triggered by the API response
    await waitFor(() => {
      expect(getByTestId('PopoverUserCard_test-name_1')).toBeInTheDocument();
      expect(getByText('@test-name')).toBeInTheDocument();
      expect(getByText('test')).toBeInTheDocument();
      // Assert that the popoverIsBlocked state is set to true
      // after the API response with the expected data
      expect(getByText('Blocked')).toBeInTheDocument(); // Assuming UI change based on popoverIsBlocked
    });
  });
  it('handles setFollowed state toggling based on API response', async () => {
    const { getByTestId, getByText } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <SearchResult
              data={{
                username: 'test-name',
                screenName: 'test',
                id: '1',
                isFollowed: false,
              }}
              searchPage
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    // Simulate a successful API response for followReq()
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}), // Mock a successful response here
    });

    fireEvent.click(getByTestId('PopoverUserCard_test-name_1'));

    await waitFor(() => {
      // Assert state changes or UI updates after followReq()
      expect(getByText('Following')).toBeInTheDocument(); // Assert 'Following' text is present after follow
    });

    // Simulate a successful API response for unFollowReq()
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}), // Mock a successful response here
    });

    fireEvent.click(getByTestId('PopoverUserCard_test-name_1'));

    await waitFor(() => {
      // Assert state changes or UI updates after unFollowReq()
      expect(getByText('Follow')).toBeInTheDocument(); // Assert 'Follow' text is present after unfollow
    });
  });
});
