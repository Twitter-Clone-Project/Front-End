import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
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

  useEffect(() => {
    const getInitialTweets = async () => {
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
        setTotal(data.total);
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

  return (
    <div className="my-[60px] mb-20  min-h-[calc(100%-60px)] w-full border-border-gray dark:text-white sm:my-auto sm:min-h-full sm:border-x-[1px] md:w-auto ">
      <div className=" flex min-h-full w-full flex-col  ">
        <AddPost setTweets={setTweets} />
        <InfiniteScroll
          dataLength={total}
          next={fetchTweets}
          hasMore={tweets.length < total}
          loader={
            <div className="flex items-center justify-center p-3">
              <DotLoader />
            </div>
          }
          endMessage={
            <p className="flex items-center justify-center p-3 text-center">
              {tweets.length > 0 ? (
                <b>Yay! You have seen it all</b>
              ) : (
                <b className="mt-12 flex items-center text-lg font-semibold">
                  There are no current tweets to show! 🥹
                  <br /> Follow People to see their tweets.{' '}
                </b>
              )}
            </p>
          }
        >
          <TweetList
            data={tweets}
            setTweets={setTweets}
          />
        </InfiniteScroll>
      </div>
      <OwnToaster />
    </div>
  );
}

export default Homepage;
