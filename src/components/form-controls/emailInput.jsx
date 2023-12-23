/* eslint-disable react/prop-types */
import React from 'react';
import validator from 'validator';

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
        disabled:bg-hover-layout disabled:text-border-gray 
        disabled:outline-none 
        dark:bg-black
        dark:text-white
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
        peer-focus:text-blue peer-disabled:text-border-gray
        peer-[:not(:placeholder-shown)]:top-[6px]
        peer-[:not(:placeholder-shown)]:text-xs 
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
