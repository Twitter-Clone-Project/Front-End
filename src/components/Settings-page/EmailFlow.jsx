import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import VerifyPassword from './VerifyPassword';
import ChangeEmail from './ChangeEmail';
import EmailConfirm from '../sign-up/EmailConfirm';

function EmailFlow() {
  const [step, setStep] = useState(2);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  if (step === 0)
    return (
      <VerifyPassword
        password={password}
        setPassword={setPassword}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
        onClick={() => setStep((val) => val + 1)}
      />
    );
  if (step === 1)
    return (
      <ChangeEmail
        email={email}
        setEmail={setEmail}
        error={emailError}
        setError={setEmailError}
        onClick={() => setStep((val) => val + 1)}
      />
    );
  if (step === 2)
    return (
      <div className="popup-screen absolute bottom-0 left-0 top-0 z-20 flex h-full w-full items-center justify-center">
        <EmailConfirm
          email={email}
          onClose={() => navigate(-1)}
          onSuccess={() => setStep((val) => val + 1)}
        />
      </div>
    );
  if (step === 3) {
    toast('Your email has been updated successfully');
    navigate(-1);
  }
}

export default EmailFlow;
