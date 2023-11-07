import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../form-controls/Button';
import EmailInput from '../form-controls/emailInput';
import PasswordInput from '../form-controls/passwordInput';
import GoogleSignInBtn from '../form-controls/GoogleSignIn';
import BoxCard from '../sign-up/BoxCard';

function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  function handleOnClose() {
    navigate('/');
  }

  return (
    <div className="popup-screen absolute bottom-0 left-0 top-0 z-20 flex h-screen w-full items-center justify-center md:bg-dark-gray md:bg-opacity-50">
      <BoxCard classes="items-center">
        <div className=" absolute left-0 top-0 flex h-[53px] w-full items-center">
          <button
            type="submit"
            onClick={handleOnClose}
            className="absolute left-3 top-3 h-[20px] w-[20px]  text-sm"
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
            className="mx-auto"
          >
            {' '}
            <path
              d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
              className="fill-black dark:fill-white"
            />
          </svg>
        </div>
        <div className="mt-4 flex flex-1 flex-col items-center justify-between">
          <div className="flex w-[300px] flex-row justify-start">
            <h1 className=" my-3 text-[31px] font-bold ">Sign in to X</h1>
          </div>
          <div className="w-full">
            <GoogleSignInBtn label="Sign In with Google" />
          </div>
          <div className="flex w-full flex-row items-center">
            <hr className="flex-1 text-dark-gray" />
            <h1 className=" px-2 text-[20px]">or</h1>
            <hr className="flex-1 text-dark-gray" />
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
            borderColor="gray"
            labelColor="black"
            labelColorDark="white"
            to="/forgot-password"
          />

          <div className="flex w-[300px] flex-row justify-start">
            <h1 className="text-[15px] text-dark-gray">
              Don&#39;t have an account?
              <span>
                <Link
                  to="/signup"
                  className="text-blue"
                >
                  {' '}
                  Sign up{' '}
                </Link>
              </span>
            </h1>
          </div>
        </div>
      </BoxCard>
    </div>
  );
}

export default Login;
