/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import toast from 'react-hot-toast';
import Tweet from '../../tweetPage/Tweet';
import Spinner from '../../components/Spinner';
import NoSearchResults from './NoSearchResults';
import DotLoader from '../../components/user-profile-card/DotLoader';

/**
 * TweetResults displays tweet results matching the user's search query.
 * It fetches tweet results based on the query extracted from the URL.
 * @returns {JSX.Element} The JSX for displaying tweet search results.
 * @example
 * // Usage inside the SearchPage component or as a nested route:
 * <Route path="/app/search/tweets">
 *   <TweetResults />
 * </Route>
 */
function TweetResults() {
  const location = useLocation();
  const [value, setValue] = useState(
    decodeURIComponent(location.search.slice(3, location.search.length)),
  );
  const [page, setPage] = useState(2);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialDone, setInitialDone] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setValue(
      decodeURIComponent(location.search.slice(3, location.search.length)),
    );
    setResults([]);
  }, [value, location]);
  const fetchResults = useCallback(async () => {
    if (isLoading || isDone) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_DOMAIN
        }tweets/search/${page}?query=${value}`,
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
    if (!value) return;
    const getInitialResults = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}tweets/search/1?query=${value}`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const data = await response.json();
        // console.log(data);
        if (data.status) {
          if (data.data.length === 0) setIsDone(true);
          else setResults(() => [...data.data]);
          setInitialDone(true);
          setError('');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getInitialResults();
  }, [value, initialDone]);

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

  useEffect(() => {
    setInitialDone(false);
  }, [location]);
  return (
    <div data-testid={`${value}-tweet-results`}>
      {!initialDone && isLoading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {results.length === 0 ? (
            <NoSearchResults
              value={value}
              testId={`${value}-notweet-results`}
            />
          ) : (
            <div
              data-testid={`${value}-tweet-results-list`}
              className="flex min-h-[calc(100%+60px)] w-full flex-col items-center sm:h-auto"
            >
              {results.map((result, index) => (
                <Tweet
                  data={result}
                  key={index}
                />
              ))}
              {isLoading && <DotLoader />}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TweetResults;
