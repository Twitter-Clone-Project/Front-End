/* eslint-disable no-shadow */
import React from 'react';
import * as router from 'react-router';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import SignUpForm from '../../components/sign-up/SignUpForm';
import EmailConfirm from '../../components/sign-up/EmailConfirm';
import UnprotectedRoute from '../../components/UnprotectedRoute';

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
          <SignUpForm />
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
          <SignUpForm />
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

    fireEvent.change(usernameInput, { target: { value: 'Test Username' } });
    fireEvent.change(nameInput, { target: { value: 'Test' } });

    fireEvent.change(nameInput, { target: { value: '' } });
    expect(getByTestId('Name-err')).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: 'Test' } });
    expect(queryByTestId('Name-err')).toBeNull();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

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
    fireEvent.click(submitButton);

    await waitFor(async () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `http://${import.meta.env.VITE_API_DOMAIN}auth/signup`,
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
            passwordConfirm: 'password',
            name: 'Test',
            username: 'Test Username',
            dateOfBirth: '2000-02-15',
            gRecaptchaResponse: '6LeousYoAAAAACH0uCm7e4NKQkOWgrZWxmPPCMBZ',
          }),
        },
      );
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
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: 'success' }),
    });
    const codeInput = getByTestId('Code');
    expect(codeInput).toBeInTheDocument();
    fireEvent.change(codeInput, { target: { value: '123456' } });
    fireEvent.click(getByTestId('Next'));

    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith('/app', { replace: true }),
    );
  });

  // it('should display an error message with invalid credentials', async () => {
  //   window.fetch.mockResolvedValueOnce({
  //     ok: false,
  //     json: () =>
  //       Promise.resolve({ status: 'error', message: 'Invalid credentials' }),
  //   });

  //   const { getByTestId, getByText } = render(
  //     <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
  //       <BrowserRouter>
  //         <Login />
  //       </BrowserRouter>
  //     </AuthProvider>,
  //   );
  //   const emailInput = getByTestId('emailInput');
  //   const passwordInput = getByTestId('passwordInput');
  //   const submitButton = getByTestId('Log in');

  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //   fireEvent.change(passwordInput, { target: { value: 'password' } });

  //   expect(getByTestId('emailInput')).toHaveValue('test@example.com');
  //   expect(getByTestId('passwordInput')).toHaveValue('password');
  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(getByText('Invalid credentials')).toBeInTheDocument();
  //   });
  // });

  // it('should display an error message with invalid credentials', async () => {
  //   window.fetch.mockResolvedValueOnce({
  //     ok: true,
  //     json: () =>
  //       Promise.resolve({
  //         status: 'success',
  //         data: { user: { name: 'mahmoud' } },
  //       }),
  //   });
  //   const { getByTestId } = render(
  //     <BrowserRouter>
  //       <AuthProvider>
  //         <Login />
  //       </AuthProvider>
  //     </BrowserRouter>,
  //   );

  //   const emailInput = getByTestId('emailInput');
  //   const passwordInput = getByTestId('passwordInput');
  //   const submitButton = getByTestId('Log in');

  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  //   fireEvent.change(passwordInput, { target: { value: 'password123' } });
  //   fireEvent.click(submitButton);

  //   await waitFor(() => expect(navigate).toHaveBeenCalledWith('/app'));
  // });
});
