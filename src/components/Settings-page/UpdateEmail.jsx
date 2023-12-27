/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import SettingsHeader from './SettingsHeader';

import { useAuth } from '../../hooks/AuthContext';
import EmailInput from '../form-controls/emailInput';

/**
 * UpdateEmail component is responsible for rendering the page where users can update their email address.
 * It displays the current email address and provides a link to navigate to the change email form.
 */
function UpdateEmail() {
  const { user } = useAuth();
  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState('');

  return (
    <div
      data-testid="update-email-page"
      className="flex w-full flex-col"
    >
      <Outlet />
      <SettingsHeader
        backBtn
        title="Change Email"
      />
      <div className="b-2 flex w-full border-b border-b-x-light-gray p-4 dark:border-b-border-gray">
        <EmailInput
          title="Email"
          disabled
          maxLength={50}
          email={email}
          setEmail={setEmail}
          error={emailError}
          setError={setEmailError}
        />
      </div>
      <div className="my-1 flex w-full cursor-pointer items-center justify-center p-4 text-center transition-colors duration-200 hover:bg-[#739cb816] dark:hover:bg-[#1d9bf01a]">
        <Link
          data-testid="update-email-btn"
          to="change-email"
          className="text-sm font-thin hover:no-underline"
        >
          Update email address
        </Link>
      </div>
    </div>
  );
}

export default UpdateEmail;
