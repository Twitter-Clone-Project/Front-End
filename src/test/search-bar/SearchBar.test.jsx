import { render, fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import SearchBar from '../../components/search-bar/SearchBar';

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

describe('SearchBar', () => {
  it('renders SearchBar component', () => {
    // Render the SearchBar component
    const { getByTestId } = render(
      <SearchBar
        value=""
        setValue={() => {}}
      />,
    );

    // Assert that the component renders
    expect(getByTestId('search-bar')).toBeInTheDocument();
    // Add more assertions as needed for specific elements

    // For instance, check for the presence of the input field
    expect(getByTestId('search-bar-field')).toBeInTheDocument();
  });

  // it('updates search value on input change', () => {
  //   const { getByTestId } = render(<SearchBar value="" />);
  //   const inputField = getByTestId('search-bar-textfield');

  //   // Simulate typing into the search input field
  //   fireEvent.change(inputField, { target: { value: 'test query' } });

  //   // Check if the value in the input field has been updated
  //   expect(inputField).toHaveDisplayValue('test query');
  // });

  // it('updates search value on input change', () => {
  //   // Mock the setState function
  //   const setState = vi.fn();
  //   vi.spyOn(React, 'useState').mockReturnValue(['', setState]);
  //   const { getByTestId } = render(
  //     <SearchBar
  //       value="test"
  //       setValue={() => {}}
  //     />,
  //   );
  //   const inputField = getByTestId('search-bar-textfield');
  //   fireEvent.focus(inputField);
  //   expect(getByTestId('search-bar-textfield-erase')).toBeInTheDocument();
  //   // fireEvent.click(getByTestId('search-bar-textfield-erase'));
  // });
  // it('handles input focus and blur', () => {
  //   const { getByTestId } = render(
  //     <SearchBar
  //       value=""
  //       setValue={() => {}}
  //     />,
  //   );
  //   const searchBar = getByTestId('search-bar');
  //   const inputField = getByTestId('search-bar-textfield');

  //   fireEvent.focus(inputField);
  //   expect(searchBar).toHaveStyle('border-color: blue;'); // Assuming border turns blue on focus

  //   // fireEvent.blur(searchBar);
  //   // expect(searchBar).toHaveStyle('border-color: #AAB8C2;'); // Assuming border resets on blur
  // });

  //   it('clears search results on click', () => {
  //     const setValueMock = vi.fn();
  //     const { getByTestId } = render(
  //       <SearchBar
  //         value="test"
  //         setValue={setValueMock}
  //       />,
  //     );
  //     const eraseIcon = getByTestId('search-bar-textfield-erase');

  //     fireEvent.click(eraseIcon);
  //     expect(setValueMock).toHaveBeenCalledWith(''); // Check if setValue was called with an empty string
  //   });

  // More test cases for other functionalities such as handling focus, blur, and displaying search results can be added here.
});
