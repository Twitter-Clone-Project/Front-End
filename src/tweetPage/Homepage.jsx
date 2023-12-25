import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import PullToRefresh from 'react-simple-pull-to-refresh';
import AddPost from './AddPost';
import TweetList from './TweetList';
import OwnToaster from '../components/OwnToaster';
import DotLoader from '../components/user-profile-card/DotLoader';

function Homepage() {
  const [tweets, setTweets] = useState([]);
  const [pageNum, setPageNum] = useState(2);
  const [total, setTotal] = useState(10);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTweets = useCallback(async () => {
    if (isLoading || isDone) return;
    try {
      setIsLoading(true);
      setIsDone(false);

      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}users/${pageNum}/timeline`,
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
  const getInitialTweets = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}users/1/timeline`,
        {
          method: 'GET',
          origin: true,
          credentials: 'include',
          withCredentials: true,
        },
      );
      const data = await response.json();
      setPageNum(2);
      setTotal(data.total);
      if (data.data.length === 0) setIsDone(true);
      setTweets(() => [...data.data]);
    } catch (error) {
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    getInitialTweets();
  }, [getInitialTweets]);
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
    <div className="my-[60px] mb-20  min-h-[calc(100%-60px)] w-full border-x-x-light-gray dark:border-x-border-gray dark:text-white sm:my-auto sm:min-h-full sm:border-x-[1px] md:w-auto ">
      <div className=" flex min-h-full w-full flex-col  ">
        <AddPost setTweets={setTweets} />
        <PullToRefresh
          pullingContent={
            <div className="flex items-center justify-center p-2">
              <DotLoader />
            </div>
          }
          refreshingContent={
            <div className="flex items-center justify-center p-4">
              <DotLoader />
            </div>
          }
          onRefresh={getInitialTweets}
        >
          <TweetList
            data={tweets}
            setTweets={setTweets}
          />
          {tweets.length >= total && (
            <p className="flex items-center justify-center border-t border-t-x-light-gray p-3 dark:border-t-border-gray">
              <b>Yay! You have seen it all</b>{' '}
            </p>
          )}
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <DotLoader />
            </div>
          )}
        </PullToRefresh>
      </div>
    </div>
  );
}

export default Homepage;
