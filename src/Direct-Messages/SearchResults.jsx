import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchCard from './SearchCard';

function SearchResults({ selectedTag, setSelectedTag, searchValue }) {
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (searchValue !== '') {
      fetch('http://localhost:3000/search')
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
        });
      // .catch((error) => console.error('Error fetching data:', error));
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  return (
    <div>
      {searchValue === '' && (
        <div className=" mt-8 flex items-center justify-center text-center text-[15px] text-[#536471] dark:text-[#71767B]">
          Try searching for people, groups, or messages
        </div>
      )}
      {searchValue !== '' && (
        <div>
          {searchResults.map((result) => (
            <SearchCard
              key={result.id}
              image={result.image}
              name={result.name}
              tag={result.tag}
              setSelectedTag={setSelectedTag}
              selectedTag={selectedTag}
            />
          ))}
        </div>
      )}
    </div>
  );
}

SearchResults.propTypes = {
  selectedTag: PropTypes.string.isRequired,
  setSelectedTag: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
};

export default SearchResults;
