import React, { useState, useEffect } from 'react';
import Button from '../form-controls/Button';
import PasswordInput from '../form-controls/passwordInput';
import BoxCard from '../BoxCard';

function NewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmError, setConfirmError] = useState('');
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

  useEffect(() => {
    passwordCheck();
    passwordLengthCheck();
  });

  return (
    <div className="popup-screen flex h-screen w-full items-center justify-center md:bg-black md:bg-opacity-50">
      <BoxCard>
        <div className="mt-8 flex flex-1 flex-col items-center justify-between">
          <div className="flex w-[100%] flex-col justify-start">
            <h1 className=" my-3 text-[31px] font-bold ">
              Change a new password
            </h1>
            <p className="mb-3 text-[15px] text-dark-gray">
              Make sure your new password is 8 characters or more. Try including
              numbers, letters, and punctuationmarks for a
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
              path=""
            />
          </div>
        </div>
      </BoxCard>
    </div>
  );
}

export default NewPassword;
