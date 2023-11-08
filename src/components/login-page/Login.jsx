import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../form-controls/Button';
import EmailInput from '../form-controls/emailInput';
import PasswordInput from '../form-controls/passwordInput';
import GoogleSignInBtn from '../form-controls/GoogleSignIn';
import BoxCard from '../BoxCard';
import { useAuth } from '../../hooks/AuthContext';
import Spinner from '../Spinner';
import OwnToaster from '../OwnToaster';

function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://${import.meta.env.VITE_API_DOMAIN}auth/signin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await res.json();
      if (data.status === false) throw new Error(data.message);
      dispatch({ type: 'LOGIN', payload: data });
      navigate('/authenticated');
    } catch (err) {
      toast('Incorrect email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="popup-screen absolute bottom-0 left-0 top-0 z-20 flex h-screen w-full items-center justify-center md:bg-dark-gray md:bg-opacity-50">
      {isLoading ? (
        <Spinner />
      ) : (
        <BoxCard classes="items-center">
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
              disabled={emailError !== '' || !password || !email}
              onClick={handleLogin}
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
      )}
      <OwnToaster />
    </div>
  );
}

export default Login;
