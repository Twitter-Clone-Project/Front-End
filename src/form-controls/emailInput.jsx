/* eslint-disable react/prop-types */
import React, { useState } from 'react';

// eslint-disable-next-line no-unused-vars
function EmailInput({ error, setError, email, setEmail }) {
  const errorMessage = 'Please enter a valid email.';
  const [value, setValue] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    clearTimeout(timeoutId);
    const newTimeouId = setTimeout(() => {
      if (event.target.checkValidity()) setError('');
      else setError(errorMessage);
      setEmail(event.target.value);
    }, 500);
    setTimeoutId(newTimeouId);
  };

  return (
    <div className="relative h-[56.44px] w-full items-center justify-center  bg-white dark:bg-black">
      <input
        placeholder=""
        id="arrow"
        type="email"
        value={value}
        onChange={handleInputChange}
        className={`
        peer h-full w-full rounded px-2 pt-4 text-lg
        outline outline-1 
        focus:outline-2 
        dark:bg-black
        dark:text-white
        ${
          error !== ''
            ? 'outline-warning'
            : 'outline-light-gray focus:outline-blue'
        }`}
      />
      <label
        htmlFor="arrow"
        className={` 
        absolute left-2 top-4 cursor-text text-base
        text-dark-gray transition-all duration-200 
        peer-focus:top-[6px]
        peer-focus:text-xs peer-focus:text-blue
        peer-[:not(:placeholder-shown)]:top-[6px]
        peer-[:not(:placeholder-shown)]:text-xs 
        ${error !== '' ? 'text-warning peer-focus:text-warning' : ''}`}
      >
        Email
      </label>
      {error !== '' && (
        <span className=" absolute left-2 top-14 text-sm text-warning">
          {error}
        </span>
      )}
    </div>
  );
}

export default EmailInput;
