import React, { useState, useEffect } from 'react';
import AddPost from './AddPost';
import TimeLine from './TimeLine';

function Homepage() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({});
  const [userID, setUserID] = useState('');
  const [pageNum, setPageNum] = useState(1);
  useEffect(() => {
    setUserID('1');
    if (Object.keys(tweet).length !== 0) {
      setTweets((prevTweets) => [tweet, ...prevTweets]);
    }
    window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPageNum(pageNum + 1);
        const fetchTweets = async () => {
          try {
            const response = await fetch(
              // eslint-disable-next-line max-len
              `http://${
                import.meta.env.VITE_API_DOMAIN
              }users/${userID}/timeline`,
              {
                method: 'GET',
                origin: true,
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({ pageNum }),
              },
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
    <div className="mx-auto grid min-h-full grid-cols-[auto_1fr] dark:text-white ">
      <div className=" border-border-gray sm:border-x-[1px]">
        <AddPost
          tweet={tweet}
          setTweet={setTweet}
        />
        <TimeLine
          tweets={tweets}
          setTweets={setTweets}
          pageNum={pageNum}
        />
      </div>
      <div />
    </div>
  );
}

export default Homepage;
