/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import ResultsList from './ResultsList';

function SearchBar({ value, setValue }) {
  const [fill, setFill] = useState('#AAB8C2');
  const [focus, setFoucs] = useState(false);
  const [results, setResults] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(false);
  const handleInputFocus = () => {
    setFill('#1988d2');
    setFoucs(true);
  };
  const handleInputBlur = () => {
    setFill('#AAB8C2');
    setFoucs(false);
  };
  const handleClick = () => {
    setValue('');
    setResults([]);
  };
  const handleInputChange = () => {
    if (value.length === 1 || value.length === 0) setResults([]);
  };
  useEffect(() => {
    if (!value) return;
    setResultsLoading(true);
    const controller = new AbortController();

    const timeId = setTimeout(() => {
      console.log('fetching');
      const queryCheck = async () => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_DOMAIN}users/search?query=${value}`,
            {
              method: 'GET',
              origin: true,
              credentials: 'include',
              withCredentials: true,
            },
          );
          const data = await res.json();
          if (data.status === false) throw new Error(data.message);
          else {
            if (data.data.length > 10) {
              data.data = data.data.slice(0, 10);
            }
            setResults(data.data);
            console.log(data.data);
          }
        } catch (err) {
          if (err.name !== 'AbortError') toast(err.message);
        } finally {
          setResultsLoading(false);
        }
      };
      queryCheck();
    }, 500);
    return () => {
      clearTimeout(timeId);
      controller.abort();
    };
  }, [value]);
  return (
    <div
      className="flex h-auto  flex-col  py-2"
      onFocus={handleInputFocus}
      data-testid="search-bar"
    >
      <OutsideClickHandler
        onOutsideClick={() => {
          handleInputBlur();
        }}
      >
        <div
          // eslint-disable-next-line max-len
          className={`flex h-[42px] w-full items-center bg-[#f7f8f8] dark:bg-[#16181c] ${
            focus === true
              ? 'border-2 border-blue border-opacity-100 dark:bg-pure-black'
              : ''
          }  justify-between rounded-full bg-[#f7f8f8] py-2 pl-2 pr-2`}
          data-testid="search-bar-field"
        >
          <div className="w-1/12">
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
          <div className="w-10/12 pl-2 ">
            <input
              // eslint-disable-next-line max-len
              className={`w-full border-none bg-[#f7f8f8]  placeholder-light-gray focus:outline-none dark:bg-[#16181c] ${
                focus === true ? 'dark:bg-pure-black' : ''
              } dark:text-white`}
              placeholder="Search"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                handleInputChange();
              }}
              type="text"
              data-testid="search-bar-textfield"
            />
          </div>
          {focus === true && value !== '' ? (
            <div className="w-1/12">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
                data-testid="search-bar-textfield-erase"
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
            className={`ring-blue-500 flex min-h-[85px] w-full flex-col justify-center overflow-x-hidden overscroll-y-auto rounded-md bg-white ring-2 dark:bg-pure-black `}
            data-testid="search-bar-focusfield"
          >
            {value === '' ? (
              <span className="text-center text-sm text-light-thin">
                Try searching for people, lists, or keywords
              </span>
            ) : (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <>
                {value !== '' && resultsLoading ? (
                  <div
                    className="spinner flex h-full w-full flex-1 items-center justify-center"
                    data-testid="search-bar-results-loader"
                  >
                    <div className="loader h-5 w-5" />
                  </div>
                ) : (
                  <div data-testid="search-bar-resultslist">
                    <ResultsList
                      value={value}
                      results={results}
                    />
                  </div>
                )}
              </>
            )}
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
