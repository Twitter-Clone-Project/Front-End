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
  const [engagementsDisabled, setEngagementsDiabled] = useState(true);
  const [visibility, setVisibility] = useState('invisible');
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [tweetId] = useState(location.state.tweetID);
  const [pastPath] = useState(location.state.pastPath);
  const [tweetData] = useState(location.state.tweetData);

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
    setVisibility(false);
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
  const handleClick = () => {
    navigate(`/app/tweet/likers`, {
      state: { pastPath: location.pathname, tweetId: { tweetId } },
    });
  };
  return (
    <div
      className="flex h-auto justify-center"
      data-testid="tweet-page"
    >
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
          <div className="flex w-full justify-start py-2">
            <button
              type="button"
              onClick={() => {
                handleClick();
              }}
              className="flex w-full items-center justify-start border-b-[1px] border-b-light-thin py-1 text-sm text-blue hover:bg-opacity-50 hover:underline disabled:cursor-not-allowed   disabled:opacity-50 disabled:hover:bg-opacity-100  dark:border-b-border-gray"
              disabled={engagementsDisabled}
            >
              View Engagements
            </button>
          </div>
          <AddReply
            setReplies={setReplies}
            tweetId={tweetId}
          />
          <RepliesList repliesData={replies} />
        </div>
      ) : (
        <div className="flex w-20 items-center justify-center">
          <PostEngagements
            setVisibility={setVisibility}
            tweetId={tweetId}
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
