/* eslint-disable no-unused-expressions */
import { render, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import AuthProvider from '../../contexts/Auth/AuthProvider';
import { useAuth } from '../../hooks/AuthContext';
import ReplyMenu from '../../Pages/ReplyMenu';

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

describe('ReplyMenu', () => {
  it('renders the component successfully', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <ReplyMenu
              replies={reply}
              userId={reply[0].user.userId}
              reply={reply[0]}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    // console.log(reply[0].replyId);
    expect(getByTestId(`${reply[0].replyId}menubtn`)).to.exist;
    // expect(getByTestId(`${reply[0].replyId}menu`)).not.to.exist;
  });

  it('show the menu options successfully', () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <ReplyMenu
              replies={reply}
              userId={reply[0].user.userId}
              reply={reply[0]}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    // console.log(reply[0].replyId);
    fireEvent.click(getByTestId(`${reply[0].replyId}menubtn`));
    expect(getByTestId(`${reply[0].replyId}menu`)).to.exist;
    expect(getByTestId(`${reply[0].replyId}-deletebtn`)).to.exist;
    // fireEvent.click(getByTestId(`${reply[0].replyId}menubtn`));
    // expect(getByTestId(`${reply[0].replyId}menu`)).not.to.exist;
  });

  it('deletes the reply successfully', async () => {
    const { getByTestId } = render(
      <AuthProvider value={{ dispatch, user: null, isAuthenticated: true }}>
        <BrowserRouter>
          <ProtectedRoute>
            <ReplyMenu
              replies={reply}
              userId={reply[0].user.userId}
              reply={reply[0]}
            />
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>,
    );
    // console.log(reply[0].replyId);
    fireEvent.click(getByTestId(`${reply[0].replyId}menubtn`));
    expect(getByTestId(`${reply[0].replyId}menu`)).to.exist;
    fireEvent.click(getByTestId(`${reply[0].replyId}-deletebtn`));
    await waitFor(() => {
      //   expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_DOMAIN}tweets/undefined/deleteReplies/${
          reply[0].replyId
        }`,
        {
          method: 'DELETE',
          origin: true,
          credentials: 'include',
          withCredentials: true,
        },
      );
    });
    // fireEvent.click(getByTestId(`${reply[0].replyId}menubtn`));
    // expect(getByTestId(`${reply[0].replyId}menu`)).not.to.exist;
  });
});
