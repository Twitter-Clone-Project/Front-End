/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import validator from 'validator';

/**
 * Renders an input field for email, validating and displaying errors for invalid emails.
 * @param {Object} props - Component props.
 * @param {string} props.error - The error message to display for invalid emails.
 * @param {Function} props.setError - Function to set the error message.
 * @param {string} props.email - The value of the email input field.
 * @param {Function} props.setEmail - Function to set the email input value.
 * @param {boolean} props.disabled - Flag indicating if the input is disabled.
 * @returns {JSX.Element} JSX representing the email input field.\
 * @example
 * ```jsx
 *  <EmailInput error={error} setError={setError} email={email}  setEmail={setEmail} disabled={disabled} />
 * ```
 */

// eslint-disable-next-line no-unused-vars
function EmailInput({ error, setError, email, setEmail, disabled }) {
  const errorMessage = 'Please enter a valid email.';
  const handleInputChange = (event) => {
    setEmail(event.target.value);
    if (validator.isEmail(event.target.value) || !event.target.value) {
      setError('');
    } else setError(errorMessage);
  };

  return (
    <div className="relative h-[56.44px] w-full items-center justify-center  bg-white dark:bg-black">
      <input
        placeholder=""
        disabled={disabled}
        id="email-inp"
        type="email"
        data-testid="Email"
        value={email}
        onChange={handleInputChange}
        className={`
        peer h-full w-full rounded
        px-2 pt-4 text-lg outline outline-1 focus:outline-2 disabled:border-none
        disabled:bg-hover-layout disabled:bg-x-light-gray
        disabled:text-dark-gray 
        disabled:outline-none 
        dark:bg-black
        dark:text-white
        dark:disabled:bg-border-gray
        dark:disabled:text-dark-gray
        ${
          error !== ''
            ? 'outline-warning'
            : 'outline-light-gray focus:outline-blue'
        }`}
      />
      <label
        htmlFor="email-inp"
        className={` 
        absolute
        left-2 top-4 cursor-text text-base text-dark-gray
        transition-all duration-200 peer-focus:top-[6px] 
        peer-focus:text-xs
        peer-focus:text-blue peer-[:not(:placeholder-shown)]:top-[6px]
        peer-[:not(:placeholder-shown)]:text-xs  disabled:bg-x-light-gray
        disabled:text-dark-gray
        dark:peer-disabled:text-dark-gray 
        ${error !== '' ? 'text-warning peer-focus:text-warning' : ''}`}
      >
        Email
      </label>
      {error !== '' && (
        <span
          data-testid="email-error"
          className=" absolute left-2 top-14 text-sm text-warning"
        >
          {error}
        </span>
      )}
    </div>
  );
}

export default EmailInput;
