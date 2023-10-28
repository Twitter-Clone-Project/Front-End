import * as React from 'react';
import LandingPage from './landingPage/LandingPage';
import Login from './login-page/Login'
import ForgotPassword from './login-page/ForgotPassword'
import Code from './login-page/Code'
import NewPassword from './login-page/NewPassword';
import { useState } from 'react';
function App() {
  const [isOpen, setIsOpen] = useState(true);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <LandingPage />
      <Login isOpen={isOpen} onClose={togglePopup}/>
      
      
    </div>
  );
}

export default App;
