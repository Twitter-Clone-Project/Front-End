/* eslint-disable react/prop-types */
import React, { useState } from 'react';

// eslint-disable-next-line no-unused-vars

function NameInput({ error, setError }) {
  const [Name, setName] = useState('');
  const [max, setMax] = useState(0);
  const errorMessage = 'What’s your name?';

  const handleInputChange = (event) => {
    setName(event.target.value);
    if (max < event.target.value.length) setMax(event.target.value.length);
    if (event.target.value.length === 0 && max !== 0) setError(errorMessage);
    else setError('');
  };
  return (
    <div className="relative h-14 w-full items-center justify-center">
      <input
        placeholder=""
        id="arrow"
        type="text"
        maxLength="50"
        value={Name}
        onChange={handleInputChange}
        className={`${
          (Name.length === 0 && max !== 0) || error !== ''
            ? ' border-warning focus:border-warning'
            : 'border-light-gray focus:border-blue '
        } peer  h-full w-full rounded border  bg-white
          pl-2  pt-6 focus:border-2  focus:outline-none
        dark:bg-black dark:text-white`}
      />
      <label
        htmlFor="arrow"
        className={`${
          (Name.length === 0 && max !== 0) || error !== ''
            ? 'text-warning peer-focus:text-warning'
            : ' text-dark-gray peer-focus:text-blue'
        } absolute left-0 ml-2 mt-4 
          cursor-text text-base transition-all duration-200 peer-focus:-top-2
          peer-focus:text-xs peer-focus:text-blue
          peer-[:not(:placeholder-shown)]:-top-2 
          peer-[:not(:placeholder-shown)]:text-xs`}
      >
        Name
      </label>
      <span className="invisible absolute right-0 mr-2 mt-2 text-xs text-dark-gray peer-focus:visible">
        {Name.length} / 50
      </span>
      <span
        className={` ${
          (Name.length === 0 && max !== 0) || error !== ''
            ? 'visible'
            : 'invisible'
        }     text-warning"  absolute left-0 ml-2 mt-14 text-sm text-warning`}
      >
        {error === '' ? errorMessage : error}
      </span>
    </div>
  );
}

export default NameInput;
