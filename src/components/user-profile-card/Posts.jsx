import React, { useState, useEffect, useCallback } from 'react';
import NoResults from './NoResults';
import { useAuth } from '../../hooks/AuthContext';

import TweetList from '../../tweetPage/TweetList';
import DotLoader from './DotLoader';

function Posts() {
  const [page, setPage] = useState(2);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [initialDone, setInitialDone] = useState(false);

  const { user } = useAuth();
  console.log(user);
  const fetchTweets = useCallback(async () => {
    if (isLoading || isDone) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://${import.meta.env.VITE_API_DOMAIN}users/${
          user.userId
        }/tweets/${page}`,
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
      setPosts((prevTweets) => [...prevTweets, ...data.data]);
      setPage((pn) => pn + 1);
    } catch (error) {
      console.log('Error fetching timeline:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, page, isDone, user]);

  useEffect(() => {
    const getInitialTweets = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://${import.meta.env.VITE_API_DOMAIN}users/${
            user.userId
          }/tweets/1`,
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
        setInitialDone(true);
        setPosts(() => [...data.data]);
      } catch (error) {
        console.log('Error fetching timeline:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getInitialTweets();
  }, [user]);

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

  return initialDone && posts.length === 0 ? (
    <NoResults title="Posts" />
  ) : (
    <div className="flex w-full flex-col items-center gap-5">
      <TweetList data={posts} />
      {isLoading && <DotLoader />}
    </div>
  );
}

export default Posts;
