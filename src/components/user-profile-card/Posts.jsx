import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import PullToRefresh from 'react-simple-pull-to-refresh';
import NoResults from './NoResults';
import TweetList from '../../tweetPage/TweetList';
import DotLoader from './DotLoader';
import OwnToaster from '../OwnToaster';
import { useAuth } from '../../hooks/AuthContext';

function Posts() {
  const [page, setPage] = useState(2);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [initialDone, setInitialDone] = useState(false);
  const { username } = useParams('username');
  const { user: curUser, dispatch } = useAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}profile/${username}`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const data = await res.json();
        if (data.status === false) throw new Error(data.message);
        setUser(data.data.user);
        if (username === curUser.username)
          dispatch({ type: 'LOGIN', payload: data.data.user });
      } catch (err) {
        toast(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [dispatch, username]);
  const getInitialTweets = useCallback(async () => {
    try {
      setIsDone(false);
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}users/${username}/tweets/1`,
        {
          method: 'GET',
          origin: true,
          credentials: 'include',
          withCredentials: true,
        },
      );
      const data = await response.json();
      if (data.data.length === 0) setIsDone(true);
      setPage(2);
      setTotal(data.total);
      setInitialDone(true);
      setError('');
      setPosts(() => [...data.data]);
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
        `${import.meta.env.VITE_API_DOMAIN}users/${username}/tweets/${page}`,
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
      setError('');
      setPage((pn) => pn + 1);
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
      data-testid={`${username}-Posts`}
    >
      {!user.isBlockingMe ? (
        <div>
          {initialDone && posts.length === 0 ? (
            <NoResults title=" There are No posts yet" />
          ) : (
            <div
              data-testid="posts-list"
              className="flex min-h-[calc(100%+60px)] w-full flex-col items-center gap-5 sm:h-auto"
            >
              {' '}
              <PullToRefresh
                className="p-0"
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
                  <p className="flex items-center justify-center p-3">
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
          <OwnToaster />
        </div>
      ) : (
        <NoResults title="You’re blocked" />
      )}
    </div>
  );
}

export default Posts;
