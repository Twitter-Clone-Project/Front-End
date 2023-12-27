import { fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import UpdateEmail from '../../components/Settings-page/UpdateEmail';

vi.mock('../../hooks/AuthContext.js');
describe('change email component', () => {
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

  it('should render Update email component', () => {
    useAuth.mockReturnValue({
      dispatch: vi.fn(),
      isAuthenticated: true,
      user: { name: 'mahmoud', username: 'MoSobhy' },
    });
    const { getByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <UpdateEmail />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('update-email-page')).toBeInTheDocument();
    expect(getByTestId('update-email-btn')).toBeInTheDocument();
    expect(getByTestId('Email')).toBeInTheDocument();
    expect(getByTestId('Email')).toBeDisabled();
    fireEvent.click(getByTestId('update-email-btn'));
    expect(navigate).toHaveBeenCalledWith('change-email', {
      preventScrollReset: undefined,
      relative: undefined,
      replace: false,
      state: undefined,
      // eslint-disable-next-line camelcase
      unstable_viewTransition: undefined,
    });
  });
});
