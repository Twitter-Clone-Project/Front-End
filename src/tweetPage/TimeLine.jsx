/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import Tweet from './Tweet';

function TimeLine({ userID, tweets, setTweets }) {
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch(
          // eslint-disable-next-line max-len
          `https://8ab91f88-5083-4ec2-9135-592594f44252.mock.pstmn.io/users/${userID}/timeline`,
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
