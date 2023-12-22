import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';
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
    const getInitialTweets = async () => {
      try {
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
        setTotal(data.total);
        setInitialDone(true);
        setError('');
        setPosts(() => [...data.data]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getInitialTweets();
  }, [username]);

  useEffect(() => {
    if (error !== '') toast(error);
  }, [error]);

  return (
    <div data-testid={`${username}-Posts`}>
      {!user.isBlockingMe ? (
        <div>
          {initialDone && posts.length === 0 ? (
            <NoResults title=" There are No posts yet" />
          ) : (
            <div
              data-testid="posts-list"
              className="flex w-full flex-col items-center gap-5"
            >
              <InfiniteScroll
                dataLength={total}
                next={fetchTweets}
                hasMore={posts.length !== total}
                loader={
                  <div className="flex items-center justify-center p-3">
                    <DotLoader />
                  </div>
                }
                endMessage={
                  <p className="flex items-center justify-center p-3">
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <TweetList
                  data={posts}
                  setTweets={setPosts}
                />
              </InfiniteScroll>
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
