import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import OwnToaster from '../../components/OwnToaster';
import EmailFlow from '../../components/Settings-page/EmailFlow';

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

  it('should render change email component', async () => {
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
          <EmailFlow />
        </BrowserRouter>
      </AuthProvider>,
    );
    fireEvent.change(getByTestId('Password'), { target: { value: '1234567' } });
    fireEvent.click(getByTestId('Next'));
    await waitFor(() => {
      expect(getByTestId('change-email-popup')).toBeInTheDocument();
      expect(getByTestId('Email')).toBeInTheDocument();
      expect(getByTestId('Next')).toBeInTheDocument();
      expect(getByTestId('close-btn')).toBeInTheDocument();
      fireEvent.click(getByTestId('close-btn'));
      expect(navigate).toHaveBeenCalledWith(-1);
    });
  });
  it('should render change email successfully', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: {
        name: 'mahmoud',
        username: 'MoSobhy',
        email: 'mahsobhy3@gmail.com',
      },
    });
    window.fetch.mockResolvedValueOnce({
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
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
          message: 'Email updated successfully',
        }),
    });
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <EmailFlow />
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    fireEvent.change(getByTestId('Password'), { target: { value: '1234567' } });
    fireEvent.click(getByTestId('Next'));
    await waitFor(() => {
      fireEvent.change(getByTestId('Email'), {
        target: { value: 'momo@gamil.com' },
      });
    });
    await waitFor(() => {
      expect(getByTestId('Next')).toBeDisabled();
      expect(getByText('Email is already taken')).toBeInTheDocument();
      fireEvent.change(getByTestId('Email'), {
        target: { value: 'momo1@gmail.com' },
      });
    });
    await waitFor(() => {
      expect(getByTestId('Next')).not.toBeDisabled();
      fireEvent.click(getByTestId('Next'));
    });
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}profile/updateEmail`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          origin: true,
          credentials: 'include',
          withCredentials: true,
          body: JSON.stringify({ newEmail: 'momo1@gmail.com' }),
        },
      );
    });
  });
  it('should render change email failed then success', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: {
        name: 'mahmoud',
        username: 'MoSobhy',
        email: 'mahsobhy3@gmail.com',
      },
    });
    window.fetch.mockResolvedValueOnce({
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
          status: false,
          message: 'error',
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
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          status: false,
          message: 'error update',
        }),
    });
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <EmailFlow />
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    fireEvent.change(getByTestId('Password'), { target: { value: '1234567' } });
    fireEvent.click(getByTestId('Next'));
    await waitFor(() => {
      fireEvent.change(getByTestId('Email'), {
        target: { value: 'momo@gamil.com' },
      });
    });
    await waitFor(() => {
      expect(getByTestId('Next')).toBeDisabled();
      expect(getByText('Email is already taken')).toBeInTheDocument();
      fireEvent.change(getByTestId('Email'), {
        target: { value: 'momo1@gmail.com' },
      });
    });
    await waitFor(() => {
      expect(getByText('error')).toBeInTheDocument();
      fireEvent.change(getByTestId('Email'), {
        target: { value: 'momo12@gmail.com' },
      });
    });
    await waitFor(() => {
      expect(getByTestId('Next')).not.toBeDisabled();
      fireEvent.click(getByTestId('Next'));
    });
    await waitFor(() => {
      expect(getByText('error update')).toBeInTheDocument();
    });
  });
  it('should render confirm email', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: {
        name: 'mahmoud',
        username: 'MoSobhy',
        email: 'mahsobhy3@gmail.com',
      },
    });
    window.fetch.mockResolvedValueOnce({
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
          status: true,
          message: 'Email updated successfully',
        }),
    });
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
          message: 'Email confirmed successfully',
        }),
    });
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <EmailFlow />
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    fireEvent.change(getByTestId('Password'), { target: { value: '1234567' } });
    fireEvent.click(getByTestId('Next'));
    await waitFor(() => {
      fireEvent.change(getByTestId('Email'), {
        target: { value: 'momo@gamil.com' },
      });
    });
    await waitFor(() => {
      expect(getByTestId('Next')).not.toBeDisabled();
      fireEvent.click(getByTestId('Next'));
    });
    await waitFor(() => {
      expect(getByTestId('Code')).toBeInTheDocument();
      fireEvent.change(getByTestId('Code'), { target: { value: '123456' } });
      fireEvent.click(getByTestId('Next'));
    });
    await waitFor(() => {
      expect(
        getByText('Your email has been updated successfully'),
      ).toBeInTheDocument();
      expect(navigate).toHaveBeenCalledWith(-1);
    });
  });
  it('should close confirm email', async () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: {
        name: 'mahmoud',
        username: 'MoSobhy',
        email: 'mahsobhy3@gmail.com',
      },
    });
    window.fetch.mockResolvedValueOnce({
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
          status: true,
          message: 'Email updated successfully',
        }),
    });

    const { getByTestId, getByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <EmailFlow />
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    fireEvent.change(getByTestId('Password'), { target: { value: '1234567' } });
    fireEvent.click(getByTestId('Next'));
    await waitFor(() => {
      fireEvent.change(getByTestId('Email'), {
        target: { value: 'momo@gamil.com' },
      });
    });
    await waitFor(() => {
      expect(getByTestId('Next')).not.toBeDisabled();
      fireEvent.click(getByTestId('Next'));
    });
    await waitFor(() => {
      expect(getByTestId('Code')).toBeInTheDocument();
      fireEvent.click(getByTestId('close-btn'));
      expect(navigate).toHaveBeenCalledWith(-1);
    });
  });
});
