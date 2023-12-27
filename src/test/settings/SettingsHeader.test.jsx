import { fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import { act } from 'react-dom/test-utils';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import SettingsHeader from '../../components/Settings-page/SettingsHeader';

vi.mock('../../hooks/AuthContext.js');
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useLocation: vi.fn().mockImplementation(() => ({ pathname: '/app/home' })),
  };
});
describe('Settings Header', () => {
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
  it('should render settings header with back btn', () => {
    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <SettingsHeader title="test" />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('test-header')).toBeInTheDocument();
    expect(queryByTestId('close-drawer-btn')).not.toBeInTheDocument();
    window.outerWidth = 900;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(getByTestId('close-drawer-btn')).toBeInTheDocument();
  });
  it('should render settings header without back btn', () => {
    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <BrowserRouter>
          <SettingsHeader title="test" />
        </BrowserRouter>
      </AuthProvider>,
    );
    expect(getByTestId('test-header')).toBeInTheDocument();
    expect(queryByTestId('close-drawer-btn')).toBeInTheDocument();
    fireEvent.click(getByTestId('close-drawer-btn'));
    expect(navigate).toHaveBeenCalled(-1);
  });
});
