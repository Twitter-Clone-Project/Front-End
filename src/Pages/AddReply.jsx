/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/AuthContext';
import AddEmoji from '../tweetPage/AddEmoji';

/**
 * AddReply provides an interface for users to add replies to a tweet.
 * The interface includes a text field and an emoji picker for users to compose replies.
 * @param {Object} props - The properties passed to the AddReply component.
 * @param {Function} props.setReplies - The function controlling the replies for a certain tweet.
 * @param {string} props.tweetId - The ID of the tweet for which the reply is being added.
 * @param {string} props.replyFor - The username of the user for whom the current user is replying.
 * @returns {JSX.Element} The JSX for the interface to add replies to a tweet.
 * @example
 * // Rendering AddReply within a parent component
 * function ParentComponent() {
 *   return (
 *     <AddReply
 *       setReplies={(updatedReplies) => {
 *         // Logic to update the replies in the parent component
 *       }}
 *       tweetId="tweet_123"
 *       replyFor="example_user"
 *     />
 *   );
 * }
 */
function AddReply({ setReplies, tweetId, replyFor }) {
  const { user } = useAuth();
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState('');
  const [replyDisabled, setReplyDisabled] = useState(true);
  // const [hashtags, setHashtags] = useState([]);
  // const [hashtagsString, setHashtagsString] = useState('');
  useEffect(() => {
    if (text.trim() === '') setReplyDisabled(true);
    else {
      // setHashtags(text.match(/#\w+/g));
      // if (hashtags !== null && hashtags.length !== 0)
      //   setHashtagsString(hashtags.join(','));
      setReplyDisabled(false);
    }
  }, [text]);
  const resetAll = () => {
    setText('');
    // setHashtags([]);
    // setHashtagsString('');
    setReplyDisabled(true);
  };
  const handleReply = () => {
    const body = { text };
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
        className="flex w-full flex-wrap items-center justify-between px-2"
        onClick={() => {
          setFocus(true);
        }}
        data-testid="reply-field"
      >
        <div
          onClick={() => {
            handleClick();
          }}
          data-testid="reply-user-profileImg"
        >
          <img
            className=" h-[40px] w-10 cursor-pointer rounded-full object-cover sm:mr-[12px]"
            src={user.imageUrl || import.meta.env.VITE_DEFAULT_AVATAR}
            alt="profileImage"
          />
        </div>

        <div
          className="flex w-[60%] flex-wrap items-center sm:w-[65%] sm:pl-1"
          data-testid="reply-text-field"
        >
          <input
            className="h-[60px] w-[90%] focus:outline-0
              dark:bg-pure-black dark:text-white"
            placeholder="Post your reply"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              // console.log(event.target.value.length);
            }}
            maxLength={60}
            dir="auto"
          />
          <div
            className="flex w-[10%] justify-center"
            data-testid="reply-emoji"
          >
            <AddEmoji
              text={text}
              setText={setText}
            />
          </div>
        </div>
        <button
          onClick={handleReply}
          type="submit"
          className="h-[30px] w-[20%] rounded-full bg-blue text-white disabled:opacity-50"
          disabled={replyDisabled}
          data-testid="reply-submit-button"
        >
          Reply
        </button>
      </div>
    </div>
  );
}

AddReply.propTypes = {
  /**
   * The function controlling the replies for a certain tweet.
   */
  setReplies: PropTypes.func.isRequired,
  /**
   * The ID of the tweet for which the reply is being added.
   */
  tweetId: PropTypes.string.isRequired,
  /**
   * The username of the user for whom the current user is replying.
   */
  replyFor: PropTypes.string.isRequired,
};

export default AddReply;
