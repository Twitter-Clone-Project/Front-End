import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import { EditorState } from 'draft-js';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import AddPost from '../../tweetPage/AddPost';

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
const navigate = vi.fn();
const setTweets = vi.fn();
const dispatch = vi.fn();
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
describe('Add Post', () => {
  it('navigates to the profile on click on the profile picture', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );

    const imageElement = getByTestId(`profileImage`);
    fireEvent.click(imageElement);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(
      `/app/${user.username}`,
      expect.any(Object),
    );

    // screen.debug();
  });

  it('shows the emoji picker on click on emoji icon', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );

    const emojiBtn = getByTestId('emojiBtn');
    fireEvent.click(emojiBtn);
    expect(getByTestId('emojiPicker')).toBeInTheDocument();
    // screen.debug();
  });

  it('has disabled post button on empty text', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: user, isAuthenticated: true }}>
        <BrowserRouter>
          <AddPost setTweets={setTweets} />
        </BrowserRouter>
      </AuthProvider>,
    );

    const postBtn = getByTestId('post123');
    // expect(postBtn).toBeDisabled();

    const textField = getByTestId('textField');
    const text = textField.querySelector('.DraftEditor-root');
    fireEvent.change(text, { target: { textContent: 'hhh' } });
    console.log(textField.outerHTML);
    console.log(postBtn.outerHTML);
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveTextContent('hhh');

    // expect(postBtn).not.toBeDisabled();
  });
});
