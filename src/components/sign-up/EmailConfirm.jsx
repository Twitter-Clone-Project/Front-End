import React, { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import BoxCard from '../BoxCard';
import Button from '../form-controls/Button';
import BasicInput from '../form-controls/BasicInput';
import Spinner from '../Spinner';
import OwnToaster from '../OwnToaster';
import NewPassword from '../login-page/NewPassword';

function EmailConfirm({ email }) {
  const [code, setCode] = useState('');
  const [err, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
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
      if (data.status === true) {
        toast('Incorrect email');
      } else
        toast('Something went wrong!\nCheck your connection and try again');
    } catch (error) {
      toast('Something went wrong!\nCheck your connection and try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendCode = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://${import.meta.env.VITE_API_DOMAIN}auth/verifyEmailInFrgtPass`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, otp: code }),
        },
      );
      const data = await res.json();
      if (data.status === false) {
        toast('Incorrect code');
      } else {
        setResetPasswordOpen(true);
      }
    } catch (error) {
      toast('Something went wrong!\nCheck your connection and try again');
    } finally {
      setIsLoading(false);
    }
  };

  if (resetPasswordOpen) return <NewPassword />;

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
                onClick={handleResendCode}
                className="mt-2 px-2 text-start text-xs"
              >
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">Didn&#39;t receive email?</a>
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

EmailConfirm.propTypes = {
  email: PropTypes.string.isRequired,
};
export default EmailConfirm;