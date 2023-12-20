import { useState, useCallback } from 'react';

const usePost = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (url, options) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
      setData(responseData.data);
      if (!responseData.status) throw new Error(responseData.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, isLoading, fetchData };
};

export default usePost;
