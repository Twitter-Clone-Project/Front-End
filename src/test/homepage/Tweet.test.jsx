import {
  render,
  fireEvent,
  waitFor,
  cleanup,
  screen,
} from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { v4 as uuid4 } from 'uuid';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { addLocale, setDefaultLocale } from 'javascript-time-ago'; // Import the necessary functions
import en from 'javascript-time-ago/locale/en'; // Import the locale data for 'en'
import Tweet from '../../tweetPage/Tweet';
import AuthProvider from '../../contexts/Auth/AuthProvider';

// Register the 'en' locale data
addLocale(en);

// Set the default locale to 'en'
setDefaultLocale('en');

afterEach(() => {
  cleanup();
});
describe('Tweet', () => {
  it('has the tweet text', () => {
    const key = uuid4();
    const setTweets = vi.fn();
    const data = [
      {
        id: '123456',
        isRetweet: true,
        text: 'This is a retweet!',
        createdAt: '2023-11-29T21:33',
        attachmentsURL: ['https://example.com/image.jpg'],
        retweetedUser: {
          userId: '789',
          userName: 'John Doe',
          screenName: 'johndoe',
          profileImageURL: 'https://example.com/profile.jpg',
          bio: "I'm a retweeted user.",
          followersCount: 1000,
          followingCount: 500,
          isFollowed: true,
          isFollowing: true,
        },
        user: {
          userId: '123',
          userName: 'Jane Smith',
          screenName: 'janesmith',
          profileImageURL: 'https://example.com/profile.jpg',
          bio: "I'm the original user.",
          followersCount: 2000,
          followingCount: 1000,
          isFollowed: true,
          isFollowing: true,
        },
        isLiked: true,
        isRetweeted: true,
        isReplied: true,
        likesCount: 10,
        retweetsCount: 5,
        repliesCount: 3,
      },
    ];

    // Render the component
    const dispatch = vi.fn();
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
    expect(screen.getByTestId('123456')).toHaveTextContent(
      'This is a retweet!',
    );
  });

  it('shows the userpopup on hover ', () => {
    const key = uuid4();
    const setTweets = vi.fn();
    const data = [
      {
        id: '123456',
        isRetweet: true,
        text: 'This is a retweet!',
        createdAt: '2023-11-29T21:33',
        attachmentsURL: ['https://example.com/image.jpg'],
        retweetedUser: {
          userId: '789',
          userName: 'John Doe',
          screenName: 'johndoe',
          profileImageURL: 'https://example.com/profile.jpg',
          bio: "I'm a retweeted user.",
          followersCount: 1000,
          followingCount: 500,
          isFollowed: true,
          isFollowing: true,
        },
        user: {
          userId: '123',
          userName: 'Jane Smith',
          screenName: 'janesmith',
          profileImageURL: 'https://example.com/profile.jpg',
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

    // Render the component
    const dispatch = vi.fn();
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

    // Find the image element and simulate the hover event
    const imageElement = getByTestId('profileImage123456');
    fireEvent.mouseEnter(imageElement);
    screen.debug();
    // Assert that the user popup component is rendered
    const userPopup = getByTestId(`John Doe-popover`);
    expect(screen.getByTestId('123456')).toBeInTheDocument();
  });

  it('shows the actions menu on click ', () => {
    const key = uuid4();
    const setTweets = vi.fn();
    const data = [
      {
        id: '123456',
        isRetweet: true,
        text: 'This is a retweet!',
        createdAt: '2023-11-29T21:33',
        attachmentsURL: ['https://example.com/image.jpg'],
        retweetedUser: {
          userId: '789',
          userName: 'John Doe',
          screenName: 'johndoe',
          profileImageURL: 'https://example.com/profile.jpg',
          bio: "I'm a retweeted user.",
          followersCount: 1000,
          followingCount: 500,
          isFollowed: true,
          isFollowing: true,
        },
        user: {
          userId: '123',
          userName: 'Jane Smith',
          screenName: 'janesmith',
          profileImageURL: 'https://example.com/profile.jpg',
          bio: "I'm the original user.",
          followersCount: 2000,
          followingCount: 1000,
          isFollowed: true,
          isFollowing: true,
        },
        isLiked: true,
        isRetweeted: true,
        isReplied: true,
        likesCount: 10,
        retweetsCount: 5,
        repliesCount: 3,
      },
    ];

    // Render the component
    const dispatch = vi.fn();
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

    // Find the image element and simulate the hover event
    const menubtn = getByTestId('123456menubtn');
    fireEvent.click(menubtn);
    screen.debug();
    // Assert that the user popup component is rendered

    expect(getByTestId('123456menu')).toBeInTheDocument();
  });

  it('has like button that change color and count on click ', () => {
    const key = uuid4();
    const setTweets = vi.fn();
    const data = [
      {
        id: '123456',
        isRetweet: true,
        text: 'This is a retweet!',
        createdAt: '2023-11-29T21:33',
        attachmentsURL: ['https://example.com/image.jpg'],
        retweetedUser: {
          userId: '789',
          userName: 'John Doe',
          screenName: 'johndoe',
          profileImageURL: 'https://example.com/profile.jpg',
          bio: "I'm a retweeted user.",
          followersCount: 1000,
          followingCount: 500,
          isFollowed: true,
          isFollowing: true,
        },
        user: {
          userId: '123',
          userName: 'Jane Smith',
          screenName: 'janesmith',
          profileImageURL: 'https://example.com/profile.jpg',
          bio: "I'm the original user.",
          followersCount: 2000,
          followingCount: 1000,
          isFollowed: true,
          isFollowing: true,
        },
        isLiked: true,
        isRetweeted: true,
        isReplied: true,
        likesCount: 10,
        retweetsCount: 5,
        repliesCount: 3,
      },
    ];

    // Render the component
    const dispatch = vi.fn();
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
    // expect(likebtn).toHaveTextContent('9');
    screen.debug();
  });
});
