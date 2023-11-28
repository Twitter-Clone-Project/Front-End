import React, { useState, useEffect } from 'react';
import AddPost from './AddPost';
import TimeLine from './TimeLine';

function Homepage() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({});
  const [userID, setUserID] = useState('');

  useEffect(() => {
    setUserID('1');
    console.log(userID);
    if (Object.keys(tweet).length !== 0) {
      setTweets((prevTweets) => [tweet, ...prevTweets]);
    }
    window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("you're at the bottom of the page");
        const fetchTweets = async () => {
          try {
            const response = await fetch(
              // eslint-disable-next-line max-len
              `https://8ab91f88-5083-4ec2-9135-592594f44252.mock.pstmn.io/users/${userID}/timeline`,
            );
            const data = await response.json();
            setTweets((prevTweets) => [...prevTweets, ...data.data]);
            console.log(data.data);
          } catch (error) {
            console.log('Error fetching timeline:', error);
          }
        };

        fetchTweets();
        // Show loading spinner and make fetch request to api
      }
    });
  }, [tweet]);
  return (
    <div>
      <AddPost
        tweet={tweet}
        setTweet={setTweet}
      />
      <TimeLine
        userID={userID}
        tweets={tweets}
        setTweets={setTweets}
      />
    </div>
  );
}

export default Homepage;
