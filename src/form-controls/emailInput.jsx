import React from 'react';
import ReactDOM from 'react-dom/client';

function EmailInput({ error, setError }) {
  return (
    <div className="relative h-14 w-full items-center justify-center">
      <input
        placeholder=""
        id="arrow"
        type="email"
        onChange={(event) => {
          if (event.target.checkValidity()) setError(true);
          else setError(false);
        }}
        className="peer h-full w-full rounded border border-light-gray bg-white pl-2 pt-6 invalid:border-warning focus:border-2 focus:border-blue focus:outline-none focus:invalid:border-warning dark:bg-black dark:text-white"
      />
      <label
        htmlFor="arrow"
        className="absolute left-0 ml-2 mt-4 cursor-text text-base text-dark-gray transition-all duration-200 peer-invalid:text-warning peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue  peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:focus:invalid]:text-warning"
      >
        Email
      </label>
      <label className="invisible  absolute left-0 ml-2 mt-14 text-sm text-warning peer-invalid:visible">
        Please enter a valid email.
      </label>
    </div>
  );
}

export default EmailInput;
