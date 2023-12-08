import React from 'react';
// import * as router from 'react-router';
import { fireEvent, render } from '@testing-library/react';
import * as router from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import UserProfileInfo from '../../components/user-profile-card/UserProfileInfo';
import ProtectedRoute from '../../components/ProtectedRoute';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';

vi.mock('../../hooks/AuthContext.js');
describe('UserPeorfileInfo component', () => {
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

  it('should render with current user without errors', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserProfileInfo
              user={{
                name: 'mahmoud',
                username: 'MoSobhy',
                followersCount: 2,
                followingsCount: 1,
              }}
              setUpdateFormOpen={vi.fn()}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('user-photo')).toBeInTheDocument();
    expect(getByTestId('followers-btn')).toBeInTheDocument();
    expect(getByTestId('following-btn')).toBeInTheDocument();
    expect(getByTestId('following-count')).toBeInTheDocument();
    expect(getByTestId('Edit Profile')).toBeInTheDocument();
    fireEvent.click(getByTestId('Edit Profile'));
  });
  it('should render with other user without errors', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserProfileInfo
              user={{
                name: 'mahmoud',
                username: 'mooo',
                followersCount: 2,
                followingsCount: 1,
              }}
              setUpdateFormOpen={vi.fn()}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('user-photo')).toBeInTheDocument();
    expect(getByTestId('followers-btn')).toBeInTheDocument();
    expect(getByTestId('following-btn')).toBeInTheDocument();
    expect(getByTestId('following-count')).toBeInTheDocument();
    expect(queryByTestId('Edit Profile')).not.toBeInTheDocument();
    expect(getByTestId('mooo-UserProfile-UserActions')).toBeInTheDocument();
  });
  it('should go to followers/following list on click', () => {
    vi.mock('react-router', async () => {
      const mod = await vi.importActual('react-router-dom');
      return {
        ...mod,
        useLocation: vi
          .fn()
          .mockImplementation(() => ({ pathname: '/app/mooo' })),
      };
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <UserProfileInfo
              user={{
                name: 'mahmoud',
                username: 'mooo',
                followersCount: 2,
                followingsCount: 1,
              }}
              setUpdateFormOpen={vi.fn()}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.click(getByTestId('followers-btn'));
    expect(navigate).toHaveBeenCalledWith(`/app/mooo/followers`, {
      state: '/app/mooo',
    });
    fireEvent.keyDown(getByTestId('followers-btn'));
    expect(navigate).toHaveBeenCalledWith(`/app/mooo/followers`, {
      state: '/app/mooo',
    });
    fireEvent.click(getByTestId('following-btn'));
    expect(navigate).toHaveBeenCalledWith(`/app/mooo/following`, {
      state: '/app/mooo',
    });
    fireEvent.keyDown(getByTestId('following-btn'));
    expect(navigate).toHaveBeenCalledWith(`/app/mooo/following`, {
      state: '/app/mooo',
    });
  });
});
