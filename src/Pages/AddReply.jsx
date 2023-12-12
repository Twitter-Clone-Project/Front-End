/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/AuthContext';
import AddEmoji from '../tweetPage/AddEmoji';

function AddReply({ setReplies, tweetId, replyFor }) {
  const { user } = useAuth();
  const [focus, setFocus] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyDisabled, setReplyDisabled] = useState(true);
  // const [hashtags, setHashtags] = useState([]);
  // const [hashtagsString, setHashtagsString] = useState('');
  useEffect(() => {
    if (replyText.trim() === '') setReplyDisabled(true);
    else {
      // setHashtags(replyText.match(/#\w+/g));
      // if (hashtags !== null && hashtags.length !== 0)
      //   setHashtagsString(hashtags.join(','));
      setReplyDisabled(false);
    }
  }, [replyText]);
  const resetAll = () => {
    setReplyText('');
    // setHashtags([]);
    // setHashtagsString('');
    setReplyDisabled(true);
  };
  const handleReply = () => {
    const body = { text: { replyText } };
    resetAll();
    const postReply = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}tweets/${tweetId}/addReply`,
          {
            method: 'POST',
            origin: true,
            credentials: 'include',
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          },
        );
        const data = await response.json();
        if (data.status) {
          // console.log(data.data);
          setReplies((prev) => [data.data, ...prev]);
        }
      } catch (error) {
        toast('Error Adding Reply:', error);
      }
    };
    postReply();
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/app/${user.username}`);
  };
  return (
    <div
      className="flex w-full flex-col gap-1 border-b-[0.5px] border-b-light-gray py-2 dark:border-border-gray"
      data-testid="add-reply"
    >
      {focus ? (
        <div className="ml-16 flex flex-row gap-1">
          <span className="text-sm text-light-thin">Replying to</span>
          <span className="text-sm text-blue underline">@{replyFor}</span>
        </div>
      ) : (
        ''
      )}
      <div
        className="flex w-[90%] flex-wrap items-center justify-between px-2 md:w-full"
        onClick={() => {
          setFocus(true);
        }}
      >
        <div
          onClick={() => {
            handleClick();
          }}
        >
          <img
            className=" h-[40px] w-10 cursor-pointer rounded-full object-cover sm:mr-[12px]"
            src={user.imageUrl || import.meta.env.VITE_DEFAULT_AVATAR}
            alt="profileImage"
          />
        </div>

        <div className="flex w-[60%] flex-wrap items-center sm:w-[65%] sm:pl-1">
          <input
            className="h-[60px] w-[90%] focus:outline-0
              dark:bg-pure-black dark:text-white"
            placeholder="Post your reply"
            value={replyText}
            onChange={(event) => {
              setReplyText(event.target.value);
            }}
          />
          <div className="flex w-[10%] justify-center">
            <AddEmoji
              text={replyText}
              setText={setReplyText}
            />
          </div>
        </div>
        <button
          onClick={handleReply}
          type="submit"
          className="h-[30px] w-[20%] rounded-full bg-blue text-white disabled:opacity-50"
          disabled={replyDisabled}
        >
          Reply
        </button>
      </div>
    </div>
  );
}

AddReply.propTypes = {
  setReplies: PropTypes.func.isRequired,
  tweetId: PropTypes.string.isRequired,
  replyFor: PropTypes.string.isRequired,
};
export default AddReply;
