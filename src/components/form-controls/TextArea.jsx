/* eslint-disable react/prop-types */
import React from 'react';

function TextArea({ title, value, setValue, error, setError }) {
  return (
    <div className="relative h-[100px] w-full items-center justify-center  bg-white dark:bg-black">
      <div
        role="textbox"
        suppressContentEditableWarning
        contentEditable="true"
        className="flex h-full flex-1 flex-col justify-end rounded pb-2 pr-1 outline outline-1 outline-light-gray focus-within:outline-2 focus-within:outline-blue
        dark:bg-black
        dark:text-white"
      >
        <textarea
          data-testid={title}
          placeholder=""
          id={title}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError('');
          }}
          type="text"
          className="peer h-[75%] w-full resize-none rounded px-2 text-lg outline-none dark:bg-black dark:text-white"
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
    </div>
  );
}

export default TextArea;
