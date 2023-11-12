import React, { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import BoxCard from '../BoxCard';
import Button from '../form-controls/Button';
import BasicInput from '../form-controls/BasicInput';
import Spinner from '../Spinner';
import OwnToaster from '../OwnToaster';
import NewPassword from '../login-page/NewPassword';
import { useAuth } from '../../hooks/AuthContext';

function EmailConfirm({ email, type = 'reset', user = null }) {
  const [code, setCode] = useState('');
  const [err, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const { dispatch } = useAuth();
  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://${import.meta.env.VITE_API_DOMAIN}auth/resendConfirmEmail`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        },
      );
      const data = await res.json();
      if (data.status === false) throw new Error(data.message);
      toast('Email sent successfully');
    } catch (error) {
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendCode = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://${import.meta.env.VITE_API_DOMAIN}auth/verifyEmail`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          origin: true,
          credentials: 'include',
          withCredentials: true,
          body: JSON.stringify({ email, otp: code }),
        },
      );

      const data = await res.json();
      if (data.status === false) throw new Error(data.message);

      if (type === 'reset') setResetPasswordOpen(true);
      else dispatch({ type: 'LOGIN', payload: user });
    } catch (error) {
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (resetPasswordOpen) return <NewPassword email={email} />;

  return (
    <div className="confirm flex h-screen w-full items-center justify-center text-lg text-black dark:bg-border-gray dark:text-white">
      {isLoading ? (
        <Spinner />
      ) : (
        <BoxCard>
          <div>
            <p className="mt-5 text-start text-2xl font-semibold">
              We sent you a code
            </p>
            <span className="mb-5 py-2 text-start text-sm text-dark-gray">
              Enter it below to confirm{' '}
              <em className="font-semibold">{email || null}</em>
            </span>
            <div className="mb-52 mt-6 flex flex-col">
              <BasicInput
                title="Code"
                value={code}
                setValue={setCode}
                error={err}
                setError={setError}
              />
              <button
                type="submit"
                data-testid="resend-code"
                onClick={handleResendCode}
                className="mt-2 px-2 text-start text-xs"
              >
                <span className="text-blue hover:underline">
                  Didn&#39;t receive email?
                </span>
              </button>
            </div>
          </div>
          <div className="justify-self-end">
            <Button
              backGroundColor="white"
              labelColor="black"
              disabled={err !== '' || !code}
              borderColor="none"
              onClick={handleSendCode}
              label="Next"
            />
          </div>
        </BoxCard>
      )}
      <OwnToaster />
    </div>
  );
}

EmailConfirm.defaultProps = {
  type: 'reset',
  user: null,
};

EmailConfirm.propTypes = {
  email: PropTypes.string.isRequired,
  type: PropTypes.string,
  user: PropTypes.objectOf(),
};
export default EmailConfirm;
