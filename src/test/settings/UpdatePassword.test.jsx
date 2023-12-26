import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import OwnToaster from '../../components/OwnToaster';
import ChangePassword from '../../components/Settings-page/ChangePassword';

vi.mock('../../hooks/AuthContext.js');
describe('Update password component', () => {
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

  it('should render change password', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <ChangePassword />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('change-password-page')).toBeInTheDocument();
    expect(getByTestId('Current Password')).toBeInTheDocument();
    expect(getByTestId('New Password')).toBeInTheDocument();
    expect(getByTestId('Confirm New Password')).toBeInTheDocument();
    expect(getByTestId('save')).toBeDisabled();
  });
  it('should change password successfully', async () => {
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
            user: {
              username: 'Mo_asdas',
              name: 'Mahmoud Sobhy',
              email: 'mahsobhy3@gmail.com',
              birthDate: '2001-12-15',
              isConfirmed: true,
              imageUrl:
                'https://kady-twitter-images.s3.amazonaws.com/IMG_20210909_103459_Bokeh.jpg',
              bio: 'hi',
              location: '',
              website: 'https://www.linkedin.com/in/mahmoudabdelrashid01/',
              userId: '1',
              followersCount: '0',
              followingsCount: '4',
              bannerUrl:
                'https://kady-twitter-images.s3.amazonaws.com/DefaultBanner.png',
              isOnline: false,
              createdAt: '2023-12-16T17:23:27.347Z',
            },
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE3MDM1MTMzNzgsImV4cCI6MTcwNDM3NzM3OH0.Q0wzB9vCQhumUpPFo1PNc-1LKzb_MfR_FV3iAOvtpz4',
          },
        }),
    });
    const { getByTestId, getByText, queryByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <ChangePassword />
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    fireEvent.change(getByTestId('Current Password'), {
      target: { value: 'password' },
    });
    fireEvent.change(getByTestId('New Password'), {
      target: { value: 'pass' },
    });
    expect(
      getByText('Your password needs to be at least 8 characters.'),
    ).toBeInTheDocument();
    fireEvent.change(getByTestId('New Password'), {
      target: { value: 'password1' },
    });
    fireEvent.change(getByTestId('Confirm New Password'), {
      target: { value: 'pas' },
    });
    expect(
      getByText('Your password needs to be at least 8 characters.'),
    ).toBeInTheDocument();
    fireEvent.change(getByTestId('Confirm New Password'), {
      target: { value: 'passwords' },
    });
    expect(getByText('Passwords do not match')).toBeInTheDocument();
    expect(getByTestId('save')).toBeDisabled();
    fireEvent.change(getByTestId('Confirm New Password'), {
      target: { value: 'password1' },
    });

    expect(queryByText('Passwords do not match')).not.toBeInTheDocument();
    expect(getByTestId('save')).not.toBeDisabled();
    fireEvent.click(getByTestId('save'));
    await waitFor(() => {
      expect(
        getByText('Your password has been updated successfully!'),
      ).toBeInTheDocument();
    });
  });
  it('should change password successfully', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    window.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: false,
          message: 'error',
        }),
    });
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <ChangePassword />
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    fireEvent.change(getByTestId('Current Password'), {
      target: { value: 'password' },
    });
    fireEvent.change(getByTestId('New Password'), {
      target: { value: 'password1' },
    });
    fireEvent.change(getByTestId('Confirm New Password'), {
      target: { value: 'password1' },
    });
    expect(getByTestId('save')).not.toBeDisabled();
    fireEvent.click(getByTestId('save'));
    await waitFor(() => {
      expect(getByText('error')).toBeInTheDocument();
    });
  });
});
