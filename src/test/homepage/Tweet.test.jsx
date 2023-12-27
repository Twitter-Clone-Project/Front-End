import { render, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { v4 as uuid4 } from 'uuid';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import { addLocale, setDefaultLocale } from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Tweet from '../../tweetPage/Tweet';
import ActionsMenu from '../../tweetPage/ActionsMenu';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';

const data = [
  {
    id: '123456',
    isRetweet: true,
    text: 'This is a retweet!',
    createdAt: '2023-11-29T21:33',
    attachmentsURL: [
      'https://example.com/image.jpg',
      'https://example.com/image.jpg',
    ],
    retweetedUser: {
      userId: '789',
      username: 'johndoe',
      screenName: 'John Doe',
      imageUrl: 'https://example.com/profile.jpg',
      bio: "I'm a retweeted user.",
      followersCount: 1000,
      followingCount: 500,
      isFollowed: false,
      isFollowing: false,
    },
    user: {
      userId: '123',
      username: 'janesmith',
      screenName: 'Jane Smith',
      imageUrl: 'https://example.com/profile.jpg',
      bio: "I'm the original user.",
      followersCount: 2000,
      followingCount: 1000,
      isFollowed: false,
      isFollowing: false,
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
  it('has no image', () => {
    const data1 = [
      {
        id: '123456',
        isRetweet: true,
        text: 'This is a retweet!',
        createdAt: '2023-11-29T21:33',
        attachmentsURL: [],
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
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Tweet
            key={key}
            data={data1[0]}
            tweets={data1}
            setTweets={setTweets}
          />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('123456')).toHaveTextContent('This is a retweet!');
  });
  it('has 1 image', () => {
    const data1 = [
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
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Tweet
            key={key}
            data={data1[0]}
            tweets={data1}
            setTweets={setTweets}
          />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('13images')).toBeInTheDocument();
  });
  it('has 1 video', () => {
    const data1 = [
      {
        id: '123456',
        isRetweet: true,
        text: 'This is a retweet!',
        createdAt: '2023-11-29T21:33',
        attachmentsURL: ['https://example.com/video.mp4'],
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
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Tweet
            key={key}
            data={data1[0]}
            tweets={data1}
            setTweets={setTweets}
          />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('13images')).toBeInTheDocument();
  });
  it('has 3 images', () => {
    const data1 = [
      {
        id: '123456',
        isRetweet: true,
        text: 'This is a retweet!',
        createdAt: '2023-11-29T21:33',
        attachmentsURL: [
          'https://example.com/image.jpg',
          'https://example.com/image.jpg',
          'https://example.com/image.jpg',
        ],
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
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Tweet
            key={key}
            data={data1[0]}
            tweets={data1}
            setTweets={setTweets}
          />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('13images')).toBeInTheDocument();
  });
  it('has 4 images', () => {
    const data1 = [
      {
        id: '123456',
        isRetweet: true,
        text: 'This is a retweet!',
        createdAt: '2023-11-29T21:33',
        attachmentsURL: [
          'https://example.com/image.jpg',
          'https://example.com/image.jpg',
          'https://example.com/image.jpg',
          'https://example.com/image.jpg',
        ],
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
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Tweet
            key={key}
            data={data1[0]}
            tweets={data1}
            setTweets={setTweets}
          />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('24images')).toBeInTheDocument();
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

  it('navigates to the tweetpage on click anywhere', () => {
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

    const tweet = getByTestId(`${data[0].id}`);
    fireEvent.click(tweet);
    expect(navigate).toHaveBeenCalledWith(
      `/app/tweets/${data[0].id}`,
      expect.any(Object),
    );
  });
  it('changes color and count on unlike ', () => {
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

  it('changes color and count on like ', () => {
    const data1 = [
      {
        id: '123456',
        isRetweet: true,
        text: 'This is a retweet!',
        createdAt: '2023-11-29T21:33',
        attachmentsURL: [
          'https://example.com/image.jpg',
          'https://example.com/image.jpg',
        ],
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
        isLiked: false,
        isRetweeted: false,
        isReplied: true,
        likesCount: 10,
        retweetsCount: 5,
        repliesCount: 3,
      },
    ];
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Tweet
            key={key}
            data={data1[0]}
            tweets={data1}
            setTweets={setTweets}
          />
        </BrowserRouter>
      </AuthProvider>,
    );

    const likebtn = getByTestId('123456like');
    expect(likebtn).toHaveTextContent('10');
    const innerDiv = likebtn.querySelector('.Reply');
    expect(innerDiv).not.toHaveClass('text-[#F91880]');
    fireEvent.click(likebtn);
    expect(likebtn).toHaveTextContent('11');
  });
  it('changes color and count on repost ', () => {
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
    expect(repostbtn).toHaveTextContent('6');
  });

  it('changes color and count on unrepost ', () => {
    const data1 = [
      {
        id: '123456',
        isRetweet: true,
        text: 'This is a retweet!',
        createdAt: '2023-11-29T21:33',
        attachmentsURL: [
          'https://example.com/image.jpg',
          'https://example.com/image.jpg',
        ],
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
        isLiked: false,
        isRetweeted: true,
        isReplied: true,
        likesCount: 10,
        retweetsCount: 5,
        repliesCount: 3,
      },
    ];
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Tweet
            key={key}
            data={data1[0]}
            tweets={data1}
            setTweets={setTweets}
          />
        </BrowserRouter>
      </AuthProvider>,
    );

    const repostbtn = getByTestId('123456repost');
    expect(repostbtn).toHaveTextContent('5');
    const innerDiv = repostbtn.querySelector('.Reply');
    expect(innerDiv).toHaveClass('text-[#00BA7C]');
    fireEvent.click(repostbtn);
    expect(repostbtn).toHaveTextContent('4');
    expect(innerDiv).not.toHaveClass('text-[#00BA7C]');
  });
  it('should send a request to follow user', async () => {
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <ActionsMenu
            userId={1}
            tweet={data[0]}
            setTweets={setTweets}
            tweets={data}
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
    const followBtn = getByTestId('follow');
    expect(followBtn).toBeInTheDocument();
    fireEvent.click(followBtn);

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_DOMAIN}users/${data[0].user.username}/follow`,
      expect.objectContaining({
        method: 'POST',
        origin: true,
        credentials: 'include',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: data[0].user.username,
        }),
      }),
    );
  });

  it('should send a request to unfollow user', async () => {
    const data1 = [
      {
        id: '123456',
        isRetweet: true,
        text: 'This is a retweet!',
        createdAt: '2023-11-29T21:33',
        attachmentsURL: [
          'https://example.com/image.jpg',
          'https://example.com/image.jpg',
        ],
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
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <ActionsMenu
            userId={1}
            tweet={data1[0]}
            setTweets={setTweets}
            tweets={data1}
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
    const followBtn = getByTestId('follow');
    expect(followBtn).toBeInTheDocument();
    fireEvent.click(followBtn);

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_DOMAIN}users/${
        data1[0].user.username
      }/unfollow`,
      expect.objectContaining({
        method: 'DELETE',
        origin: true,
        credentials: 'include',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: data1[0].user.username,
        }),
      }),
    );
  });

  it('should send a request to block user', async () => {
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <ActionsMenu
            userId={1}
            tweet={data[0]}
            setTweets={setTweets}
            tweets={data}
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
    const blockBtn = getByTestId('block');
    expect(blockBtn).toBeInTheDocument();
    fireEvent.click(blockBtn);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_DOMAIN}users/${data[0].user.username}/block`,
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({
          userName: data[0].user.username,
        }),
      }),
    );
  });

  it('should send a request to mute user', async () => {
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <ActionsMenu
            userId={1}
            tweet={data[0]}
            setTweets={setTweets}
            tweets={data}
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
    const muteBtn = getByTestId('mute');
    expect(muteBtn).toBeInTheDocument();
    fireEvent.click(muteBtn);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_DOMAIN}users/${data[0].user.username}/mute`,
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({
          userName: data[0].user.username,
        }),
      }),
    );
  });
  it('should send a request to delete tweet', async () => {
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
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

    const menubtn = getByTestId('123456menubtn');
    await user.click(menubtn);
    vi.advanceTimersByTime(700);
    await waitFor(() => {
      expect(getByTestId('123456menu')).toBeInTheDocument();
    });
    const deleteBtn = getByTestId('delete');
    expect(deleteBtn).toBeInTheDocument();
    fireEvent.click(deleteBtn);
    expect(window.fetch).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_DOMAIN}tweets/${data[0].id}/deleteTweet`,
      expect.objectContaining({
        origin: true,
        credentials: 'include',
        withCredentials: true,
        method: 'DELETE',
      }),
    );
  });
});
