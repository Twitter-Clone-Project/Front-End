import * as React from 'react';
import { useState } from 'react';
import LandingPage from './landingPage/LandingPage';
import Login from './login-page/Login';

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <LandingPage />
      <Login
        isOpen={isOpen}
        onClose={togglePopup}
      />
    </div>
  );
}

export default App;
