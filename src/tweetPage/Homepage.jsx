import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import AddPost from './AddPost';
import TweetList from './TweetList';
import OwnToaster from '../components/OwnToaster';

function Homepage() {
  const [tweets, setTweets] = useState([]);
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
      if (data.data.length === 0) setIsDone(true);
      setTweets((prevTweets) => [...prevTweets, ...data.data]);
      setPageNum((pn) => pn + 1);
    } catch (error) {
      toast(error.message);
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
        console.log(data.data);
        if (data.data.length === 0) setIsDone(true);
        setTweets(() => [...data.data]);
      } catch (error) {
        toast(error.message);
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
    <div className="my-[60px] grid min-h-full w-full grid-cols-[1fr_auto] dark:text-white sm:my-auto md:w-auto ">
      <div className=" flex h-full w-full flex-col border-border-gray sm:border-x-[1px]">
        <AddPost setTweets={setTweets} />
        <TweetList
          data={tweets}
          setTweets={setTweets}
        />
      </div>
      <div />
      <OwnToaster />
    </div>
  );
}

export default Homepage;
