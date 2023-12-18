import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import toast from 'react-hot-toast';
import SearchResult from '../../components/search-bar/SearchResult';
import Spinner from '../../components/Spinner';
import NoSearchResults from './NoSearchResults';

function UserResults() {
  const location = useLocation();
  const [value, setValue] = useState(
    location.search.slice(3, location.search.length - 7),
  );
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValue(location.search.slice(3, location.search.length - 7));
    setResults([]);
  }, [value, location]);

  useEffect(() => {
    const getUserResults = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}users/search?query=${value}`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const data = await response.json();
        if (data.status) {
          if (data.message) console.log(data.message);
          else setResults(() => [...data.data]);
        }
        setError('');
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getUserResults();
  }, [value]);

  useEffect(() => {
    if (error !== '') toast(error);
  }, [error]);

  return (
    <div data-testid={`${value}-user-results`}>
      {isLoading ? (
        <Spinner />
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {results.length === 0 ? (
            <NoSearchResults
              value={value}
              testId={`${value}-nouser-results`}
            />
          ) : (
            <div
              data-testid={`${value}-user-results-list`}
              className="flex w-full flex-col items-center gap-5"
            >
              {results.map((result) => (
                <SearchResult data={result} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// SearchPage.propTypes = {
//   value: PropTypes.string.isRequired,
//   setValue: PropTypes.string.isRequired,
//   // eslint-disable-next-line react/forbid-prop-types
//   //   tweetData: PropTypes.array.isRequired,
// };

export default UserResults;
