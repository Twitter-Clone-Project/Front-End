import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import OwnToaster from '../../components/OwnToaster';
import UpdateUsername from '../../components/Settings-page/UpdateUsername';

vi.mock('../../hooks/AuthContext.js');
describe('Update Username component', () => {
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

  it('should render Update Username component', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <UpdateUsername />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('update-username-page')).toBeInTheDocument();
    expect(getByTestId('Username')).toBeInTheDocument();
  });
  it('should send a request to update username successfully', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    window.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
          data: {
            isFound: false,
          },
        }),
    });
    window.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
          data: {
            newUsername: 'Username',
          },
        }),
    });
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <UpdateUsername />
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    fireEvent.change(getByTestId('Username'), {
      target: { value: 'Username' },
    });
    await waitFor(() => {
      const controller = new AbortController();
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}users/Username/isUsernameFound`,
        {
          signal: controller.signal,
        },
      );
      fireEvent.click(getByTestId('save'));
    });
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(2);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}profile/updateUsername`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          origin: true,
          credentials: 'include',
          withCredentials: true,
          body: JSON.stringify({
            newUsername: 'Username',
          }),
        },
      );
      expect(
        getByText('Your Username has been updated successfully!'),
      ).toBeInTheDocument();
    });
  });
  it('should render username found', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
          data: {
            isFound: true,
          },
        }),
    });
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
          data: {
            isFound: false,
          },
        }),
    });
    const { getByTestId, getByText, queryByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <UpdateUsername />
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    fireEvent.change(getByTestId('Username'), {
      target: { value: 'Username' },
    });
    await waitFor(() => {
      expect(getByText('Username is already taken')).toBeInTheDocument();
      fireEvent.change(getByTestId('Username'), {
        target: { value: 'Usernam' },
      });
    });
    await waitFor(() => {
      expect(queryByText('Username is already taken')).not.toBeInTheDocument();
    });
  });
  it('should render error from backend', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
          data: {
            isFound: false,
          },
        }),
    });
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          status: false,
          message: 'error updating',
        }),
    });
    const { getByTestId, getByText, queryByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <UpdateUsername />
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    fireEvent.change(getByTestId('Username'), {
      target: { value: 'Username' },
    });
    await waitFor(() => {
      expect(queryByText('Username is already taken')).not.toBeInTheDocument();
      expect(getByTestId('save')).not.toBeDisabled();
      fireEvent.click(getByTestId('save'));
    });
    await waitFor(() => {
      expect(getByText('error updating')).toBeInTheDocument();
    });
  });
  it('should render error from backend', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          status: false,
          message: 'error backend',
        }),
    });
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <UpdateUsername />
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    fireEvent.change(getByTestId('Username'), {
      target: { value: 'Us' },
    });
    expect(
      getByText('Username must contain atleast 3 character'),
    ).toBeInTheDocument();
    fireEvent.change(getByTestId('Username'), {
      target: { value: 'Username' },
    });
    await waitFor(() => {
      expect(getByText('error backend')).toBeInTheDocument();
    });
  });
});
