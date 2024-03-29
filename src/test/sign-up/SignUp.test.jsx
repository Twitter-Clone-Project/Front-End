/* eslint-disable no-shadow */
import React from 'react';
import * as router from 'react-router';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import SignUpForm from '../../components/sign-up/SignUpForm';
import EmailConfirm from '../../components/sign-up/EmailConfirm';
import UnprotectedRoute from '../../components/UnprotectedRoute';
import GoogleSignInBtn from '../../components/form-controls/GoogleSignIn';
import OwnToaster from '../../components/OwnToaster';

vi.mock('@react-oauth/google', async () => {
  const mod = await vi.importActual('@react-oauth/google');
  return {
    ...mod,
    useGoogleLogin: vi.fn().mockImplementation(({ onSuccess, onError }) =>
      // eslint-disable-next-line camelcase
      onSuccess({ access_token: 'token' }),
    ),
  };
});
describe('SignUp component', () => {
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
  const dispatch = vi.fn();

  it('should render the signUp form', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <SignUpForm test />
        </BrowserRouter>
      </AuthProvider>,
    );
    const emailInput = getByTestId('Email');
    const month = getByTestId('Month');
    const day = getByTestId('Day');
    const year = getByTestId('Year');
    const nameInput = getByTestId('Name');
    const usernameInput = getByTestId('Username');
    const passwordInput = getByTestId('Password');
    const passwordConfirmInput = getByTestId('Confirm Password');
    const submitButton = getByTestId('Next');
    const cardBox = getByTestId('box-card');

    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(month).toBeInTheDocument();
    expect(day).toBeInTheDocument();
    expect(year).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(cardBox).toBeInTheDocument();
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue('');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
  it('should submit the form with valid credentials', async () => {
    const { getByTestId, queryByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <SignUpForm test />
        </BrowserRouter>
      </AuthProvider>,
    );

    const emailInput = getByTestId('Email');
    const month = getByTestId('Month');
    const day = getByTestId('Day');
    const year = getByTestId('Year');
    const nameInput = getByTestId('Name');
    const usernameInput = getByTestId('Username');
    const passwordInput = getByTestId('Password');
    const passwordConfirmInput = getByTestId('Confirm Password');
    const submitButton = getByTestId('Next');
    window.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            status: true,
            data: {
              isFound: false,
            },
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            status: true,
            data: {
              isFound: false,
            },
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            status: true,
            data: {
              user: 'Mahmoud',
            },
          }),
      });

    fireEvent.change(usernameInput, { target: { value: 'Test Username' } });
    await waitFor(() => {
      expect(queryByTestId('Username-err')).not.toBeInTheDocument();
    });
    fireEvent.change(nameInput, { target: { value: 'Test' } });

    fireEvent.change(nameInput, { target: { value: '' } });
    expect(getByTestId('Name-err')).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: 'Test' } });
    expect(queryByTestId('Name-err')).toBeNull();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    await waitFor(() => {
      expect(queryByTestId('email-err')).not.toBeInTheDocument();
    });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'pass' },
    });

    expect(getByTestId('Password-err')).toBeInTheDocument();
    expect(getByTestId('Confirm Password-err')).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.change(passwordConfirmInput, { target: { value: 'password1' } });
    expect(getByTestId('Confirm Password-err')).toBeInTheDocument();
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'password' },
    });

    fireEvent.change(month, { target: { value: 'February' } });
    fireEvent.change(day, { target: { value: '15' } });
    fireEvent.change(year, { target: { value: '2000' } });

    await waitFor(async () => {
      fireEvent.click(submitButton);
      expect(getByTestId('Code')).toBeInTheDocument();
    });
  });
  it('should submit the form with invalid data', async () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <UnprotectedRoute>
            <SignUpForm test />
          </UnprotectedRoute>
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    window.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            status: true,
            data: {
              isFound: true,
            },
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            status: true,
            data: {
              isFound: false,
            },
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            status: true,
            data: {
              isFound: true,
            },
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            status: true,
            data: {
              isFound: false,
            },
          }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: () =>
          Promise.resolve({
            status: false,
            message: 'Invalid inputs',
          }),
      });
    const emailInput = getByTestId('Email');
    const month = getByTestId('Month');
    const day = getByTestId('Day');
    const year = getByTestId('Year');
    const nameInput = getByTestId('Name');
    const usernameInput = getByTestId('Username');
    const passwordInput = getByTestId('Password');
    const passwordConfirmInput = getByTestId('Confirm Password');

    fireEvent.change(usernameInput, { target: { value: 'Test Username' } });
    await waitFor(async () => {
      expect(getByTestId('Username-err')).toBeInTheDocument();
    });
    fireEvent.change(usernameInput, { target: { value: 'Test Usernamem' } });
    await waitFor(() => {
      expect(queryByTestId('Username-err')).not.toBeInTheDocument();
    });
    fireEvent.change(nameInput, { target: { value: 'Test' } });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    await waitFor(() => {
      expect(getByTestId('email-error')).toBeInTheDocument();
    });
    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: 'test12@example.com' } });
      expect(queryByTestId('email-error')).not.toBeInTheDocument();
    });

    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.change(passwordConfirmInput, {
      target: { value: 'password' },
    });

    fireEvent.change(month, { target: { value: 'March' } });

    fireEvent.change(day, { target: { value: '15' } });
    fireEvent.change(year, { target: { value: '2000' } });

    await waitFor(() => {
      fireEvent.click(getByTestId('Next'));
      expect(getByText('Invalid inputs')).toBeInTheDocument();
    });
  });
  it('should submit the code with valid code', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <UnprotectedRoute>
            <EmailConfirm
              type="signup"
              email="mahmoud@gmail.com"
            />
          </UnprotectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    const codeInput = getByTestId('Code');
    expect(codeInput).toBeInTheDocument();

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: true, data: { user: 'mahmoud' } }),
    });

    fireEvent.change(codeInput, { target: { value: '123456' } });
    fireEvent.click(getByTestId('Next'));

    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith('/app', { replace: true }),
    );
  });
  it('should submit the code with Invalid code', async () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <UnprotectedRoute>
            <EmailConfirm
              type="signup"
              email="mahmoud@gmail.com"
            />
          </UnprotectedRoute>
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ status: false, message: 'Invalid code' }),
    });
    const codeInput = getByTestId('Code');
    expect(codeInput).toBeInTheDocument();
    fireEvent.change(codeInput, { target: { value: '123456' } });
    fireEvent.click(getByTestId('Next'));

    await waitFor(() => expect(getByText('Invalid code')).toBeInTheDocument());
  });
  it('should resend code successfully', async () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <UnprotectedRoute>
            <EmailConfirm
              type="signup"
              email="mahmoud@gmail.com"
            />
          </UnprotectedRoute>
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: true }),
    });
    fireEvent.click(getByTestId('resend-code'));
    await waitFor(() =>
      expect(getByText('Email sent successfully')).toBeInTheDocument(),
    );
  });
  it('should resend code with failure', async () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <BrowserRouter>
          <UnprotectedRoute>
            <EmailConfirm
              type="signup"
              email="mahmoud@gmail.com"
            />
          </UnprotectedRoute>
        </BrowserRouter>
        <OwnToaster />
      </AuthProvider>,
    );
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({ status: false, message: 'something went wrong' }),
    });
    fireEvent.click(getByTestId('resend-code'));
    await waitFor(() =>
      expect(getByText('something went wrong')).toBeInTheDocument(),
    );
  });
  it('should render google sign in btn', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID_GOOGLE}>
          <GoogleSignInBtn label="Sign In with Google" />,
        </GoogleOAuthProvider>
      </AuthProvider>,
    );

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
          data: { url: 'http://localhost:2030' },
        }),
    });

    fireEvent.click(getByTestId('Sign In with Google'));

    await waitFor(async () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}auth/signWithGoogle`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          origin: true,
          credentials: 'include',
          withCredentials: true,
          body: JSON.stringify({
            googleAccessToken: 'token',
          }),
        },
      );
    });
  });
  it('should render google sign in btn with error', async () => {
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID_GOOGLE}>
          <GoogleSignInBtn label="Sign In with Google" />,
        </GoogleOAuthProvider>
      </AuthProvider>,
    );

    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({
          status: false,
          message: 'test error',
        }),
    });

    fireEvent.click(getByTestId('Sign In with Google'));

    expect(getByText('Sign In with Google')).toBeInTheDocument();
  });
});
