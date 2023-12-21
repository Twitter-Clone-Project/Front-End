import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import toast from 'react-hot-toast';
import Tweet from '../../tweetPage/Tweet';
import Spinner from '../../components/Spinner';
import NoSearchResults from './NoSearchResults';

function TweetResults() {
  const location = useLocation();
  const [value, setValue] = useState(
    location.search.slice(3, location.search.length),
  );
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValue(location.search.slice(3, location.search.length));
    setResults([]);
  }, [value, location]);

  useEffect(() => {
    const getTweetResults = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}tweets/search?query=${value}`,
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
        // console.log(data);
        setError('');
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getTweetResults();
  }, [value]);

  useEffect(() => {
    if (error !== '') toast(error);
  }, [error]);

  return (
    <div data-testid={`${value}-tweet-results`}>
      {isLoading ? (
        <Spinner />
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
              className="flex w-full flex-col items-center"
            >
              {results.map((result) => (
                <Tweet data={result} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TweetResults;
