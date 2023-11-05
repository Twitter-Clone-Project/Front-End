import * as React from 'react';
import LandingPage from './landingPage/LandingPage';

import { useState } from 'react';

import NameInput from './form-controls/nameInput';
import EmailInput from './form-controls/emailInput';
import PasswordInput from './form-controls/passwordInput';
import NormalInput from './form-controls/BasicInput';

function App() {
  const [error, setError] = useState('');
  const [value, setValue] = useState('');

  return (
    <div>
      <LandingPage />
    </div>
  );
}

export default App;
