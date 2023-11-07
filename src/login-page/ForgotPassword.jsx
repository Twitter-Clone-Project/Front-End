import React, { useState } from 'react';
import Button from '../form-controls/Button';
import EmailInput from '../form-controls/emailInput';
import EmailConfirm from '../sign-up/EmailConfirm';
import BoxCard from '../sign-up/BoxCard';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isCode, setIsCode] = useState(false);
  if (isCode) return <EmailConfirm email={email} />;

  return (
    <div className="popup-screen inset-0 flex h-screen w-full items-center justify-center overflow-auto md:bg-border-gray ">
      <BoxCard>
        <div className=" absolute left-0 top-0 flex h-[53px] w-full items-center">
          <button
            type="submit"
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
        <div className=" mt-8 flex flex-1 flex-col justify-between">
          <div className="flex flex-col justify-start">
            <h1 className=" my-3 text-[31px] font-bold ">
              Find your X account
            </h1>
            <p className="mb-3 text-[15px] text-dark-gray">
              Enter the email and the username associated with your account to
              change your password.
            </p>

            <EmailInput
              error={emailError}
              setError={setEmailError}
              email={email}
              setEmail={setEmail}
            />
          </div>
          <div className=" flex w-[100%] flex-col justify-start">
            <Button
              backGroundColor="black"
              backGroundColorDark="white"
              label="Next"
              disabled={emailError !== '' || !email}
              borderColor="black"
              labelColor="white"
              labelColorDark="black"
              onClick={() => setIsCode(true)}
            />
          </div>
        </div>
      </BoxCard>
    </div>
  );
}

export default ForgotPassword;
