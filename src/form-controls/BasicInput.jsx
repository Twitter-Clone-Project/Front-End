import React from 'react';

// eslint-disable-next-line react/prop-types
function BasicInput({ title, value, setValue }) {
  return (
    <div className="relative h-[56.44px] w-full items-center justify-center  bg-white dark:bg-black">
      <input
        placeholder=""
        id="Normal"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        type="text"
        className="
        peer h-full w-full rounded px-2 pt-4 text-lg
        outline outline-1 
        outline-light-gray 
        focus:outline-2 focus:outline-blue
        dark:bg-black
        dark:text-white"
      />
      <label
        htmlFor="Normal"
        className="
        absolute left-2 top-4 cursor-text text-base
        text-dark-gray transition-all duration-200 
        peer-focus:top-[6px]
        peer-focus:text-xs peer-focus:text-blue
        peer-[:not(:placeholder-shown)]:top-[6px]
        peer-[:not(:placeholder-shown)]:text-xs"
      >
        {title}
      </label>
    </div>
  );
}

export default BasicInput;
