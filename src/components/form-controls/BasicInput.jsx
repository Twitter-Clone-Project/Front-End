import React from 'react';

// eslint-disable-next-line react/prop-types
function BasicInput({ title, value, setValue, error, setError }) {
  return (
    <div className="relative h-[56.44px] w-full items-center justify-center  bg-white dark:bg-black">
      <input
        data-testid={title}
        placeholder=""
        id={title}
        value={value}
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
