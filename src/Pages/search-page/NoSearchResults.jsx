/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * NoSearchResults component displays a message when the user's search query matches no results.
 * It is typically used in the search page.
 * @param {Object} props - The component props.
 * @param {string} props.value - The state value containing the search query entered by the user.
 * @param {string} props.testId - A dynamic testId based on the current user's query.
 * @returns {JSX.Element} A message indicating no search results.
 * @example
 * // Usage:
 * <NoSearchResults value="example" testId="exampleTestId" />
 */
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

NoSearchResults.propTypes = {
  /**
   * The state value containing the search query entered by the user.
   */
  value: PropTypes.string.isRequired,
  /**
   * A dynamic testId based on the current user's query.
   */
  testId: PropTypes.string.isRequired,
};
export default NoSearchResults;
