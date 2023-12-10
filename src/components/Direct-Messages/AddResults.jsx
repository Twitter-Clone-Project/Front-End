/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import AddResultCard from './AddResultCard';

function AddResults({ value, setPerson, deletePerson }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/search`, {
        method: 'GET',
        // origin: true,
        // credentials: 'include',
        // withCredentials: true,
      });
      const Json = await response.json();
      setResults(Json);
    };
    fetchData();
  }, [value]);
  if (results)
    return (
      <div
        className="
    flex flex-grow flex-col overflow-y-auto px-4 scrollbar-thin scrollbar-track-[#f9f9f9]
    scrollbar-thumb-[#c0c0c0]
    scrollbar-thumb-rounded-full hover:scrollbar-thumb-[#7b7b7b] dark:scrollbar-track-[#272727] dark:scrollbar-thumb-[#4a4a4a] dark:hover:scrollbar-thumb-[#888888]"
      >
        <div>
          {results.map((result) => (
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