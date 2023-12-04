/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import Tweet from '../tweetPage/Tweet';
import AddReply from './AddReply';
import RepliesList from './RepliesList';
import PostEngagements from './PostEngagements';

function TweetPage() {
  const [replies, setReplies] = useState([]);
  const [emptyReplies, setEmptyReplies] = useState(false);
  const [visibility, setVisibility] = useState('invisible');
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [tweetID, setTweetID] = useState(location.state.tweetID);
  const [pastPath, setPastPath] = useState(location.state.pastPath);
  const [tweetData, setTweetData] = useState(location.state.tweetData);
  // useEffect(() => {
  //   setUserID('1');
  //   if (Object.keys(reply).length !== 0) {
  //     setReplies((prevReplies) => [reply, ...prevReplies]);
  //   }
  //   window.addEventListener('scroll', () => {
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //       const fetchReplies = async () => {
  //         try {
  //           console.log(location.state.tweetId);
  //           const response = await fetch(
  //             `http://${import.meta.env.VITE_API_DOMAIN}tweets/${
  //               location.state.tweetId
  //             }/replies`,
  //           );
  //           const data = await response.json();
  //           setReplies((prevReplies) => [...prevReplies, ...data.data]);
  //         } catch (error) {
  //           console.log('Error fetching timeline:', error);
  //         }
  //       };

  //       fetchReplies();
  //       // Show loading spinner and make fetch request to api
  //     }
  //   });
  // }, [reply]);

  const fetchReplies = useCallback(async () => {
    if (isLoading || isDone) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://${import.meta.env.VITE_API_DOMAIN}tweets/${tweetID}/replies`,
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
        setEmptyReplies(true);
      } else setEmptyReplies(false);
      setReplies((prevReplies) => [...prevReplies, ...data.data]);
    } catch (error) {
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isDone]);
  useEffect(() => {
    const getInitialReplies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://${import.meta.env.VITE_API_DOMAIN}tweets/${tweetID}/replies`,
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
          setEmptyReplies(true);
        } else setEmptyReplies(false);
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
  const navigate = useNavigate();
  const handelBackButton = () => {
    navigate(pastPath);
  };
  return (
    <div className="flex h-auto justify-center" data-testid="tweet-page">
      {visibility === false ? (
        <div className="flex flex-col items-start">
          <div className="flex flex-wrap items-center sm:w-full">
            <div className="mb-2 mt-[9px] flex h-7 w-7 items-center justify-center rounded-full hover:bg-x-light-gray hover:dark:bg-light-thin">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className=" h-5 w-5 dark:text-x-light-gray"
                style={{ cursor: 'pointer' }}
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
          {tweetData.length === 0 ? (
            <Spinner />
          ) : (
            <div className="w-screen sm:w-full">
              {tweetData.map((tweetItem) => (
                <Tweet data={tweetItem} />
              ))}
            </div>
          )}
          <div className="flex w-full justify-start p-2">
            <button
              type="button"
              onClick={() => {
                setVisibility(true);
              }}
              className="rounded-md px-2 py-1 text-sm hover:bg-opacity-50 dark:bg-blue dark:text-white"
            >
              View Engagements
            </button>
          </div>
          <AddReply
            setReplies={setReplies}
            tweetId={tweetID}
          />
          <RepliesList
            repliesData={replies}
            emptyReplies={emptyReplies}
          />
        </div>
      ) : (
        <div className="flex w-20 items-center justify-center">
          <PostEngagements
            setVisibility={setVisibility}
            tweetID={tweetID}
          />
        </div>
      )}
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
