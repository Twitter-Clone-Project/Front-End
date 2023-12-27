/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

// eslint-disable-next-line no-unused-vars

/**
 * Renders an input field for a specific name with character limit and error handling.
 * @param {Object} props - Component props.
 * @param {string} props.title - The title/label for the input field.
 * @param {string} props.error - The error message to display.
 * @param {Function} props.setError - Function to set the error message.
 * @param {string} props.Name - The value of the name input field.
 * @param {Function} props.setName - Function to set the name input value.
 * @param {number} props.maxLength - The maximum length allowed for the name.
 * @returns {JSX.Element} JSX representing the name input field.
 * @example
 * ```jsx
 *  <NameInput title={title} setError={setError} error={error}  Name={Name} maxLength={maxLength} />
 * ```
 */

function NameInput({ title, error, setError, Name, setName, maxLength }) {
  const [max, setMax] = useState(0);

  const handleInputChange = (event) => {
    setName(event.target.value);
    if (max < event.target.value.length) setMax(event.target.value.length);
    if (event.target.value.length === 0 && max !== 0) {
      const errorMessage = `What's your  ${title.toLowerCase()}?`;
      setError(errorMessage);
    } else setError('');
  };
  return (
    <div className="relative h-[56.44px] w-full items-center justify-center  bg-white dark:bg-black">
      <input
        data-testid={title}
        id={title}
        placeholder=""
        type="text"
        maxLength={maxLength}
        value={Name}
        onChange={handleInputChange}
        className={` 
        peer h-full w-full rounded px-2 pt-4 text-lg
        outline outline-1 outline-light-gray 
        focus:outline-2 focus:outline-blue
        dark:bg-black
        dark:text-white
        ${
          error !== ''
            ? 'outline-warning focus:outline-warning'
            : 'outline-light-gray focus:outline-blue '
        }`}
      />
      <label
        htmlFor={title}
        className={` 
        absolute left-2 top-4 cursor-text text-base
        text-dark-gray transition-all duration-200 
        peer-focus:top-[6px]
        peer-focus:text-xs peer-focus:text-blue
        peer-[:not(:placeholder-shown)]:top-[6px]
        peer-[:not(:placeholder-shown)]:text-xs 
          ${
            error !== ''
              ? 'text-warning peer-focus:text-warning'
              : 'text-dark-gray peer-focus:text-blue'
          }`}
      >
        {title}
      </label>
      <span className=" invisible absolute right-2 top-2 text-xs text-dark-gray peer-focus:visible">
        {Name.length} / {maxLength}
      </span>
      {error !== '' && (
        <span
          data-testid={`${title}-err`}
          className=" absolute left-2 top-14 text-sm text-warning"
        >
          {error}
        </span>
      )}
    </div>
  );
}

export default NameInput;
