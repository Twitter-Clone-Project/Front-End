import { useEffect, useState } from 'react';

function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    setisLoading(true);
    setError('');
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setData(json.data);
        console.log(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setisLoading(false);
      }
    };
    fetchData();
  }, [url, options]);
  return { data, error, isLoading };
}

export default useFetch;
