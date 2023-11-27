import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

function SearchBar({ value, setValue }) {
  const [fill, setFill] = useState('#AAB8C2');
  const [focus, setFoucs] = useState(false);
  const [results, setResults] = useState('');
  const [bgDark, setBgDark] = useState('black');
  const handleInputFocus = () => {
    setFill('#1988d2');
    setFoucs(true);
    setBgDark('pure-black');
  };
  const handleInputBlur = () => {
    setFill('#AAB8C2');
    setFoucs(false);
    setBgDark('black');
  };
  const handleClick = () => {
    setValue('');
    setResults('');
  };
  useEffect(() => {
    if (!value) return;
    const controller = new AbortController();
    const timeId = setTimeout(() => {
      const queryCheck = async () => {
        try {
          const res = await fetch(`http://localhost:3000/searchQuery`, {
            signal: controller.signal,
          });
          const data = await res.json();
          setResults(data);
        } catch (err) {
          if (err.name !== 'AbortError') toast(err.message);
        }
      };
      queryCheck();
    }, 1000);
    return () => {
      clearTimeout(timeId);
      controller.abort();
    };
  }, [value]);
  // useEffect(() => {
  //   if (results.length === 0) return;
  // }, [results]);
  return (
    <div
      className="flex h-auto flex-col px-2 py-3"
      onFocus={handleInputFocus}
    >
      <OutsideClickHandler
        onOutsideClick={() => {
          handleInputBlur();
        }}
      >
        <div
          // eslint-disable-next-line max-len
          className={`flex h-[55px] w-72 items-center ${
            focus === true ? 'border-2 border-blue border-opacity-100' : ''
          } dark:bg-${bgDark} rounded-full bg-white px-4 py-2`}
        >
          <div className="w-1/6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 3.5C5.96243 3.5 3.5 5.96243 3.5 9C3.5 12.0376 5.96243 14.5 9 14.5C10.519 14.5 11.893 13.8852 12.8891 12.8891C13.8852 11.893 14.5 10.519 14.5 9C14.5 5.96243 12.0376 3.5 9 3.5ZM2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 10.6625 15.4197 12.1906 14.4517 13.3911L17.7803 16.7197C18.0732 17.0126 18.0732 17.4874 17.7803 17.7803C17.4874 18.0732 17.0126 18.0732 16.7197 17.7803L13.3911 14.4517C12.1906 15.4197 10.6625 16 9 16C5.13401 16 2 12.866 2 9Z"
                fill={fill}
              />
            </svg>
          </div>
          <div className="">
            <input
              // eslint-disable-next-line max-len
              className={`dark:bg-${bgDark} border-none bg-white text-white placeholder-light-gray focus:outline-none`}
              placeholder="Search"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
              type="text"
            />
          </div>
          {focus === true && value !== '' ? (
            <div className="w-1/6">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8.28033 7.21967C7.98744 6.92678 7.51256 6.92678 7.21967 7.21967C6.92678 7.51256 6.92678 7.98744 7.21967 8.28033L8.93934 10L7.21967 11.7197C6.92678 12.0126 6.92678 12.4874 7.21967 12.7803C7.51256 13.0732 7.98744 13.0732 8.28033 12.7803L10 11.0607L11.7197 12.7803C12.0126 13.0732 12.4874 13.0732 12.7803 12.7803C13.0732 12.4874 13.0732 12.0126 12.7803 11.7197L11.0607 10L12.7803 8.28033C13.0732 7.98744 13.0732 7.51256 12.7803 7.21967C12.4874 6.92678 12.0126 6.92678 11.7197 7.21967L10 8.93934L8.28033 7.21967Z"
                  fill="#1988d2"
                />
              </svg>
            </div>
          ) : (
            ''
          )}
        </div>
        {focus === true ? (
          <div
            // eslint-disable-next-line max-len
            className={`flex h-[80px] w-72 justify-center rounded-md bg-white dark:bg-${bgDark} ring-blue-500 ring-2`}
          >
            <span className="pt-2 text-center text-sm text-light-thin">
              Try searching for people, lists, or
              <br /> keywords
            </span>
          </div>
        ) : (
          ''
        )}
      </OutsideClickHandler>
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default SearchBar;
