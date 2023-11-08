import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import AuthProvider from './contexts/Auth/AuthProvider';
import Login from './components/login-page/Login';
import ForgotPassword from './components/login-page/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/app-layout/AppLayout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LandingPage />}
          >
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={
                <h1 className="absolute bottom-0 left-0 top-0 z-50 h-full w-full bg-black bg-opacity-50 text-white">
                  SignUp
                </h1>
              }
            />
          </Route>
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <h1 className="flex items-center justify-center border-x-[1px] border-border-gray dark:text-white">
                  Home
                </h1>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
