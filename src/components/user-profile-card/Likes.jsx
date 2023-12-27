import React, { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import PullToRefresh from 'react-simple-pull-to-refresh';
import NoResults from './NoResults';
import TweetList from '../../tweetPage/TweetList';
import DotLoader from './DotLoader';

/**
 * Renders a component that displays the liked tweets of a user.
 *
 * @component
 * @example
 * ```jsx
 * return (
 *   <Likes />
 * )
 * ```
 */

function Likes() {
  const [page, setPage] = useState(2);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [initialDone, setInitialDone] = useState(false);
  const { username } = useParams('username');
  const getInitialTweets = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsDone(false);

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
      setTotal(data.total);
      setPage(2);
      setPosts(() => [...data.data]);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [username]);
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
  useEffect(() => {
    if (error !== '') toast(error);
  }, [error]);
  return (
    <div
      className="flex sm:block"
      data-testid={`${username}-Likes`}
    >
      <div>
        {initialDone && posts.length === 0 ? (
          <NoResults title=" There are No Likes yet" />
        ) : (
          <div
            data-testid="likes-list"
            className="flex min-h-[calc(100%+60px)] w-full flex-col items-center gap-5 sm:h-auto"
          >
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
                data={posts}
                setTweets={setPosts}
              />
              {posts.length >= total && (
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
        )}
      </div>
    </div>
  );
}

export default Likes;
