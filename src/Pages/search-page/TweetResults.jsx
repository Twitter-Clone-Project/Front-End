import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function TweetResults() {
  const [value] = useState('nour');
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        if (data.status) setResults(() => [...data.data]);
        console.log(data.data);
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
    <div data-testid={`${value}-results`}>
      <div>
        {isLoading && results.length === 0 ? (
          ''
        ) : (
          <div
            data-testid="results-list"
            className="flex w-full flex-col items-center gap-5"
          >
            {/* {results.map((result) => (
              <Reply data={result} />
            ))} */}
          </div>
        )}
      </div>
    </div>
  );
}

export default TweetResults;
