import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './landingPage/LandingPage';
import AuthProvider from './contexts/AuthProvider';

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
              element={
                <h1 className="absolute bottom-0 left-0 top-0 z-50 h-full w-full bg-black bg-opacity-50 text-white">
                  Login
                </h1>
              }
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
            element={<h1>Forgot Password</h1>}
          />
          <Route
            path="/email-confirm"
            element={<h1>Confirm Email</h1>}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
