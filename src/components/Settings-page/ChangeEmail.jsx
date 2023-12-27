import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import BoxCard from '../BoxCard';
import EmailInput from '../form-controls/emailInput';
import Button from '../form-controls/Button';
import { useAuth } from '../../hooks/AuthContext';
import Spinner from '../Spinner';

/**
 * ChangeEmail component allows the user to change their email address.
 *
 * @component
 * @example
 * ```jsx
 * return (
 *   <ChangeEmail
 *     onClick={handleClick}
 *     email={email}
 *     setEmail={setEmail}
 *     error={error}
 *     setError={setError}
 *   />
 * )
 * ```
 */

function ChangeEmail({ onClick, email, setEmail, error, setError }) {
  const { user } = useAuth();
  const [emailLoading, setEmailLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!email || error) return;
    setEmailLoading(true);
    const controller = new AbortController();

    const timeId = setTimeout(() => {
      const emailCheck = async () => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_DOMAIN}users/${email}/isEmailFound`,
            {
              signal: controller.signal,
            },
          );
          const data = await res.json();
          if (data.status === false) throw new Error(data.message);
          if (data.data.isFound) setError('Email is already taken');
          else
            setError((e) => {
              if (e === 'Email is already taken') return '';
              return e;
            });
        } catch (err) {
          if (err.name !== 'AbortError') toast(err.message);
        } finally {
          setEmailLoading(false);
        }
      };
      emailCheck();
    }, 0);
    return () => {
      clearTimeout(timeId);
      controller.abort();
    };
  }, [email, error, setError]);

  const handleChange = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}profile/updateEmail`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          origin: true,
          credentials: 'include',
          withCredentials: true,
          body: JSON.stringify({ newEmail: email }),
        },
      );
      const data = await res.json();
      if (data.status === false) throw new Error(data.message);
      onClick();
    } catch (err) {
      toast(err.message, {
        id: 'toast',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      data-testid="change-email-popup"
      className="popup-screen absolute bottom-0 left-0 top-0 z-20 flex h-full w-full items-center justify-center md:bg-dark-gray md:bg-opacity-50"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <BoxCard onClose={() => navigate(-1)}>
          <div className="mx-auto flex h-full w-full max-w-[70%] flex-1 flex-col">
            <div className="mt-12">
              <p className="flex items-center text-3xl font-semibold">
                Change email
              </p>
              <p className="py-3 text-sm leading-6 text-light-thin">
                Your current email is <em>{user.email}</em>. What would you like
                to update it to? Your email is not displayed in your public
                profile on X.
                <br /> <br /> If you change your email address, any existing
                Google SSO connections will be removed.
              </p>
            </div>
            <div className="mx-auto mt-6 flex h-full w-full flex-1 flex-col justify-between">
              <EmailInput
                title="Email"
                maxLength={50}
                email={email}
                setEmail={setEmail}
                error={error}
                setError={setError}
              />
              <Button
                backGroundColor="black"
                backGroundColorDark="white"
                label="Next"
                borderColor="black"
                labelColor="white"
                onClick={handleChange}
                labelColorDark="black"
                disabled={!email || emailLoading || error}
              />
            </div>
          </div>
        </BoxCard>
      )}
    </div>
  );
}
ChangeEmail.propTypes = {
  /**
   * Function to be called when the user clicks on the "Next" button.
   */
  onClick: PropTypes.func.isRequired,
  /**
   * The current email address of the user.
   */
  email: PropTypes.string.isRequired,
  /**
   * Function to set the new email address.
   */
  setEmail: PropTypes.func.isRequired,
  /**
   * Error message to be displayed if there is an error with the email address.
   */
  error: PropTypes.string.isRequired,
  /**
   * Function to set the error message.
   */
  setError: PropTypes.func.isRequired,
};

export default ChangeEmail;
