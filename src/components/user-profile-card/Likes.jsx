import React, { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoResults from './NoResults';
import TweetList from '../../tweetPage/TweetList';
import DotLoader from './DotLoader';
import OwnToaster from '../OwnToaster';

function Likes() {
  const [page, setPage] = useState(2);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(10);
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
        setTotal(data.total);
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
                {posts.length > 0 ? (
                  <b>Yay! You have seen it all</b>
                ) : (
                  <b>
                    You haven&#39;t liken anything yet
                    <br /> Go ahead and like posts 🤩
                  </b>
                )}
              </p>
            }
          >
            <TweetList data={posts} />
          </InfiniteScroll>
        </div>
      )}
      <OwnToaster />
    </>
  );
}

export default Likes;
