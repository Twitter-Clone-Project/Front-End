/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import NameInput from '../form-controls/nameInput';
import { useAuth } from '../../hooks/AuthContext';
import SettingsHeader from './SettingsHeader';
import SaveBtn from './SaveBtn';
import usePost from './usePost';
import Spinner from '../Spinner';

/**
 * UpdateUsername component allows the user to update their username.
 * It fetches the necessary data and handles the logic for updating the username.
 *
 * @component
 * @example
 * ```jsx
 * return (
 *   <UpdateUsername />
 * )
 * ```
 */
function UpdateUsername() {
  const { user, dispatch } = useAuth();
  const { data, error, isLoading, fetchData } = usePost();

  const [username, setUsername] = useState(user.username);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [inputError, setInputError] = useState('');
  const totalError =
    inputError || !username || username === user.username || usernameLoading;
  const handleChange = () => {
    fetchData(`${import.meta.env.VITE_API_DOMAIN}profile/updateUsername`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      origin: true,
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify({
        newUsername: username,
      }),
    });
  };
  useEffect(() => {
    if (!username || inputError || username === user.username) return;
    if (username.length < 3)
      setInputError('Username must contain atleast 3 character');

    setUsernameLoading(true);
    const controller = new AbortController();

    const timeId = setTimeout(() => {
      const usernameCheck = async () => {
        try {
          const res = await fetch(
            `${
              import.meta.env.VITE_API_DOMAIN
            }users/${username}/isUsernameFound`,
            {
              signal: controller.signal,
            },
          );
          const resData = await res.json();
          if (resData.status === false) throw new Error(resData.message);
          if (resData.data.isFound) setInputError('Username is already taken');
          else
            setInputError((e) => {
              if (e === 'Username is already taken') return '';
              return e;
            });
        } catch (err) {
          if (err.name !== 'AbortError') toast(err.message);
        } finally {
          setUsernameLoading(false);
        }
      };
      usernameCheck();
    }, 0);
    return () => {
      clearTimeout(timeId);
      controller.abort();
    };
  }, [username, inputError, user]);

  useEffect(() => {
    if (error) toast(error);
    else if (data) {
      toast('Your Username has been updated successfully!');
      dispatch({
        type: 'LOGIN',
        payload: { ...user, username: data.newUsername },
      });
      setInputError('');
    }
  }, [error, data]);
  return (
    <div
      data-testid="update-username-page"
      className="w-full"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex w-full flex-col">
          <SettingsHeader
            backBtn
            title="Change Username"
          />
          <div className="b-2 flex w-full border-b border-b-light-gray p-4 dark:border-b-border-gray">
            <NameInput
              title="Username"
              maxLength={50}
              Name={username}
              setName={setUsername}
              error={inputError}
              setError={setInputError}
            />
          </div>
          <SaveBtn
            handleChange={handleChange}
            totalError={totalError}
          />
        </div>
      )}
    </div>
  );
}

export default UpdateUsername;
