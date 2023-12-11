/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import Tweet from '../tweetPage/Tweet';
import AddReply from './AddReply';
import RepliesList from './RepliesList';

function TweetPage() {
  const location = useLocation();
  const pastPath = location.state?.pastPath;
  const [replies, setReplies] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { tweetId } = useParams();
  const [tweetData, setTweetData] = useState();
  const [fetchLikes, setFetchLikes] = useState(false);
  const [fetchRetweets, setFetchRetweets] = useState(false);

  const navigate = useNavigate();
  const handelBackButton = () => {
    navigate(pastPath.pathname || -1);
  };

  const fetchReplies = useCallback(async () => {
    if (isLoading || isDone) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}tweets/${tweetId}/replies`,
        {
          method: 'GET',
          origin: true,
          credentials: 'include',
          withCredentials: true,
        },
      );
      const data = await response.json();
      if (data.data.length === 0) {
        setIsDone(true);
      }
      setReplies(() => [...data.data]);
    } catch (error) {
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isDone, tweetId]);

  useEffect(() => {
    const getInitialReplies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}tweets/${tweetId}/replies`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const data = await response.json();
        if (data.data.length === 0) {
          setIsDone(true);
        }
        setReplies(() => [...data.data]);
      } catch (error) {
        toast(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getInitialReplies();
  }, []);

  useEffect(() => {
    const getInitialTweet = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}tweets/${tweetId}`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const data = await response.json();
        if (data.status) {
          setTweetData([data.data]);
          // console.log(data.data);
        }
      } catch (error) {
        toast(error.message);
      }
    };
    getInitialTweet();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchReplies();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchReplies]);

  useEffect(() => {
    // console.log('Like changed');
    const getInitialTweet = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}tweets/${tweetId}`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const data = await response.json();
        if (data.status) {
          setTweetData([data.data]);
        }
      } catch (error) {
        toast(error.message);
      }
    };
    getInitialTweet();
    setFetchLikes(false);
  }, [fetchLikes]);

  useEffect(() => {
    const getInitialTweet = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}tweets/${tweetId}`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const data = await response.json();
        if (data.status) {
          setTweetData([data.data]);
        }
      } catch (error) {
        toast(error.message);
      }
    };
    getInitialTweet();
    setFetchRetweets(false);
  }, [fetchRetweets]);

  useEffect(() => {
    const getInitialTweet = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}tweets/${tweetId}`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const data = await response.json();
        if (data.status) {
          setTweetData([data.data]);
        }
      } catch (error) {
        toast(error.message);
      }
    };
    getInitialTweet();
  }, [replies]);

  return (
    <div
      className="flex h-auto justify-center border-x-[0.5px] border-x-light-gray dark:border-x-border-gray"
      data-testid="tweet-page"
    >
      <div className="mx-2 flex flex-col items-start">
        <div className="flex flex-wrap items-center sm:w-full">
          <div className="mb-2 mt-[9px] flex h-7 w-7 items-center justify-center rounded-full hover:bg-x-light-gray hover:dark:bg-light-thin">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className=" h-5 w-5 cursor-pointer dark:text-x-light-gray"
              onClick={handelBackButton}
            >
              <g>
                <path
                  d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </div>
          <span className=" pl-4 text-xl font-semibold dark:text-white">
            Post
          </span>
        </div>
        {!tweetData ? (
          <Spinner />
        ) : (
          <>
            <div className="w-screen sm:w-full">
              {tweetData.map((tweetItem, index) => (
                <Tweet
                  data={tweetItem}
                  // eslint-disable-next-line react/no-array-index-key
                  setFetchLikes={() => {
                    setFetchLikes(true);
                    // console.log('Handling Likes');
                  }}
                  setFetchRetweets={() => {
                    setFetchRetweets(true);
                    // console.log('Handling Retweets');
                  }}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                />
              ))}
            </div>

            <div className="flex w-full items-center justify-start gap-3 border-b-[0.5px] border-b-light-gray px-2 py-2 dark:border-b-border-gray">
              <Link
                to={`/app/tweets/${tweetId}/likes`}
                relative="path"
                className="hover:no-underline dark:text-white"
              >
                <div className="flex flex-row items-center gap-1">
                  {tweetData[0].likesCount}
                  <span className="text-sm text-light-thin">likes</span>
                </div>
              </Link>
              <Link
                to={`/app/tweets/${tweetId}/retweets`}
                relative="path"
                className="hover:no-underline dark:text-white"
              >
                <div className="flex flex-row items-center gap-1">
                  {tweetData[0].retweetsCount}
                  <span className="text-sm text-light-thin">retweets</span>
                </div>
              </Link>
            </div>
            <div className="w-[88%] md:w-full">
              <AddReply
                setReplies={setReplies}
                tweetId={tweetId}
                replyFor={tweetData[0].user.userName}
              />
            </div>

            <RepliesList repliesData={replies} />
          </>
        )}
      </div>
    </div>
  );
}

// TweetPage.propTypes = {
//   pastPath: PropTypes.string.isRequired,
//   tweetId: PropTypes.string.isRequired,
//   // eslint-disable-next-line react/forbid-prop-types
//   tweetData: PropTypes.array.isRequired,
// };
export default TweetPage;
