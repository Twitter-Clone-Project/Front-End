import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import AuthProvider from './contexts/Auth/AuthProvider';
import Login from './components/login-page/Login';
import ForgotPassword from './components/login-page/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';

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
            path="/authenticated"
            element={
              <ProtectedRoute>
                <h1>You Are Authenticated</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
