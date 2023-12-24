/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult';

function ResultsList({ value, results }) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleGoClick = () => {
    navigate(`/app/${value}`);
  };
  const handleSearchClick = () => {
    navigate(`/app/search/tweets?q=${value}`, {
      state: { pastPath: location },
    });
  };
  return (
    <div className="">
      <div
        // eslint-disable-next-line max-len
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        className="text-b flex h-[60px] items-center pl-4 text-base  hover:cursor-pointer hover:bg-hover-layout dark:text-white"
        data-testid={`search-bar-serach${value}`}
        onClick={() => {
          handleSearchClick();
        }}
      >
        <span>Search for "{value}"</span>
      </div>
      <div className="mx-[2px] h-[0.5px] bg-dark-gray" />
      {results.length !== 0 ? (
        <div data-testid={`search-bar-${value}results`}>
          {results.map(
            (result, index) =>
              result && (
                <SearchResult
                  data={result}
                  key={index}
                />
              ),
          )}
        </div>
      ) : (
        ''
      )}
      <div
        // eslint-disable-next-line max-len
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        className="flex h-[50px] items-center pl-4 text-sm hover:cursor-pointer hover:bg-hover-layout dark:text-white"
        onClick={() => {
          handleGoClick();
        }}
        data-testid={`search-bar-goto${value}`}
      >
        <span>Go to @{value}</span>
      </div>
    </div>
  );
}

ResultsList.propTypes = {
  value: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
};

export default ResultsList;
