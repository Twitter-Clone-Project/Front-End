//  ---------------------------------------------------
//                NoSearchResults Documentation
//  ---------------------------------------------------
//  NoSearchResults is responsible for showing the users that his query
//  matched no results either for the tweet results or the user results.
//  Typically used in the search page.

/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';

function NoSearchResults({ value, testId }) {
  return (
    <div
      className="flex h-full items-center justify-end"
      data-testid={testId}
    >
      <div className="flex w-[80%] justify-start pt-4">
        <div className="mt-20 flex flex-col justify-start overflow-hidden truncate">
          <span className="pb-2 text-4xl font-bold dark:text-white">
            No results for <br /> "{value.toUpperCase()}"
          </span>
          <span className="text-center text-base text-light-thin">
            Try searching for something else.
          </span>
        </div>
      </div>
    </div>
  );
}

//  ---------------------------------------------------
//                ResultsList PropTypes
//  ---------------------------------------------------
//  value: the state value containing the serach query entered by the user
//  testId: a dynamic testId based on the current users's query

NoSearchResults.propTypes = {
  value: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};
export default NoSearchResults;
