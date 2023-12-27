import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PasswordInput from '../form-controls/passwordInput';
import SettingsHeader from './SettingsHeader';
import usePost from './usePost';
import Spinner from '../Spinner';
import SaveBtn from './SaveBtn';

function ChangePassword() {
  const [curPassword, setCurPassword] = useState('');
  const [curPasswordError, setCurPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [newPasswordConfirmError, setNewPasswordConfirmError] = useState('');
  const { data, error, isLoading, fetchData } = usePost();
  const totalError =
    curPasswordError ||
    newPasswordError ||
    newPasswordConfirmError ||
    !curPassword ||
    !newPassword ||
    !newPasswordConfirm;
  useEffect(() => {
    if (
      newPasswordConfirm &&
      newPassword &&
      newPassword !== newPasswordConfirm
    ) {
      setNewPasswordConfirmError('Passwords do not match');
    } else {
      setNewPasswordConfirmError('');
    }
    if (newPasswordConfirm.length < 7 && newPasswordConfirm !== '') {
      setNewPasswordConfirmError(
        'Your password needs to be at least 8 characters.',
      );
    }
    if (newPassword.length < 7 && newPassword !== '') {
      setNewPasswordError('Your password needs to be at least 8 characters.');
    }
  }, [newPasswordConfirm, newPassword]);

  useEffect(() => {
    if (error) toast(error);
    else if (data) {
      toast('Your password has been updated successfully!');
      setCurPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    }
  }, [error, data]);

  const handleChange = () => {
    fetchData(`${import.meta.env.VITE_API_DOMAIN}auth/updatePassword`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      origin: true,
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify({
        currentPassword: curPassword,
        newPassword,
        newPasswordConfirm,
      }),
    });
  };
  return (
    <div
      data-testid="change-password-page"
      className="w-full"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SettingsHeader title="Change your Password" />
          <div className="mx-auto flex w-full flex-col gap-1">
            <div className="flex w-full flex-col gap-1 border-b-2 border-b-x-light-gray pb-3 dark:border-b-border-gray">
              <div className="border-b border-b-x-light-gray p-4 dark:border-b-border-gray">
                <PasswordInput
                  title="Current Password"
                  password={curPassword}
                  setPassword={setCurPassword}
                  error={curPasswordError}
                  setError={setCurPasswordError}
                />
                <Link to="/forgot-password">
                  <span className="text-xs ">Forgot password?</span>
                </Link>
              </div>
              <div className="flex flex-col gap-6 border-b border-b-x-light-gray p-4 pb-6 dark:border-b-border-gray">
                <PasswordInput
                  title="New Password"
                  password={newPassword}
                  setPassword={setNewPassword}
                  error={newPasswordError}
                  setError={setNewPasswordError}
                />
                <PasswordInput
                  title="Confirm New Password"
                  password={newPasswordConfirm}
                  setPassword={setNewPasswordConfirm}
                  error={newPasswordConfirmError}
                  setError={setNewPasswordConfirmError}
                />
              </div>
            </div>
            <SaveBtn
              handleChange={handleChange}
              totalError={totalError}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ChangePassword;
