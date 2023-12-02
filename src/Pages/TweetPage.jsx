/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import Tweet from '../tweetPage/Tweet';
import AddReply from './AddReply';
import RepliesList from './RepliesList';
import PostEngagements from './PostEngagements';

function TweetPage({ pastPath, tweetId }) {
  const [tweetData, setTweetData] = useState([]);
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState({});
  const [visibility, setVisibility] = useState('invisible');
  const [userID, setUserID] = useState('');
  // const [tweetLoading, setTweetLoading] = useState(false);
  useEffect(() => {
    setUserID('1');
    if (Object.keys(reply).length !== 0) {
      setReplies((prevReplies) => [reply, ...prevReplies]);
    }
    window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const fetchReplies = async () => {
          try {
            const response = await fetch(
              `http://${
                import.meta.env.VITE_API_DOMAIN
              }tweets/${tweetId}/replies`,
            );
            const data = await response.json();
            setReplies((prevReplies) => [...prevReplies, ...data.data]);
          } catch (error) {
            console.log('Error fetching timeline:', error);
          }
        };

        fetchReplies();
        // Show loading spinner and make fetch request to api
      }
    });
  }, [reply]);
  useEffect(() => {
    if (tweetData.length !== 0) return;
    // setTweetLoading(true);
    const controller = new AbortController();
    const getData = async () => {
      try {
        const res = await fetch('http://localhost:3000/tweetInfo', {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.status === false) throw new Error(data.message);
        else {
          setTweetData([data]);
        }
      } catch (err) {
        if (err.name !== 'AbortError') toast(err.message);
      } finally {
        // setTweetLoading(false);
      }
    };
    getData();
    return () => {
      controller.abort();
    };
  });
  const navigate = useNavigate();
  const handelBackButton = () => {
    navigate(pastPath);
  };
  return (
    <div className="flex h-auto justify-center">
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
            {tweetData[0].data.map((tweetItem) => (
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
        <AddReply setReply={setReply} />
        <RepliesList
          repliesData={replies}
          setRepliesData={setReplies}
        />
      </div>
      <div className="flex w-full items-center justify-center">
        {visibility === true ? (
          <PostEngagements setVisibility={setVisibility} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

TweetPage.propTypes = {
  pastPath: PropTypes.string.isRequired,
  tweetId: PropTypes.string.isRequired,
};
export default TweetPage;
