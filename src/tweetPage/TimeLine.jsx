/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import Tweet from './Tweet';

function TimeLine({ userID, tweets, setTweets }) {
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch(
          // eslint-disable-next-line max-len
          `https://2f29bfea-6dd0-4327-b865-9a8db1f872e9.mock.pstmn.io/users/${userID}/timeline`,
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
