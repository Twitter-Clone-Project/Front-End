/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import Tweet from './Tweet';
import { useAuth } from '../hooks/AuthContext';

function TimeLine({ tweets, setTweets, pageNum }) {
  const { user } = useAuth();

  console.log(user.userId);
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch(
          // eslint-disable-next-line max-len
          `http://${import.meta.env.VITE_API_DOMAIN}users/${
            user.userId
          }/timeline`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
            body: JSON.stringify({ pageNum }),
          },
        );
        const data = await response.json();
        setTweets(data.data);
      } catch (error) {
        console.log('Error fetching timeline:', error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div>
      {tweets
        ? tweets.map((tweetItem) => <Tweet data={tweetItem} />)
        : 'Loading...'}
    </div>
  );
}

export default TimeLine;
