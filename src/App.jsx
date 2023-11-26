import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
// import LandingPage from './components/landingPage/LandingPage';
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
import TweetList from './tweetPage/tweetList';
import AddPost from './tweetPage/AddPost';

function App() {
  return (
    <div>
      <LandingPage />
    </div>
  );
}

export default App;
