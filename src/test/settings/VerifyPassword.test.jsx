import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import VerifyPassword from '../../components/Settings-page/VerifyPassword';
import OwnToaster from '../../components/OwnToaster';

vi.mock('../../hooks/AuthContext.js');
describe('verify password component', () => {
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

  it('should render verify password component', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <VerifyPassword onClick={vi.fn()} />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('verify-password-popup')).toBeInTheDocument();
    expect(getByTestId('box-card')).toBeInTheDocument();
    expect(getByTestId('Password')).toBeInTheDocument();
    expect(getByTestId('Next')).toBeDisabled();
  });
  it('should close verify password component', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <VerifyPassword onClick={vi.fn()} />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('close-btn')).toBeInTheDocument();
    fireEvent.click(getByTestId('close-btn'));
    expect(navigate).toBeCalledWith(-1);
  });
  it('should verify password successfully', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: {
        name: 'mahmoud',
        username: 'MoSobhy',
        email: 'mahsobhy3@gmail.com',
      },
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
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <VerifyPassword onClick={vi.fn()} />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('Next')).toBeDisabled();
    fireEvent.change(getByTestId('Password'), { target: { value: '1234567' } });
    expect(getByTestId('Next')).not.toBeDisabled();
    fireEvent.click(getByTestId('Next'));
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}auth/signin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          origin: true,
          credentials: 'include',
          withCredentials: true,
          body: JSON.stringify({
            email: 'mahsobhy3@gmail.com',
            password: '1234567',
          }),
        },
      );
    });
  });
  it('should verify password failed', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: {
        name: 'mahmoud',
        username: 'MoSobhy',
        email: 'mahsobhy3@gmail.com',
      },
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
          <VerifyPassword onClick={vi.fn()} />
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    expect(getByTestId('Next')).toBeDisabled();
    fireEvent.change(getByTestId('Password'), { target: { value: '1234567' } });
    expect(getByTestId('Next')).not.toBeDisabled();
    fireEvent.click(getByTestId('Next'));
    await waitFor(() => {
      expect(getByText('error')).toBeInTheDocument();
    });
  });
});
