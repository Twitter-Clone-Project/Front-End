import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import LandingPage from './components/landingPage/LandingPage';
import Login from './components/login-page/Login';
import ForgotPassword from './components/login-page/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/app-layout/AppLayout';
import UnprotectedRoute from './components/UnprotectedRoute';
import { useAuth } from './hooks/AuthContext';
import Spinner from './components/Spinner';
import SignUpForm from './components/sign-up/SignUpForm';
import FollowersList from './components/userComponents/FollowersList';
import FollowingList from './components/userComponents/FollowingList';
import Logout from './components/navigation-bars/Logout';
import LogoutConfirm from './components/navigation-bars/LogoutConfirm';
import DirectMessages from './components/Direct-Messages/DirectMessages';
import Homepage from './tweetPage/Homepage';

TimeAgo.addDefaultLocale(en);

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
        dispatch({ type: 'LOGIN', payload: data.data.user });
      } catch (err) {
        dispatch({ type: 'LOGOUT' });
      } finally {
        setIsLoading(false);
      }
    };
    refresh();
  }, [dispatch]);

  return isLoading ? (
    <div className="popup-screen absolute bottom-0 left-0 top-0 z-20 flex h-screen w-full items-center justify-center dark:bg-pure-black md:bg-border-gray">
      <Spinner />
    </div>
  ) : (
    <div className="flex h-full min-h-screen overflow-auto bg-white dark:bg-pure-black">
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
          </Route>
          <Route
            path="/signup"
            element={
              <UnprotectedRoute>
                <SignUpForm />
              </UnprotectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <UnprotectedRoute>
                <ForgotPassword />
              </UnprotectedRoute>
            }
          />
          <Route
            path="logout"
            element={
              <ProtectedRoute>
                <LogoutConfirm />
              </ProtectedRoute>
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
                // <h1 className="min-h-full  border-border-gray dark:text-white sm:border-x-[1px]">
                //   <div className="flex h-full flex-col items-start justify-center">
                //     {Array.from({ length: 100 }, () => 1).map(() => (
                //       <span key={uuid4()}>Home</span>
                //     ))}
                //   </div>
                // </h1>
                <Homepage />
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
              exact
              path=":username"
              element={
                <h1 className="flex items-center justify-center border-x-[1px] border-border-gray dark:text-white">
                  Profile Page
                </h1>
              }
            />
            <Route
              exact
              path=":username/following"
              element={<FollowingList />}
            />
            <Route
              exact
              path=":username/followers"
              element={<FollowersList />}
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
              element={<DirectMessages />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
