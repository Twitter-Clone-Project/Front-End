/* eslint-disable max-len */
import React from 'react';

/**
 * Renders a basic input field with error handling and character limit display.
 * @param {Object} props - Component props.
 * @param {string} props.title - The title/label for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {Function} props.setValue - Function to set the input field value.
 * @param {string} props.error - The error message to display.
 * @param {Function} props.setError - Function to set the error message.
 * @param {number} props.maxLength - The maximum allowed length for the input.
 * @returns {JSX.Element} JSX representing the basic input field.
 * @example
 * ```jsx
 *  <BasicInput title={title} value={value} setValue={setValue}  error={error} setError={setError} maxLength={maxLength} />
 * ```
 */
// eslint-disable-next-line react/prop-types
function BasicInput({ title, value, setValue, error, setError, maxLength }) {
  return (
    <div className="relative h-[56.44px] w-full items-center justify-center  bg-white dark:bg-black">
      <input
        data-testid={title}
        placeholder=""
        id={title}
        value={value}
        maxLength={maxLength}
        onChange={(event) => {
          setValue(event.target.value);
          setError('');
        }}
        type="text"
        className="peer h-full w-full rounded px-2 pt-4 text-lg
        outline outline-1 
        outline-light-gray 
        focus:outline-2 focus:outline-blue
        dark:bg-black
        dark:text-white"
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
        ${error !== '' ? 'text-warning peer-focus:text-warning' : ''}`}
      >
        {title}
      </label>
      <span className=" invisible absolute right-2 top-2 text-xs text-dark-gray peer-focus:visible">
        {value.length} / {maxLength}
      </span>
      {error !== '' && (
        <span
          data-testid="basic-err"
          className=" absolute left-2 top-14 text-sm text-warning"
        >
          {error}
        </span>
      )}
    </div>
  );
}

export default BasicInput;
