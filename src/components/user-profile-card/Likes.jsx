import React, { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import NoResults from './NoResults';
import TweetList from '../../tweetPage/TweetList';
import DotLoader from './DotLoader';
import OwnToaster from '../OwnToaster';

function Likes() {
  const [page, setPage] = useState(2);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [initialDone, setInitialDone] = useState(false);
  const { username } = useParams('username');

  const fetchTweets = useCallback(async () => {
    if (isLoading || isDone) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_DOMAIN
        }users/${username}/likedTweets/${page}`,
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
      else setPosts((prevTweets) => [...prevTweets, ...data.data]);
      setPage((pn) => pn + 1);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, page, isDone, username]);

  useEffect(() => {
    const getInitialTweets = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}users/${username}/likedTweets/1`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const data = await response.json();
        if (data.data.length === 0) setIsDone(true);
        setInitialDone(true);
        setPosts(() => [...data.data]);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getInitialTweets();
  }, [username]);

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

  useEffect(() => {
    if (error !== '') toast(error);
  }, [error]);

  return (
    <>
      {initialDone && posts.length === 0 ? (
        <NoResults title=" There are No Likes yet" />
      ) : (
        <div
          data-testid="likes-list"
          className="flex w-full flex-col items-center gap-5"
        >
          <TweetList data={posts} />
          {isLoading && <DotLoader />}
        </div>
      )}
      <OwnToaster />
    </>
  );
}

export default Likes;
