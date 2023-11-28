import React, { useState, useEffect } from 'react';
import AddPost from './AddPost';
import TimeLine from './TimeLine';

function Homepage() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({});
  useEffect(() => {
    if (Object.keys(tweet).length !== 0) {
      setTweets((prevTweets) => [tweet, ...prevTweets]);
    }
  }, [tweet]);
  return (
    <div>
      <AddPost
        tweet={tweet}
        setTweet={setTweet}
      />
      <TimeLine
        userID={1}
        tweets={tweets}
        setTweets={setTweets}
      />
    </div>
  );
}

export default Homepage;
