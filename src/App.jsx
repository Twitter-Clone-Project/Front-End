import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './landingPage/LandingPage';
import AuthProvider from './contexts/Auth/AuthProvider';
import Login from './login-page/Login';
import ForgotPassword from './login-page/ForgotPassword';

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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
