/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import VerifyPassword from './VerifyPassword';
import ChangeEmail from './ChangeEmail';
import EmailConfirm from '../sign-up/EmailConfirm';
import { useAuth } from '../../hooks/AuthContext';

/**
 * Renders the EmailFlow component.
 *
 * The EmailFlow component handles the flow for changing the user's email address.
 * It consists of multiple steps, including verifying the user's password, entering a new email address,
 * confirming the email change, and displaying a success message.
 *
 * @returns {JSX.Element} The rendered EmailFlow component.
 */
function EmailFlow() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  if (step === 0)
    return <VerifyPassword onClick={() => setStep((val) => val + 1)} />;
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
          type="update"
          newEmail={email}
          email={user.email}
          verifyUrl={`${import.meta.env.VITE_API_DOMAIN}profile/verifyEmail`}
          resendUrl={`${import.meta.env.VITE_API_DOMAIN}profile/updateEmail`}
          onClose={() => navigate(-1)}
          onSuccess={() => setStep((val) => val + 1)}
        />
      </div>
    );
  if (step === 3) {
    toast('Your email has been updated successfully', {
      id: 'toast',
    });
    navigate(-1);
  }
}

export default EmailFlow;
