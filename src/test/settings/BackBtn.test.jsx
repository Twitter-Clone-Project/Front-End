import { fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import * as router from 'react-router';
import BackBtn from '../../components/Settings-page/BackBtn';

vi.mock('../../hooks/AuthContext.js');
describe('BackBtn', () => {
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
  it('should render backBtn', () => {
    const { getByTestId } = render(<BackBtn onClick={() => navigate('/')} />);
    expect(getByTestId('close-drawer-btn')).toBeInTheDocument();
    fireEvent.click(getByTestId('close-drawer-btn'));
    expect(navigate).toHaveBeenCalled('/');
  });
});
