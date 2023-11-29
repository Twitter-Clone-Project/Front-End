/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import Tweet from './Tweet';

function TimeLine({ tweets, setTweets, pageNum }) {
  useEffect(() => {
    console.log(pageNum);
    const fetchTweets = async () => {
      try {
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
        console.log(data.data);
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
