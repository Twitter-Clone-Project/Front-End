import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/AuthContext';
import AddEmoji from '../tweetPage/AddEmoji';

function AddReply({ setReplies, tweetId }) {
  const { user } = useAuth();
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
          `http://${import.meta.env.VITE_API_DOMAIN}tweets/${tweetId}/addReply`,
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
          data.data.screenName = user.name;
          setReplies((prev) => [data.data, ...prev]);
          // console.log(data.data);
        }
      } catch (error) {
        toast('Error Adding Reply:', error);
      }
    };
    postReply();
  };

  return (
    <div
      className="flex flex-wrap items-center justify-between px-2 sm:w-full"
      data-testid="add-reply"
    >
      <img
        className=" mr-[12px] h-[40px] w-[40px] rounded-full object-cover"
        src={user.imageUrl || import.meta.env.VITE_DEFAULT_AVATAR}
        alt="profileImage"
      />
      <div className="flex w-[70%] flex-wrap items-center pl-1">
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
  );
}

AddReply.propTypes = {
  setReplies: PropTypes.func.isRequired,
  tweetId: PropTypes.string.isRequired,
};
export default AddReply;
