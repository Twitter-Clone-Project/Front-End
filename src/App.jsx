import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './components/landingPage/LandingPage';
import Login from './components/login-page/Login';
import ForgotPassword from './components/login-page/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/app-layout/AppLayout';
import UnprotectedRoute from './components/UnprotectedRoute';
import { useAuth } from './hooks/AuthContext';
import Spinner from './components/Spinner';
import SignUpForm from './components/sign-up/SignUpForm';
import FollowerList from './components/userComponents/FollowerList';
import FollowingList from './components/userComponents/FollowingList';

function App() {
  const { dispatch } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    const refresh = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://${import.meta.env.VITE_API_DOMAIN}auth/me`,
          {
            origin: true,
            credentials: 'include',
            withCredentials: true,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await res.json();
        if (data.status === false) throw new Error(data.message);
        dispatch({ type: 'LOGIN', payload: data });
      } catch (err) {
        dispatch({ type: 'LOGOUT' });
      } finally {
        setIsLoading(false);
      }
    };
    refresh();
  }, [dispatch]);

  return isLoading ? (
    <div className="popup-screen absolute bottom-0 left-0 top-0 z-20 flex h-screen w-full items-center justify-center md:bg-border-gray">
      <Spinner />
    </div>
  ) : (
    <div className="flex h-full min-h-screen bg-white dark:bg-pure-black">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <UnprotectedRoute>
                <LandingPage />
              </UnprotectedRoute>
            }
          >
            <Route
              path="/login"
              element={
                <UnprotectedRoute>
                  <Login />
                </UnprotectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <UnprotectedRoute>
                  <SignUpForm />
                </UnprotectedRoute>
              }
            />
          </Route>
          <Route
            path="/forgot-password"
            element={
              <UnprotectedRoute>
                <ForgotPassword />
              </UnprotectedRoute>
            }
          />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<Navigate to="home" />}
            />
            <Route
              path="home"
              element={
                <h1 className="flex h-full items-center justify-center border-x-[1px] border-border-gray dark:text-white">
                  Home
                </h1>
              }
            />
            <Route
              path="notifications"
              element={
                <h1 className="flex items-center justify-center border-x-[1px] border-border-gray dark:text-white">
                  Notifications
                </h1>
              }
            />
            <Route
              path=":username"
              element={
                <h1 className="flex items-center justify-center border-x-[1px] border-border-gray dark:text-white">
                  Profile Page
                </h1>
              }
            />
            <Route
              path="settings"
              element={
                <h1 className="flex items-center justify-center border-x-[1px] border-border-gray dark:text-white">
                  Settings
                </h1>
              }
            />
            <Route
              path="messages"
              element={
                <h1 className="flex items-center justify-center border-x-[1px] border-border-gray dark:text-white">
                  Messages
                </h1>
              }
            />
          </Route>
          <Route
            path="following"
            element={
              <UnprotectedRoute>
                <FollowingList />
              </UnprotectedRoute>
            }
          />
          <Route
            path="follower"
            element={
              <UnprotectedRoute>
                <FollowerList />
              </UnprotectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
