import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import OwnToaster from '../../components/OwnToaster';
import ComposeLayout from '../../components/compose-popup/ComposeLayout';

vi.mock('../../hooks/AuthContext.js');
describe('Compose post component', () => {
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
  it('should render compose layout', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <ComposeLayout setComposeOpen={vi.fn()}>
            <p data-testid="test child">test children</p>
          </ComposeLayout>
        </AuthProvider>
      </BrowserRouter>,
    );
    expect(getByTestId('compose-layout')).toBeInTheDocument();
    expect(getByTestId('test child')).toBeInTheDocument();
    expect(getByTestId('close-compose-form')).toBeInTheDocument();
    fireEvent.click(getByTestId('close-compose-form'));
  });
});
