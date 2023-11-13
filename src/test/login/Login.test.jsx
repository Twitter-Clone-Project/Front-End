/* eslint-disable no-shadow */
import React from 'react';
import * as router from 'react-router';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import Login from '../../components/login-page/Login';
import ForgotPassword from '../../components/login-page/ForgotPassword';
import NewPassword from '../../components/login-page/NewPassword';
import EmailConfirm from '../../components/sign-up/EmailConfirm';

describe('Login component', () => {
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

  it('should render the login form', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>,
    );
    const emailInput = getByTestId('Email');
    const passwordInput = getByTestId('Password');
    const submitButton = getByTestId('Log in');
    const cardBox = getByTestId('box-card');

    // show or hide password
    const showIcon = getByTestId('Password-showIcon');
    fireEvent.click(showIcon);
    const hideIcon = getByTestId('Password-hideIcon');
    expect(hideIcon).toBeInTheDocument();
    fireEvent.click(hideIcon);
    expect(getByTestId('Password-showIcon')).toBeInTheDocument();

    expect(emailInput).toBeInTheDocument();
    expect(cardBox).toBeInTheDocument();
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue('');
    expect(submitButton).toBeInTheDocument();
  });
  it('should submit the form with valid credentials', async () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>,
    );

    const emailInput = getByTestId('Email');
    const passwordInput = getByTestId('Password');
    const submitButton = getByTestId('Log in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `http://${import.meta.env.VITE_API_DOMAIN}auth/signin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          origin: true,
          credentials: 'include',
          withCredentials: true,
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password',
          }),
        },
      );
    });
  });
  it('should submit the form with valid credentials', async () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>,
    );

    const emailInput = getByTestId('Email');
    const passwordInput = getByTestId('Password');
    const submitButton = getByTestId('Log in');

    fireEvent.change(emailInput, { target: { value: 'testexample.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    const emailError = getByTestId('email-error');
    expect(submitButton).toBeDisabled();
    expect(emailError).toBeInTheDocument();
  });

  it('should display an error message with invalid credentials', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({ status: false, message: 'Invalid credentials' }),
    });

    const { getByTestId, getByText } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>,
    );
    const emailInput = getByTestId('Email');
    const passwordInput = getByTestId('Password');
    const submitButton = getByTestId('Log in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(getByTestId('Email')).toHaveValue('test@example.com');
    expect(getByTestId('Password')).toHaveValue('password');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('should display an error message with invalid credentials', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
          data: { user: { name: 'mahmoud' } },
        }),
    });
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>,
    );

    const emailInput = getByTestId('Email');
    const passwordInput = getByTestId('Password');
    const submitButton = getByTestId('Log in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/app'));
  });
  it('should render forgot password', async () => {
    window.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
        }),
    });
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <ForgotPassword />
        </AuthProvider>
      </BrowserRouter>,
    );
    const container = getByTestId('forgot-password');
    const emailInput = getByTestId('Email');
    const submitButton = getByTestId('Next');

    expect(container).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `http://${import.meta.env.VITE_API_DOMAIN}auth/forgetPassword`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          origin: true,
          credentials: 'include',
          withCredentials: true,
          body: JSON.stringify({ email: 'test@example.com' }),
        },
      );
      expect(getByTestId('Code')).toBeInTheDocument();
    });
  });
  it('should render forgot password with error', async () => {
    window.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: false,
          message: 'Invalid credentials',
        }),
    });
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <ForgotPassword />
        </AuthProvider>
      </BrowserRouter>,
    );
    const container = getByTestId('forgot-password');
    const emailInput = getByTestId('Email');
    const submitButton = getByTestId('Next');

    expect(container).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('should set New Password correctly', async () => {
    window.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
          data: { user: { name: 'mahmoud' } },
        }),
    });
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <NewPassword email="mahsobhy3@gmail.com" />
        </AuthProvider>
      </BrowserRouter>,
    );

    const passwordConfirmInput = getByTestId('Confirm your password');
    const passwordInput = getByTestId('Enter a new password');

    expect(passwordConfirmInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const submitButton = getByTestId('Change password');

    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    expect(getByTestId('Enter a new password-err')).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'pass' },
    });
    expect(getByTestId('Confirm your password-err')).toBeInTheDocument();
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'password123' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/app');
    });
  });
  it('should render New Password with error', async () => {
    window.fetch.mockResolvedValue({
      ok: false,
      json: () =>
        Promise.resolve({
          status: false,
          message: 'Invalid passwords',
        }),
    });
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <NewPassword email="mahsobhy3@gmail.com" />
        </AuthProvider>
      </BrowserRouter>,
    );

    const passwordConfirmInput = getByTestId('Confirm your password');
    const passwordInput = getByTestId('Enter a new password');

    expect(passwordConfirmInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const submitButton = getByTestId('Change password');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'password123' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Invalid passwords')).toBeInTheDocument();
    });
  });

  it('should render new password after code confirm', async () => {
    window.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
        }),
    });
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <EmailConfirm
            type="reset"
            email="mahsobhy3@gmail.com"
          />
        </AuthProvider>
      </BrowserRouter>,
    );

    const codeInput = getByTestId('Code');
    fireEvent.change(codeInput, { target: { value: '123456' } });

    const submitButton = getByTestId('Next');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByTestId('reset-password')).toBeInTheDocument();
    });
  });
});
