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

function EmailConfirm({ email, type = 'reset' }) {
  const [code, setCode] = useState('');
  const [err, setError] = useState('');
  const [resetUser, setResetUser] = useState(null);
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
      if (type === 'reset') {
        setResetUser(data.data.user);
        setResetPasswordOpen(true);
      } else dispatch({ type: 'LOGIN', payload: data.data.user });
    } catch (error) {
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (resetPasswordOpen)
    return (
      <NewPassword
        email={email}
        user={type === 'reset' ? resetUser : null}
      />
    );

  return (
    <div className="confirm mx-auto flex min-h-full w-full flex-1 flex-col items-center justify-center text-lg text-black dark:bg-border-gray dark:text-white">
      {isLoading ? (
        <Spinner />
      ) : (
        <BoxCard classes="mx-auto">
          <div className="mx-auto mt-5 flex h-full min-w-[300px] flex-1 flex-col px-5">
            <p className="text-start text-3xl font-semibold">
              We sent you a code
            </p>
            <span className="mb-5 py-2 text-start text-sm text-dark-gray">
              Enter it below to confirm{' '}
              <em className="font-semibold">{email || null}</em>
            </span>
            <div className=" flex flex-col">
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
                className="mt-1 px-2 text-start text-xs"
              >
                <span className="text-blue hover:underline">
                  Didn&#39;t receive email?
                </span>
              </button>
            </div>
            <div className="mx-auto mt-auto flex h-full w-full items-end">
              <Button
                backGroundColor="white"
                labelColor="black"
                disabled={err !== '' || !code}
                borderColor="none"
                onClick={handleSendCode}
                label="Next"
              />
            </div>
          </div>
        </BoxCard>
      )}
      <OwnToaster />
    </div>
  );
}

EmailConfirm.defaultProps = {
  type: 'reset',
};

EmailConfirm.propTypes = {
  email: PropTypes.string.isRequired,
  type: PropTypes.string,
};
export default EmailConfirm;
