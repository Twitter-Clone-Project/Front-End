import React, { useState, useEffect } from 'react';
import AddPost from './AddPost';
import TimeLine from './TimeLine';

function Homepage() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({});
  const [userID, setUserID] = useState('');

  useEffect(() => {
    setUserID('1');
    if (Object.keys(tweet).length !== 0) {
      setTweets((prevTweets) => [tweet, ...prevTweets]);
    }
    window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const fetchTweets = async () => {
          try {
            const response = await fetch(
              // eslint-disable-next-line max-len
              `https://8ab91f88-5083-4ec2-9135-592594f44252.mock.pstmn.io/users/${userID}/timeline`,
            );
            const data = await response.json();
            setTweets((prevTweets) => [...prevTweets, ...data.data]);
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
    <div className="mx-auto my-[60px] grid min-h-full grid-cols-[auto_1fr] dark:text-white sm:my-auto ">
      <div className=" border-border-gray sm:border-x-[1px]">
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
      <div />
    </div>
  );
}

export default Homepage;
