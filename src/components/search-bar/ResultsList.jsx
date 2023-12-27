//  ---------------------------------------------------
//                ResultsList Documentation
//  ---------------------------------------------------
//  ResultsList is responsible for showing the users results who matched
//  the current search query entered by the user, if no users match
//  the user will still have the option to search for the same query value
//  and get the tweet results, also can head to the profile page of the user
//  having a username exactly as the current search query.

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult';

function ResultsList({ value, results, setFocus }) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleGoClick = () => {
    navigate(`/app/${value}`);
  };
  const handleSearchClick = () => {
    // console.log(value);
    setFocus();
    navigate(`/app/search/tweets?q=${encodeURIComponent(value)}`, {
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

//  ---------------------------------------------------
//                ResultsList PropTypes
//  ---------------------------------------------------
//  value: the state value containing the serach query entered by the user
//  results: the state array containing all the results for a current query
//  setFoucs: an optional parameter which represents a certain fucntion that
//  that can be called after the user searches for a certain query in the
//  search page typically used for bluring the focus from the search bar
//  after submitting the query

ResultsList.propTypes = {
  value: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  setFocus: PropTypes.func,
};

ResultsList.defaultProps = {
  setFocus: () => {},
};

export default ResultsList;
