import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';

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
describe('Add Post', () => {});
