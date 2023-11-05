import React, { useState, useEffect } from 'react';
import Button from '../form-controls/Button';
import PasswordInput from '../form-controls/passwordInput';

// eslint-disable-next-line react/prop-types
function NewPassword({ isOpen, onClose }) {
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
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-screen flex h-screen w-full items-center justify-center md:bg-black  md:bg-opacity-50">
      <div className="popup-content relative flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white  dark:bg-pure-black dark:text-white md:h-[650px] md:w-[600px] ">
        <div className=" absolute top-0 mt-3 h-[53px]  w-[600px] ">
          <button
            type="submit"
            className="fixed left-3 top-3 h-[20px] w-[20px]  text-sm  md:absolute md:left-3 md:top-0"
            onClick={onClose}
          >
            <svg
              viewBox="0 0 48 48"
              fill="#5F6368"
            >
              <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
              <path
                d="M0 0h48v48H0z"
                fill="none"
              />
            </svg>
          </button>

          <svg
            width="30px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className=" absolute left-0 right-0 top-0 mx-auto"
          >
            {' '}
            <path
              d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
              className="fill-black dark:fill-white"
            />
          </svg>
        </div>
        <div className=" flex h-[536px]  w-[80%] flex-col items-center justify-between md:w-[440px]">
          <div className="flex h-[208px] w-[100%] flex-col justify-start">
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

          <div className=" flex w-[100%] flex-col justify-start">
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
      </div>
    </div>
  );
}

export default NewPassword;
