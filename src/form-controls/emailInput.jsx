/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line no-unused-vars
function EmailInput({ error, setError, email, setEmail }) {
  const errorMessage = 'Please enter a valid email.';
  return (
    <div className="relative h-14 w-full items-center justify-center">
      <input
        placeholder=""
        id="arrow"
        type="email"
        value={email}
        onChange={(event) => {
          if (event.target.checkValidity()) setError('');
          else setError(errorMessage);
          setEmail(event.target.value);
        }}
        className={`${
          error !== '' ? 'border-warning focus:border-warning' : ''
        } peer h-full w-full rounded border border-light-gray
         bg-white pl-2 pt-6 text-lg invalid:border-warning
         focus:border-2 focus:border-blue focus:outline-none
         focus:invalid:border-warning dark:bg-black dark:text-white`}
      />
      <label
        htmlFor="arrow"
        className={` 
        ${error !== '' ? 'text-warning peer-focus:text-warning' : ''}
         absolute left-0 ml-2 mt-4 cursor-text text-base text-dark-gray 
        transition-all duration-200 
        peer-invalid:text-warning peer-focus:-top-2 peer-focus:text-xs
        peer-focus:text-blue  peer-[:not(:placeholder-shown)]:-top-2 
          peer-[:not(:placeholder-shown)]:text-xs 
        peer-[:focus:invalid]:text-warning`}
      >
        Email
      </label>
      <span
        className={` 
      absolute left-0 ml-2 mt-14 text-sm  text-warning   ${
        error === '' ? 'invisible peer-invalid:visible' : 'visible'
      }`}
      >
        {error === '' ? errorMessage : error}
      </span>
    </div>
  );
}

export default EmailInput;
