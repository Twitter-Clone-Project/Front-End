import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import Tweet from '../tweetPage/Tweet';
import AddEmoji from '../tweetPage/AddEmoji';

function TweetPage() {
  const [tweetData, setTweetData] = useState([]);
  const [repliesData, setRepliesData] = useState([]);
  const [reply, setReply] = useState('');
  const [replyDisabled, setReplyDisabled] = useState(true);
  // const [replyFocus, setReplyFocus] = useState(true);
  // const [tweetLoading, setTweetLoading] = useState(false);
  // const [repliesLoading, setRepliesLoading] = useState(false);
  useEffect(() => {
    if (repliesData.length !== 0) return;
    // setRepliesLoading(true);
    const controller = new AbortController();
    const getData = async () => {
      try {
        const res = await fetch('http://localhost:3000/repliesInfo', {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.status === false) throw new Error(data.message);
        else {
          setRepliesData([data]);
        }
      } catch (err) {
        if (err.name !== 'AbortError') toast(err.message);
      } finally {
        // setRepliesLoading(false);
      }
    };
    getData();
    return () => {
      controller.abort();
    };
  }, []);
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
  }, []);
  const handelBackButton = () => {
    // console.log('HI');
  };
  useEffect(() => {
    if (reply === '') setReplyDisabled(true);
    else {
      setReplyDisabled(false);
    }
  }, [reply]);
  return (
    <div className="flex h-auto justify-center xl:justify-start">
      <div className="flex flex-col items-start">
        <div className="flex flex-wrap items-center sm:w-full">
          <div
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            className="mb-2 mt-[9px] flex h-9 w-9 items-center justify-center rounded-full hover:bg-light-thin"
            onClick={handelBackButton}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className=" h-5 w-5 text-x-light-gray"
            >
              <g>
                <path
                  d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </div>
          <span className=" pl-4 text-xl font-semibold text-white">Post</span>
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
        <div className="flex flex-wrap items-center justify-between px-2 sm:w-full">
          <img
            className=" h-[35px] w-[10%] rounded-full object-cover"
            src="../../public/X.svg"
            alt="profileImage"
          />
          <div className="flex w-[70%] flex-wrap items-center pl-1">
            <input
              className="h-[60px] w-[90%] text-white
                focus:outline-0 dark:bg-pure-black"
              placeholder="Post your reply"
              value={reply}
              onChange={(event) => {
                setReply(event.target.value);
              }}
            />
            <div className="flex w-[10%] justify-center">
              <AddEmoji
                text={reply}
                setText={setReply}
              />
            </div>
          </div>
          <button
            type="submit"
            className="h-[30px] w-[20%] rounded-full bg-blue text-white disabled:opacity-50"
            disabled={replyDisabled}
          >
            Reply
          </button>
        </div>
        {repliesData.length === 0 ? (
          <Spinner />
        ) : (
          <div className="w-screen sm:w-full">
            {repliesData[0].data.map((replyItem) => (
              <Tweet data={replyItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default TweetPage;
