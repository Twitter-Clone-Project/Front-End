import React, { useState } from 'react';
import Button from '../form-controls/Button';
import EmailInput from '../form-controls/emailInput';
import PasswordInput from '../form-controls/passwordInput';
import GoogleSignInBtn from '../form-controls/GoogleSignIn';
import ForgotPassword from './ForgotPassword';

// eslint-disable-next-line react/prop-types
function Login({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const togglePopup = () => {
    setIsPasswordOpen(!isPasswordOpen);
  };
  const handleClick = () => {
    setIsPasswordOpen(true);
  };
  if (!isOpen) {
    return null;
  }
  if (isPasswordOpen) {
    return (
      <ForgotPassword
        isOpen={isPasswordOpen}
        onClose={togglePopup}
      />
    );
  }

  return (
    <div className="popup-screen flex h-screen w-full items-center justify-center md:bg-black  md:bg-opacity-50">
      <div className="popup-content relative flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white dark:bg-pure-black dark:text-white md:h-[650px] md:w-[600px] ">
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
        <div className=" flex h-[536px] w-[300px] flex-col items-center justify-around ">
          <div className="flex w-[300px] flex-row justify-start">
            <h1 className=" my-3 text-[31px] font-bold ">Sign in to X</h1>
          </div>
          <div className=" w-[300px] ">
            <GoogleSignInBtn />
          </div>
          <div className="flex flex-row">
            <hr className=" m-4 w-[125px] text-dark-gray" />
            <h1 className=" text-[20px]">or</h1>
            <hr className=" m-4 w-[125px] text-dark-gray" />
          </div>
          <EmailInput
            error={emailError}
            setError={setEmailError}
            email={email}
            setEmail={setEmail}
          />
          <PasswordInput
            password={password}
            setPassword={setPassword}
            error={passwordError}
            setError={setPasswordError}
            title="Password"
          />
          <Button
            backGroundColor="black"
            backGroundColorDark="white"
            label="Log in"
            borderColor="black"
            labelColor="white"
            labelColorDark="black"
            path=""
          />
          <Button
            backGroundColor="white"
            backGroundColorDark="black"
            label="Forgot password?"
            borderColor="black"
            labelColor="black"
            labelColorDark="white"
            path=""
          />
          <button
            type="submit"
            onClick={handleClick}
          >
            Show Component
          </button>

          <div className="flex w-[300px] flex-row justify-start">
            <h1 className="text-[15px] text-dark-gray">
              Don&#39;t have an account?
              <span>
                <a
                  href="/"
                  className="text-blue"
                >
                  {' '}
                  Sign up{' '}
                </a>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
