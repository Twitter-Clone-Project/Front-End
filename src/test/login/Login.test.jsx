/* eslint-disable no-shadow */
import React from 'react';
import * as router from 'react-router';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import Login from '../../components/login-page/Login';
import Button from '../../components/form-controls/Button';
import EmailInput from '../../components/form-controls/emailInput';

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

  // it('btn', () => {
  //   const { getByTestId } = render(<Button label="btn" />);
  //   const btn = getByTestId('btn');
  //   expect(btn).toBeInTheDocument();
  // });
  // it('btn2', () => {
  //   const { getByTestId } = render(
  //     <Button
  //       label="btn"
  //       backGroundColorDark="black"
  //     />,
  //   );
  //   const btn = getByTestId('btn');
  //   expect(btn).toBeInTheDocument();
  // });
  // it('em', () => {
  //   const { getByTestId } = render(
  //     <EmailInput
  //       email="test@example.com"
  //       setEmail={vi.fn()}
  //       error=""
  //       setError={vi.fn()}
  //     />,
  //   );
  //   const btn = getByTestId('emailInput');
  //   expect(btn).toBeInTheDocument();
  // });

  it('should render the login form', () => {
    const { getByLabelText, getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>,
    );
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByTestId('Log in');
    const cardBox = getByTestId('box-card');

    // show or hide password
    const showIcon = getByTestId('showIcon');
    fireEvent.click(showIcon);
    const hideIcon = getByTestId('hideIcon');
    expect(hideIcon).toBeInTheDocument();
    fireEvent.click(hideIcon);
    expect(getByTestId('showIcon')).toBeInTheDocument();

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

    const emailInput = getByTestId('emailInput');
    const passwordInput = getByTestId('passwordInput');
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

    const emailInput = getByTestId('emailInput');
    const passwordInput = getByTestId('passwordInput');
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
        Promise.resolve({ status: 'error', message: 'Invalid credentials' }),
    });

    const { getByTestId, getByText } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: false }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>,
    );
    const emailInput = getByTestId('emailInput');
    const passwordInput = getByTestId('passwordInput');
    const submitButton = getByTestId('Log in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(getByTestId('emailInput')).toHaveValue('test@example.com');
    expect(getByTestId('passwordInput')).toHaveValue('password');
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
          status: 'success',
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

    const emailInput = getByTestId('emailInput');
    const passwordInput = getByTestId('passwordInput');
    const submitButton = getByTestId('Log in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/app'));
  });
});
