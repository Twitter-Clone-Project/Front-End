import React, { useState } from 'react';
import Button from '../form-controls/Button';
import EmailInput from '../form-controls/emailInput';
import EmailConfirm from '../sign-up/EmailConfirm';
import BoxCard from '../BoxCard';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isCode, setIsCode] = useState(false);
  if (isCode) return <EmailConfirm email={email} />;

  return (
    <div className="popup-screen inset-0 flex h-screen w-full items-center justify-center overflow-auto md:bg-border-gray ">
      <BoxCard>
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
