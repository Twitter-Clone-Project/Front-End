import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../form-controls/Button';
import EmailInput from '../form-controls/emailInput';
import EmailConfirm from '../sign-up/EmailConfirm';
import BoxCard from '../BoxCard';
import Spinner from '../Spinner';
import OwnToaster from '../OwnToaster';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isCode, setIsCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}auth/forgetPassword`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          origin: true,
          credentials: 'include',
          withCredentials: true,
          body: JSON.stringify({ email }),
        },
      );
      const data = await res.json();
      if (data.status === false) throw new Error(data.message);
      setIsCode(true);
    } catch (err) {
      toast(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isCode) return <EmailConfirm email={email} />;

  return (
    <div
      data-testid="forgot-password"
      className="popup-screen inset-0 flex h-screen w-full items-center justify-center overflow-auto md:bg-dark-gray md:bg-opacity-50 "
    >
      {isLoading && <Spinner />}
      {!isLoading && (
        <BoxCard>
          <div className=" mx-auto mt-8 flex min-w-[300px] flex-1 flex-col justify-between px-5">
            <div className="mx-auto flex w-full flex-col justify-start">
              <div className="mx-auto max-w-[300px]">
                <h1 className=" my-3 text-[31px] font-bold ">
                  Find your X account
                </h1>
                <p className="mb-3 text-[15px]  text-dark-gray">
                  Enter the email and the username associated with your account
                  to change your password.
                </p>
              </div>

              <EmailInput
                error={emailError}
                setError={setEmailError}
                email={email}
                setEmail={setEmail}
              />
            </div>
            <div className=" flex w-[100%] flex-col justify-start">
              <Button
                label="Next"
                disabled={emailError !== '' || !email}
                borderColor="black"
                backGroundColor="black"
                backGroundColorDark="white"
                labelColor="white"
                labelColorDark="black"
                onClick={handleForgotPassword}
              />
            </div>
          </div>
        </BoxCard>
      )}
      <OwnToaster />
    </div>
  );
}

export default ForgotPassword;
