import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

function ConversationSearchBar({ setValue, active, setActive }) {
  const [isInputFocused, setInputFocused] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
    clearTimeout(timeoutId);
    const newTimeouId = setTimeout(() => {
      setValue(event.target.value);
    }, 400);
    setTimeoutId(newTimeouId);
  };

  return (
    <div
      data-testid="conversation-search-bar"
      className="flex h-[68px] w-full items-center p-3 dark:bg-black"
    >
      {active && (
        <button
          className=""
          type="button"
          onClick={() => {
            setActive(false);
            setInput('');
            setValue('');
          }}
        >
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full hover:bg-[#e7e7e7] dark:hover:bg-[#181919]">
            <svg
              className="h-5 w-5 fill-black dark:fill-white"
              viewBox="0 0 24 24"
            >
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
            </svg>
          </div>
        </button>
      )}

      <div
        data-testid="conversation-search-bar-color-change"
        className={` ${
          isInputFocused
            ? 'border-2 border-blue'
            : 'border border-[#cad5da] dark:border-[#2d2f32]'
        }
        flex h-full w-full flex-row items-center rounded-3xl`}
      >
        <div className=" pl-3">
          <svg
            viewBox="0 0 24 24"
            className="h-[16px] w-[16px] fill-[#536571]"
          >
            <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" />
          </svg>
        </div>
        <input
          data-testid="conversation-search-bar-input-field"
          value={input}
          onFocus={() => {
            setInputFocused(true);
          }}
          onBlur={() => {
            setInputFocused(false);
          }}
          onClick={() => {
            setActive(true);
          }}
          onChange={handleInputChange}
          placeholder="Search Direct Messages"
          className=" mr-5 h-full w-full py-[2px] pl-1 pr-4 text-xs placeholder-[#536571] caret-blue outline-none placeholder:text-xs dark:bg-black"
        />
      </div>
    </div>
  );
}

ConversationSearchBar.propTypes = {
  setValue: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default ConversationSearchBar;
