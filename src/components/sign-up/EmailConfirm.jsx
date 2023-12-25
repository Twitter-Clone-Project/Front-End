import React, { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import BoxCard from '../BoxCard';
import Button from '../form-controls/Button';
import BasicInput from '../form-controls/BasicInput';
import Spinner from '../Spinner';
import OwnToaster from '../OwnToaster';
import NewPassword from '../login-page/NewPassword';
import { useAuth } from '../../hooks/AuthContext';

function EmailConfirm({
  email,
  type = 'reset',
  onClose,
  onSuccess,
  verifyUrl,
  newEmail,
  resendUrl,
}) {
  const [code, setCode] = useState('');
  const [err, setError] = useState('');
  const [resetUser, setResetUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const { dispatch } = useAuth();
  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      const obj = {};
      if (newEmail) obj.newEmail = newEmail;
      else obj.email = email;
      const res = await fetch(
        resendUrl ||
          `${import.meta.env.VITE_API_DOMAIN}auth/resendConfirmEmail`,
        {
          method: type === 'update' ? 'PATCH' : 'POST',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        },
      );
      const data = await res.json();
      if (data.status === false) throw new Error(data.message);
      toast('Email sent successfully', {
        id: 'toast',
      });
    } catch (error) {
      toast(error.message, {
        id: 'toast',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendCode = async () => {
    try {
      setIsLoading(true);
      const obj = { email, otp: code };
      if (newEmail) obj.newEmail = newEmail;
      const res = await fetch(
        verifyUrl || `${import.meta.env.VITE_API_DOMAIN}auth/verifyEmail`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          origin: true,
          credentials: 'include',
          withCredentials: true,
          body: JSON.stringify(obj),
        },
      );

      const data = await res.json();
      if (data.status === false) throw new Error(data.message);
      if (type === 'reset') {
        setResetUser({ user: data.data.user, token: data.data.token });
        setResetPasswordOpen(true);
      } else {
        if (onSuccess) onSuccess();
        dispatch({
          type: 'LOGIN',
          payload: data.data.user,
          token: data.data.token,
        });
      }
    } catch (error) {
      toast(error.message, {
        id: 'toast',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (resetPasswordOpen)
    return (
      <NewPassword
        email={email}
        user={type === 'reset' ? resetUser : null}
      />
    );

  return (
    <div className="confirm mx-auto flex h-full min-h-full w-full flex-1 flex-col items-center justify-center text-lg text-black dark:text-white md:bg-dark-gray md:bg-opacity-50">
      {isLoading ? (
        <Spinner />
      ) : (
        <BoxCard onClose={onClose}>
          <div className="mx-auto mt-5 flex h-full w-full min-w-[300px] max-w-[70%] flex-1 flex-col">
            <p className="text-start text-3xl font-semibold">
              We sent you a code
            </p>
            <span className="mb-5 py-2 text-start text-sm text-dark-gray">
              Enter it below to confirm{' '}
              <em className="font-semibold">
                {type === 'update' ? newEmail : email}
              </em>
            </span>
            <div className=" flex flex-col">
              <BasicInput
                title="Code"
                value={code}
                setValue={setCode}
                error={err}
                setError={setError}
              />
              <button
                type="submit"
                data-testid="resend-code"
                onClick={handleResendCode}
                className="mt-1 px-2 text-start text-xs"
              >
                <span className="text-blue hover:underline">
                  Didn&#39;t receive email?
                </span>
              </button>
            </div>
            <div className="mx-auto mt-auto flex h-full w-full items-end">
              <Button
                backGroundColor="black"
                backGroundColorDark="white"
                labelColor="white"
                labelColorDark="black"
                disabled={err !== '' || !code}
                borderColor="none"
                onClick={handleSendCode}
                label="Next"
              />
            </div>
          </div>
        </BoxCard>
      )}
    </div>
  );
}

EmailConfirm.defaultProps = {
  type: 'reset',
  onClose: null,
  onSuccess: null,
  verifyUrl: null,
  newEmail: null,
  resendUrl: null,
};

EmailConfirm.propTypes = {
  email: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  verifyUrl: PropTypes.string,
  newEmail: PropTypes.string,
  resendUrl: PropTypes.string,
};
export default EmailConfirm;
