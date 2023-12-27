/* eslint-disable no-unsafe-optional-chaining */

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import Tweet from '../tweetPage/Tweet';
import AddReply from './AddReply';
import RepliesList from './RepliesList';

//  ---------------------------------------------------
//                TweetPage Documentation
//  ---------------------------------------------------
//  TweetPage is major component merging several other components
//  the tweet page is the elongated version of a tweet in the profile page
//  or the home page, in which the user can access the tweet with all its
//  features. Also, the user can reach the list of likes and retweets
//  and all the replies for this tweet. The user can add a reply to be appened
//  to the current replies lst.
function TweetPage() {
  const location = useLocation();
  const pastPath = location.state?.pastPath;
  const [replies, setReplies] = useState([]);
  // const [isDone, setIsDone] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const { tweetId } = useParams();
  const [tweetData, setTweetData] = useState();
  const [fetchLikes, setFetchLikes] = useState(false);
  const [fetchRetweets, setFetchRetweets] = useState(false);

  const navigate = useNavigate();
  const handelBackButton = () => {
    const pastLocation = pastPath
      ? pastPath.pathname + (pastPath.search || '')
      : -1;
    navigate(pastLocation);
  };

  useEffect(() => {
    const getInitialReplies = async () => {
      try {
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
        if (data.status) {
          if (typeof data.data[Symbol.iterator] === 'function')
            setReplies(() => [...data.data]);
        }
      } catch (error) {
        toast(error.message);
      }
    };
    getInitialReplies();
  }, [tweetId]);

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
  }, [tweetId]);

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
  }, [fetchLikes, tweetId]);

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
  }, [fetchRetweets, tweetId]);

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
  }, [replies, tweetId]);

  return (
    <div
      className="mb-20  min-h-[calc(100%-60px)]  w-full max-w-[620px] border-x-light-gray dark:border-border-gray dark:text-white sm:my-auto sm:min-h-full sm:border-x-[1px]"
      data-testid="tweet-page"
    >
      <div className="flex w-full flex-col items-start justify-start">
        <div className="flex flex-wrap items-center">
          <div className="mx-2 mb-2 mt-[9px] flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#e7e7e7] dark:hover:bg-[#181919]">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className=" h-5 w-5 cursor-pointer dark:text-x-light-gray"
              data-testid="tweet-page-backbtn"
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
          <span
            className=" pl-4 text-xl font-semibold dark:text-white"
            data-testid="tweet-post-header"
          >
            Post
          </span>
        </div>
        {!tweetData ? (
          <div data-testid="spinner-component">
            <Spinner />
          </div>
        ) : (
          <>
            <div
              className="w-full"
              data-testid="tweet-component"
            >
              {tweetData.map((tweetItem, index) => (
                <div
                  className="w-full"
                  data-testid={`tweet-${tweetItem.id}`}
                >
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
                </div>
              ))}
            </div>

            <div className="flex w-full  items-center justify-start gap-3 border-y-[0.5px] border-y-light-gray px-2 py-2 dark:border-y-border-gray">
              <Link
                to={`/app/tweets/${tweetId}/likes`}
                relative="path"
                className="hover:no-underline"
                data-testid="likes-list-count"
              >
                <div className="flex flex-row items-center gap-1">
                  <span className="text-sm text-dark-gray hover:underline">
                    {tweetData[0].likesCount} likes
                  </span>
                </div>
              </Link>
              <Link
                to={`/app/tweets/${tweetId}/retweets`}
                relative="path"
                className="hover:no-underline"
                data-testid="retweets-list-count"
              >
                <div className="flex flex-row items-center gap-1">
                  <span className="text-sm text-dark-gray hover:underline">
                    {tweetData[0].retweetsCount} retweets
                  </span>
                </div>
              </Link>
            </div>
            <div className="w-full">
              <AddReply
                setReplies={setReplies}
                tweetId={tweetId}
                replyFor={tweetData[0].user.username}
              />
            </div>
            <div className="w-full">
              <RepliesList
                repliesData={replies}
                setReplies={setReplies}
                tweetId={tweetId}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TweetPage;
