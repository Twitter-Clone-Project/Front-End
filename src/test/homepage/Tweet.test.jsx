import { render, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { v4 as uuid4 } from 'uuid';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import { addLocale, setDefaultLocale } from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import userEvent from '@testing-library/user-event';
import Tweet from '../../tweetPage/Tweet';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import { act } from 'react-dom/test-utils';

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
      imageUrl: 'https://example.com/profile.jpg',
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
      imageUrl: 'https://example.com/profile.jpg',
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
const key = uuid4();
const setTweets = vi.fn();
const dispatch = vi.fn();
useAuth.mockReturnValue({
  dispatch: vi.fn(),
  isAuthenticated: true,
  user: data[0].user,
});
vi.mock('../../hooks/AuthContext.js');
addLocale(en);
setDefaultLocale('en');
const navigate = vi.fn();
beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  vi.spyOn(window, 'fetch');
  vi.useFakeTimers({ shouldAdvanceTime: true });

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
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe('Tweet', () => {
  it('has the tweet text', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Tweet
            key={key}
            data={data[0]}
            tweets={data}
            setTweets={setTweets}
          />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('123456')).toHaveTextContent('This is a retweet!');
  });

  it('shows the userpopup on hover on the profile picture', () => {
    const { getByTestId } = render(
      <AuthProvider
        value={{ dispatch, user: data[0].user, isAuthenticated: true }}
      >
        <BrowserRouter>
          <Tweet
            key={key}
            data={data[0]}
            tweets={data}
            setTweets={setTweets}
          />
        </BrowserRouter>
      </AuthProvider>,
    );

    const imageElement = getByTestId('profileImage123456');
    fireEvent.mouseEnter(imageElement);
    const userPopup = getByTestId(`popover${data[0].id}`);
    expect(userPopup).toBeInTheDocument();
  });

  it('shows the actions menu on click on click on the 3 dots ', async () => {
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
    const { getByTestId } = render(
      <AuthProvider
        value={{ dispatch, user: data[0].user, isAuthenticated: true }}
      >
        <BrowserRouter>
          <Tweet
            key={key}
            data={data[0]}
            tweets={data}
            setTweets={setTweets}
          />
        </BrowserRouter>
      </AuthProvider>,
    );

    const menubtn = getByTestId('123456menubtn');
    await user.click(menubtn);
    vi.advanceTimersByTime(700);
    await waitFor(() => {
      expect(getByTestId('123456menu')).toBeInTheDocument();
    });
    // screen.debug();
  });

  it('navigates to the profile on click on the screenName', () => {
    const { getByTestId } = render(
      <AuthProvider
        value={{ dispatch, user: data[0].user, isAuthenticated: true }}
      >
        <BrowserRouter>
          <Tweet
            key={key}
            data={data[0]}
            tweets={data}
            setTweets={setTweets}
          />
        </BrowserRouter>
      </AuthProvider>,
    );

    const screenName = getByTestId(`username${data[0].id}`);
    fireEvent.click(screenName);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(
      `/app/${data[0].user.username}`,
      expect.any(Object),
    );
  });

  it('navigates to the tweetpage on click on the reply', () => {
    const { getByTestId } = render(
      <AuthProvider
        value={{ dispatch, user: data[0].user, isAuthenticated: true }}
      >
        <BrowserRouter>
          <Tweet
            key={key}
            data={data[0]}
            tweets={data}
            setTweets={setTweets}
          />
        </BrowserRouter>
      </AuthProvider>,
    );

    const replybtn = getByTestId(`${data[0].id}reply`);
    fireEvent.click(replybtn);
    expect(navigate).toHaveBeenCalledWith(
      `/app/tweets/${data[0].id}`,
      expect.any(Object),
    );
  });

  it('has like button that change color and count on click ', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Tweet
            key={key}
            data={data[0]}
            tweets={data}
            setTweets={setTweets}
          />
        </BrowserRouter>
      </AuthProvider>,
    );

    const likebtn = getByTestId('123456like');
    expect(likebtn).toHaveTextContent('10');
    const innerDiv = likebtn.querySelector('.Reply');
    expect(innerDiv).toHaveClass('text-[#F91880]');
    fireEvent.click(likebtn);
    expect(likebtn).not.toHaveClass('text-[#F91880]');
    expect(likebtn).toHaveTextContent('9');
  });

  it('has repost button that change color and count on click ', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Tweet
            key={key}
            data={data[0]}
            tweets={data}
            setTweets={setTweets}
          />
        </BrowserRouter>
      </AuthProvider>,
    );

    const repostbtn = getByTestId('123456repost');
    expect(repostbtn).toHaveTextContent('5');
    const innerDiv = repostbtn.querySelector('.Reply');
    expect(innerDiv).not.toHaveClass('text-[#00BA7C]');
    fireEvent.click(repostbtn);
    expect(repostbtn).not.toHaveClass('text-[#00BA7C]');
    expect(repostbtn).toHaveTextContent('6');
  });
});
