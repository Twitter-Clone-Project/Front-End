/* eslint-disable no-unused-expressions */
import { render, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import LikersList from '../../Pages/LikersList';

const reply = [
  {
    replyId: '123456',
    user: {
      userId: '123',
      username: 'janesmith',
      screenName: 'Jane Smith',
    },
  },
];
const dispatch = vi.fn();
useAuth.mockReturnValue({
  dispatch: vi.fn(),
  isAuthenticated: true,
  user: reply[0].user,
});
// vi.mock('./api'); // Mocking the API function
vi.mock('../../hooks/AuthContext.js');
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

// ... (Previous test setup code remains the same)

describe('RetweetersList', () => {
  it('renders the component successfully', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <LikersList />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    // console.log(reply[0].replyId);
    expect(getByTestId(`likers-list`)).to.exist;
    expect(getByTestId(`likers-list-backbtn`)).to.exist;
    expect(getByTestId(`likers-List-1`)).to.exist;
    expect(getByTestId(`likers-list-2`)).to.exist;
    // expect(getByTestId(`${reply[0].replyId}menu`)).not.to.exist;
  });

  it('gets the likers successfully', async () => {
    render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <LikersList />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    // console.log(reply[0].replyId);
    // fireEvent.click(getByTestId(`${reply[0].replyId}menubtn`));
    // expect(getByTestId(`${reply[0].replyId}menu`)).to.exist;
    // fireEvent.click(getByTestId(`${reply[0].replyId}-deletebtn`));
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}tweets/undefined/likers`,
        {
          method: 'GET',
          origin: true,
          credentials: 'include',
          withCredentials: true,
        },
      );
    });
    // fireEvent.click(getByTestId(`${reply[0].replyId}menubtn`));
    // expect(getByTestId(`${reply[0].replyId}menu`)).not.to.exist;
  });

  it('navigates back on click on the back button', () => {
    // Mock pastPath with the correct pathname
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <LikersList />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );

    const backButton = getByTestId(`likers-list-backbtn`);
    fireEvent.click(backButton);
    // Ensure that navigate was called with the expected pastPath
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
