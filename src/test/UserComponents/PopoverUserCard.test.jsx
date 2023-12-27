import React from 'react';
import * as router from 'react-router';
import PopoverUserCard from '../../components/userComponents/PopoverUserCard';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import userEvent from '@testing-library/user-event';

vi.mock('../../hooks/AuthContext.js');

describe('PopoverUserCard', () => {
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

  it('renders without crashing', async () => {
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <PopoverUserCard
              popoverIsFollowed={false}
              popoverIsFollowing={false}
              popoverUserPicture="image-url"
              popoverUserName="JohnDoe"
              popoverUserID="john_doe"
              popoverDiscription="Some description"
              popoverFollowing="10"
              popoverFollowers="20"
              popoverIsBlocked={false}
            >
              <div data-testid={`tempPopoverItem`}>hello</div>
            </PopoverUserCard>
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    const elemet = getByTestId('tempPopoverItem');
    await user.hover(elemet);
    vi.advanceTimersByTime(700);
    await waitFor(() => {
      expect(getByTestId('PopoverUserCard_john_doe_0')).toBeInTheDocument();
      expect(getByTestId('PopoverUserCard_john_doe_1')).toBeInTheDocument();
      expect(
        queryByTestId('PopoverUserCard_john_doe_2'),
      ).not.toBeInTheDocument();
      expect(getByTestId('PopoverUserCard_john_doe_1')).toHaveTextContent(
        'Follow',
      );
    });
  });

  it('should appear Following in the button when the user is Followed', async () => {
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <PopoverUserCard
              popoverIsFollowed={true}
              popoverIsFollowing={false}
              popoverUserPicture="image-url"
              popoverUserName="JohnDoe"
              popoverUserID="john_doe"
              popoverDiscription="Some description"
              popoverFollowing="10"
              popoverFollowers="20"
              popoverIsBlocked={false}
            >
              <div data-testid={`tempPopoverItem`}>hello</div>
            </PopoverUserCard>
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    const elemet = getByTestId('tempPopoverItem');
    await user.hover(elemet);
    vi.advanceTimersByTime(700);
    await waitFor(() => {
      expect(getByTestId('PopoverUserCard_john_doe_1')).toHaveTextContent(
        'Following',
      );
      fireEvent.mouseEnter(getByTestId('PopoverUserCard_john_doe_1'));
      expect(getByTestId('PopoverUserCard_john_doe_1')).toHaveTextContent(
        'Unfollow',
      );
      fireEvent.mouseLeave(getByTestId('PopoverUserCard_john_doe_1'));
    });
  });

  it('should appear Blocked in the button when the user is blocked', async () => {
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <PopoverUserCard
              popoverIsFollowed={true}
              popoverIsFollowing={false}
              popoverUserPicture="image-url"
              popoverUserName="JohnDoe"
              popoverUserID="john_doe"
              popoverDiscription="Some description"
              popoverFollowing="10"
              popoverFollowers="20"
              popoverIsBlocked={true}
            >
              <div data-testid={`tempPopoverItem`}>hello</div>
            </PopoverUserCard>
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    const elemet = getByTestId('tempPopoverItem');
    await user.hover(elemet);
    vi.advanceTimersByTime(700);
    await waitFor(() => {
      expect(getByTestId('PopoverUserCard_john_doe_1')).toHaveTextContent(
        'Blocked',
      );
    });
  });

  it('should appear Follows Element when the user is Following you', async () => {
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <PopoverUserCard
              popoverIsFollowed={false}
              popoverIsFollowing={true}
              popoverUserPicture="image-url"
              popoverUserName="JohnDoe"
              popoverUserID="john_doe"
              popoverDiscription="Some description"
              popoverFollowing="10"
              popoverFollowers="20"
              popoverIsBlocked={false}
            >
              <div data-testid={`tempPopoverItem`}>hello</div>
            </PopoverUserCard>
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    const elemet = getByTestId('tempPopoverItem');
    await user.hover(elemet);
    vi.advanceTimersByTime(700);
    await waitFor(() => {
      expect(queryByTestId('PopoverUserCard_john_doe_2')).toBeInTheDocument();
    });
  });

  it('should not appear Follow Button when the user is the same one', async () => {
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { queryByTestId, getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <PopoverUserCard
              popoverIsFollowed={false}
              popoverIsFollowing={false}
              popoverUserPicture="image-url"
              popoverUserName="JohnDoe"
              popoverUserID="Horses"
              popoverDiscription="Some description"
              popoverFollowing="10"
              popoverFollowers="20"
              popoverIsBlocked={false}
            >
              <div data-testid={`tempPopoverItem`}>hello</div>
            </PopoverUserCard>
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    const elemet = getByTestId('tempPopoverItem');
    await user.hover(elemet);
    vi.advanceTimersByTime(700);
    await waitFor(() => {
      expect(
        queryByTestId('PopoverUserCard_john_doe_1'),
      ).not.toBeInTheDocument();
    });
  });

  it('handles follow correctly', async () => {
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ status: true, message: 'Followed Successfully' }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <PopoverUserCard
              popoverIsFollowed={false}
              popoverUserPicture="image-url"
              popoverUserName="JohnDoe"
              popoverUserID="john_doe"
              popoverDiscription="Some description"
              popoverFollowing="10"
              popoverFollowers="20"
              opoverSetLocalIsFollowed
              popoverIsBlocked={false}
            >
              <div data-testid={`tempPopoverItem`}>hello</div>
            </PopoverUserCard>
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    const elemet = getByTestId('tempPopoverItem');
    await user.hover(elemet);
    vi.advanceTimersByTime(700);
    await waitFor(async () => {
      expect(getByTestId('PopoverUserCard_john_doe_1')).not.toBeDisabled();
      fireEvent.click(getByTestId('PopoverUserCard_john_doe_1'));
      await waitFor(() => {
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toHaveBeenCalledWith(
          `${import.meta.env.VITE_API_DOMAIN}users/john_doe/follow`,
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
  });

  it('handles unfollow correctly', async () => {
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ status: true, message: 'UnFollowed Successfully' }),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <PopoverUserCard
              popoverIsFollowed={true}
              popoverUserPicture="image-url"
              popoverUserName="JohnDoe"
              popoverUserID="john_doe"
              popoverDiscription="Some description"
              popoverFollowing="10"
              popoverFollowers="20"
              opoverSetLocalIsFollowed
              popoverIsBlocked={false}
            >
              <div data-testid={`tempPopoverItem`}>hello</div>
            </PopoverUserCard>
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    const elemet = getByTestId('tempPopoverItem');
    await user.hover(elemet);
    vi.advanceTimersByTime(700);
    await waitFor(async () => {
      expect(getByTestId('PopoverUserCard_john_doe_1')).not.toBeDisabled();
      fireEvent.click(getByTestId('PopoverUserCard_john_doe_1'));
      await waitFor(() => {
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toHaveBeenCalledWith(
          `${import.meta.env.VITE_API_DOMAIN}users/john_doe/unfollow`,
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
    });
  });

  it('should go to followers/following list on click on follower or following count', async () => {
    const user = userEvent.setup({
      advanceTimers: (ms) => vi.advanceTimersByTime(ms),
    });
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'Arabian', username: 'Horses' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <PopoverUserCard
              popoverIsFollowed={true}
              popoverUserPicture="image-url"
              popoverUserName="JohnDoe"
              popoverUserID="john_doe"
              popoverDiscription="Some description"
              popoverFollowing="10"
              popoverFollowers="20"
              opoverSetLocalIsFollowed
              popoverIsBlocked={false}
            >
              <div data-testid={`tempPopoverItem`}>hello</div>
            </PopoverUserCard>
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    const elemet = getByTestId('tempPopoverItem');
    await user.hover(elemet);
    vi.advanceTimersByTime(700);
    await waitFor(async () => {
      fireEvent.click(getByTestId('PopoverUserCard_john_doe_3'));
      await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith(`/app/john_doe/following`, {
          state: '/',
        });
      });
      expect(navigate).toHaveBeenCalled();
      fireEvent.click(getByTestId('PopoverUserCard_john_doe_4'));
      expect(navigate).toHaveBeenCalledWith(`/app/john_doe/followers`, {
        state: '/',
      });
    });
  });

  describe('PopoverUserCard', () => {
    const navigate2 = vi.fn();

    beforeEach(() => {
      vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate2);
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

    });
    it('should go to user profile on click on name, userName or img', async () => {
      const user = userEvent.setup({
        advanceTimers: (ms) => vi.advanceTimersByTime(ms),
      });
      useAuth.mockReturnValue({
        dispatch: vi.fn(),
        isAuthenticated: true,
        user: { name: 'Arabian', username: 'Horses' },
      });
      const { getByTestId } = render(
        <AuthProvider>
          <BrowserRouter>
            <ProtectedRoute>
              <PopoverUserCard
                popoverIsFollowed={true}
                popoverUserPicture="image-url"
                popoverUserName="JohnDoe"
                popoverUserID="john_doe"
                popoverDiscription="Some description"
                popoverFollowing="10"
                popoverFollowers="20"
                opoverSetLocalIsFollowed
                popoverIsBlocked={false}
              >
                <div data-testid={`tempPopoverItem`}>hello</div>
              </PopoverUserCard>
            </ProtectedRoute>
          </BrowserRouter>
        </AuthProvider>,
      );
      const elemet = getByTestId('tempPopoverItem');
      await user.hover(elemet);
      vi.advanceTimersByTime(700);
      await waitFor(() => {
        fireEvent.click(getByTestId('PopoverUserCard_john_doe_img'));
        expect(navigate2).toHaveBeenCalled();
        expect(navigate2).toHaveBeenCalledWith(`/app/john_doe`, {
          preventScrollReset: undefined,
          relative: undefined,
          replace: false,
          state: undefined,
          unstable_viewTransition: undefined,
        });
        fireEvent.click(getByTestId('PopoverUserCard_john_doe_userInf'));
        expect(navigate2).toHaveBeenCalled();
        expect(navigate2).toHaveBeenCalledWith(`/app/john_doe`, {
          preventScrollReset: undefined,
          relative: undefined,
          replace: false,
          state: undefined,
          unstable_viewTransition: undefined,
        });
      });
    });
  });
});
