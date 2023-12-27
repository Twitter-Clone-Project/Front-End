/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AddResultCard from './AddResultCard';

/**
 * Renders a list of results based on the provided value.
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.value - string contains the username to be searched
 * @param {Function} props.setPerson - Function to set the person.
 * @param {Object} props.deletePerson - person to be deleted
 * @returns {JSX.Element} JSX element representing the list of results.
 *  @example
 *  ```jsx
 *  <AddResults value={value} setPerson={setPerson} deletePerson={deletePerson} />
 * ``
 */

function AddResults({ value, setPerson, deletePerson }) {
  const [results, setResults] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}users/search/1?query=${value}`,
        {
          method: 'GET',
          origin: true,
          credentials: 'include',
          withCredentials: true,
        },
      );
      const Json = await response.json();
      const { data } = Json;
      setResults(data);
    };
    if (value && value !== '') fetchData();
    else setResults([]);
  }, [value]);

  if (results)
    return (
      <div
        data-testid="addresults"
        className="
    flex flex-grow flex-col overflow-y-auto px-4 scrollbar-thin scrollbar-track-[#f9f9f9]
    scrollbar-thumb-[#c0c0c0]
    scrollbar-thumb-rounded-full hover:scrollbar-thumb-[#7b7b7b] dark:scrollbar-track-[#272727] dark:scrollbar-thumb-[#4a4a4a] dark:hover:scrollbar-thumb-[#888888]"
      >
        <div data-testid="addresults-map">
          {results
            .filter((result) => result !== null && result !== undefined)
            .map((result) => (
              <AddResultCard
                key={result.id}
                setPerson={setPerson}
                result={result}
                deletePerson={deletePerson}
              />
            ))}
        </div>
      </div>
    );
}

export default AddResults;
AddResults.propTypes = {
  /**
   *  string contains the username to be searched
   */
  value: PropTypes.string.isRequired,
  /**
   *  Function to set the person.
   */
  setPerson: PropTypes.func.isRequired,
  /**
   *  person to be deleted
   */
  deletePerson: PropTypes.object,
};
