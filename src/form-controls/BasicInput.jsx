import React from 'react';

// eslint-disable-next-line react/prop-types
function BasicInput({ title, value, setValue }) {
  return (
    <div className="relative h-14 w-full items-center justify-center">
      <input
        placeholder=""
        id="Normal"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        type="text"
        className="peer h-full w-full rounded border border-light-gray bg-white pl-2 pr-8 pt-6 text-lg invalid:border-warning focus:border-2 focus:border-blue focus:outline-none focus:invalid:border-warning dark:bg-black dark:text-white"
      />
      <label
        htmlFor="Normal"
        className="absolute left-0 ml-2 mt-3 cursor-text text-base text-dark-gray transition-all duration-200 peer-invalid:text-warning peer-focus:-top-1 peer-focus:text-xs peer-focus:text-blue  peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:focus:invalid]:text-warning"
      >
        {title}
      </label>
    </div>
  );
}

export default BasicInput;
