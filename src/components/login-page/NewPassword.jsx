import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Button from '../form-controls/Button';
import PasswordInput from '../form-controls/passwordInput';
import BoxCard from '../BoxCard';
import OwnToaster from '../OwnToaster';
import Spinner from '../Spinner';
import { useAuth } from '../../hooks/AuthContext';

function NewPassword({ email }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const passwordLengthCheck = () => {
    if (confirmPassword.length < 7 && confirmPassword !== '') {
      setConfirmError(
        'Your password needs to be at least 8 characters.Please enter a longer one.',
      );
    }
    if (password.length < 7 && password !== '') {
      setError(
        'Your password needs to be at least 8 characters.Please enter a longer one.',
      );
    }
  };
  const passwordCheck = () => {
    if (
      confirmPassword !== password &&
      password !== '' &&
      confirmPassword !== ''
    ) {
      setConfirmError('Passwords do not match');
    }
  };

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://${import.meta.env.VITE_API_DOMAIN}auth/resetPassword`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          origin: true,
          credentials: 'include',
          withCredentials: true,
          body: JSON.stringify({
            email,
            newPassword: password,
            newPasswordConfirm: confirmPassword,
          }),
        },
      );
      const data = await res.json();
      if (data.status === false) throw new Error(data.message);
      dispatch({ type: 'LOGIN', payload: data });
      navigate('/app', { replace: true });
    } catch (err) {
      toast(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    passwordCheck();
    passwordLengthCheck();
  });

  return (
    <div
      data-testid="reset-password"
      className="popup-screen flex h-screen w-full items-center justify-center md:bg-dark-gray md:bg-opacity-50"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <BoxCard>
          <div className="mt-8 flex flex-1 flex-col items-center justify-between">
            <div className="flex w-[100%] flex-col justify-start">
              <h1 className=" my-3 text-[31px] font-bold ">
                Change a new password
              </h1>
              <p className="mb-3 text-[15px] text-dark-gray">
                Make sure your new password is 8 characters or more. Try
                including numbers, letters, and punctuationmarks for a
                <span>
                  {' '}
                  <a
                    href="https://help.twitter.com/en/safety-and-security/account-security-tips?ref=password_reset"
                    className="text-blue"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {' '}
                    strong password{' '}
                  </a>
                </span>
                .
              </p>
              <p className="mb-3 text-[15px] text-dark-gray">
                You&#39;ll be logged out of all active X sessions after your
                password is changed.
              </p>
              <div className="my-5 w-[100%]">
                <PasswordInput
                  password={password}
                  setPassword={setPassword}
                  error={error}
                  setError={setError}
                  title="Enter a new password"
                />
              </div>
              <div className=" my-5 w-[100%]">
                <PasswordInput
                  password={confirmPassword}
                  setPassword={setConfirmPassword}
                  error={confirmError}
                  setError={setConfirmError}
                  title="Confirm your password"
                />
              </div>
            </div>

            <div className="mb-4 flex w-[100%] flex-1 flex-col justify-end">
              <Button
                backGroundColor="black"
                backGroundColorDark="white"
                label="Change password"
                borderColor="black"
                labelColor="white"
                labelColorDark="black"
                disabled={
                  error !== '' ||
                  confirmError !== '' ||
                  !password ||
                  !confirmPassword
                }
                onClick={handleResetPassword}
                path=""
              />
            </div>
          </div>
        </BoxCard>
      )}
      <OwnToaster />
    </div>
  );
}
NewPassword.propTypes = {
  email: PropTypes.string.isRequired,
};
export default NewPassword;
