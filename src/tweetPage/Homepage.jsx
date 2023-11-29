import React, { useState, useEffect, useCallback } from 'react';
import AddPost from './AddPost';
import TimeLine from './TimeLine';

function Homepage() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({});
  const [pageNum, setPageNum] = useState(2);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTweets = useCallback(async () => {
    if (isLoading || isDone) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://${import.meta.env.VITE_API_DOMAIN}users/${pageNum}/timeline`,
        {
          method: 'GET',
          origin: true,
          credentials: 'include',
          withCredentials: true,
        },
      );
      const data = await response.json();
      console.log(data);
      if (data.data.length === 0) setIsDone(true);
      setTweets((prevTweets) => [...prevTweets, ...data.data]);
      setPageNum((pn) => pn + 1);
    } catch (error) {
      console.log('Error fetching timeline:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, pageNum, isDone]);

  useEffect(() => {
    const getInitialTweets = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://${import.meta.env.VITE_API_DOMAIN}users/1/timeline`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const data = await response.json();
        console.log(data);
        if (data.data.length === 0) setIsDone(true);
        setTweets(() => [...data.data]);
      } catch (error) {
        console.log('Error fetching timeline:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getInitialTweets();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchTweets();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchTweets]);

  return (
    <div className="mx-auto grid min-h-full grid-cols-[auto_1fr] dark:text-white ">
      <div className=" flex h-full flex-col border-border-gray sm:border-x-[1px]">
        <AddPost
          tweet={tweet}
          setTweet={setTweet}
        />
        <TimeLine
          tweets={tweets}
          setTweets={setTweets}
          pageNum={pageNum}
        />
      </div>
      <div />
    </div>
  );
}

export default Homepage;
