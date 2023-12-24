import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import toast from 'react-hot-toast';
import SearchResult from '../../components/search-bar/SearchResult';
import Spinner from '../../components/Spinner';
import NoSearchResults from './NoSearchResults';
import DotLoader from '../../components/user-profile-card/DotLoader';

function UserResults() {
  const location = useLocation();
  const [value, setValue] = useState(
    location.search.slice(3, location.search.length - 7),
  );
  const [page, setPage] = useState(2);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialDone, setInitialDone] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setValue(location.search.slice(3, location.search.length));
    setResults([]);
  }, [value, location]);

  // useEffect(() => {
  //   const getUserResults = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(
  //         `${import.meta.env.VITE_API_DOMAIN}users/search/1?query=${value}`,
  //         {
  //           method: 'GET',
  //           origin: true,
  //           credentials: 'include',
  //           withCredentials: true,
  //         },
  //       );
  //       const data = await response.json();
  //       console.log(data);
  //       if (data.status) {
  //         if (data.message) console.log(data.message);
  //         else setResults(() => [...data.data]);
  //       }
  //       setError('');
  //     } catch (err) {
  //       console.log(err);
  //       setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getUserResults();
  // }, [value]);

  const fetchResults = useCallback(async () => {
    if (isLoading || isDone) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}users/search/${page}?query=${value}`,
        {
          method: 'GET',
          origin: true,
          credentials: 'include',
          withCredentials: true,
        },
      );
      const data = await response.json();
      if (!data.status) throw new Error(data.message);
      if (data.data.length === 0) setIsDone(true);
      else setResults((prevResults) => [...prevResults, ...data.data]);
      setError('');
      setPage((pn) => pn + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, page, isDone, value]);

  useEffect(() => {
    const getInitialResults = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}users/search/1?query=${value}`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const data = await response.json();
        if (data.data.length === 0) setIsDone(true);
        else setResults(() => [...data.data]);
        setInitialDone(true);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getInitialResults();
  }, [value]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchResults();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchResults]);

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
          {initialDone && results.length === 0 ? (
            <NoSearchResults
              value={value}
              testId={`${value}-nouser-results`}
            />
          ) : (
            <div
              data-testid={`${value}-user-results-list`}
              className="flex w-full flex-col items-center gap-5"
            >
              {results.map(
                (result) => result && <SearchResult data={result} />,
              )}
              {isLoading && <DotLoader />}
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
