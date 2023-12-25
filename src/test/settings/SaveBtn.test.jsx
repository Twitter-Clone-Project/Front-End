import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import * as router from 'react-router';
import SaveBtn from '../../components/Settings-page/SaveBtn';

describe('Save Btn', () => {
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
  it('should render save btn not disable', () => {
    const { getByTestId } = render(<SaveBtn />);
    expect(getByTestId('save')).toBeInTheDocument();
    expect(getByTestId('save')).not.toBeDisabled();
  });
  it('should render save btn', () => {
    const { getByTestId } = render(<SaveBtn totalError />);
    expect(getByTestId('save')).toBeInTheDocument();
    expect(getByTestId('save')).toBeDisabled();
  });
});
