import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import BoxCard from '../BoxCard';
import PasswordInput from '../form-controls/passwordInput';
import Button from '../form-controls/Button';
import { useAuth } from '../../hooks/AuthContext';
import Spinner from '../Spinner';

function VerifyPassword({ onClick }) {
  const navigate = useNavigate();
  const { user, dispatch } = useAuth();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_DOMAIN}auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        origin: true,
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({ email: user.email, password }),
      });
      const data = await res.json();
      if (data.status === false) throw new Error(data.message);
      dispatch({
        type: 'LOGIN',
        payload: data.data.user,
        token: data.data.token,
      });
      onClick();
    } catch (err) {
      toast(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      data-testid="verify-password-popup"
      className="popup-screen absolute bottom-0 left-0 top-0 z-20 flex h-full w-full items-center justify-center md:bg-dark-gray md:bg-opacity-50"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <BoxCard onClose={() => navigate(-1)}>
          <div className="mx-auto flex h-full w-full max-w-[70%] flex-1 flex-col">
            <div className="mt-12">
              <p className="flex items-center text-3xl font-semibold">
                Verify your password
              </p>
              <span className="text-sm text-light-thin">
                Re-enter your X password to continue.
              </span>
            </div>
            <div className="mx-auto mt-6 flex h-full w-full flex-1 flex-col justify-between">
              <PasswordInput
                title="Password"
                password={password}
                setPassword={setPassword}
                error={passwordError}
                setError={setPasswordError}
              />
              <Button
                backGroundColor="black"
                backGroundColorDark="white"
                label="Next"
                borderColor="black"
                labelColor="white"
                onClick={handleLogin}
                labelColorDark="black"
                disabled={!password}
              />
            </div>
          </div>
        </BoxCard>
      )}
    </div>
  );
}
VerifyPassword.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default VerifyPassword;
