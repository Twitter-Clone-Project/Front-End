/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactTimeAgo from 'react-time-ago';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { v4 as uuid4 } from 'uuid';
import PopoverUserCard from '../components/userComponents/PopoverUserCard';
import { useAuth } from '../hooks/AuthContext';
import ReplyMenu from './ReplyMenu';

/**
 * Reply is responsible for rendering the data of a certain reply on a tweet.
 * It receives the reply data and displays all the required info.
 * @param {Object} props - The properties passed to the Reply component.
 * @param {Object} props.data - An object containing all the data for a reply on a certain tweetId.
 * @param {string} props.tweetId - The ID of the tweet for which the reply is rendered.
 * @param {Array} props.replies - The state array containing all the replies for a certain tweet.
 * @param {Function} props.setReplies - The function controlling the replies for a certain tweet to be sent to the Reply component.
 * @returns {JSX.Element} The JSX for displaying a reply on a tweet.
 * @example
 * // Rendering a reply component within a list of replies
 * const sampleReplies = [
 *   { replyId: '1', content: 'This is the first reply.' },
 *   { replyId: '2', content: 'This is the second reply.' },
 *   // ... other replies
 * ];
 *
 * // Within a parent component
 * function ParentComponent() {
 *   const [replies, setReplies] = useState(sampleReplies);
 *
 *   return (
 *     <div>
 *       {replies.map((reply) => (
 *         <Reply
 *           key={reply.replyId}
 *           data={reply}
 *           tweetId="tweet_123"
 *           replies={replies}
 *           setReplies={setReplies}
 *         />
 *       ))}
 *     </div>
 *   );
 * }
 */
function Reply({ data, tweetId, replies, setReplies }) {
  const [text, setText] = useState('');
  const [isFollowed, setIsFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingsCount, setFollowingsCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    setText(data.replyText);
  }, [data]);
  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}users/${data.username}/followers`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const res = await response.json();
        if (res.status) {
          const names = [];
          setFollowersCount(res.data.users.length);
          res.data.users.forEach((follower) => {
            names.push(follower.username);
          });
          if (names.indexOf(user.username) !== -1) setIsFollowed(true);
        }
      } catch (error) {
        toast(error.message);
      }
    };
    const getFollowings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}users/${data.username}/followings`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const res = await response.json();
        if (res.status) {
          setFollowingsCount(res.data.users.length);
        }
      } catch (error) {
        toast(error.message);
      }
    };
    getFollowers();
    getFollowings();
  }, [data.username, user.username]);
  const navigate = useNavigate();
  const handleUserInfoClick = () => {
    navigate(`/app/${data.username}`);
  };
  return (
    <div
      className="tweet mb-[0.5px] mt-[-0.5px] grid w-full border-collapse grid-cols-[auto_1fr] border-y-[0.5px]  border-y-border-gray bg-white px-3 pb-2 pt-[12px] hover:cursor-default hover:bg-xx-light-gray dark:bg-pure-black dark:text-white dark:hover:bg-pure-black sm:px-[16px] lg:min-w-[598px]"
      data-testid={`${data.replyId}`}
    >
      <div
        className="leftColumn mr-[12px] flex w-[40px] items-center hover:cursor-pointer"
        data-testid={`${data.replyId}-left-column`}
        onClick={() => {
          handleUserInfoClick();
        }}
      >
        <div className="profileImage leftColumn absolute mr-[12px] h-[40px] w-[40px] ">
          {isFollowed && (
            <PopoverUserCard
              popoverIsFollowed
              popoverUserPicture={
                data.imageUrl || import.meta.env.VITE_DEFAULT_AVATAR
              }
              popoverUserName={data.screenName}
              popoverUserID={data.username}
              popoverDiscription=""
              popoverFollowing={followingsCount}
              popoverFollowers={followersCount}
              popoverTestID={`${data.username}-popover`}
              popoverSetLocalIsFollowed
            >
              <img
                data-testid={`profileImage${data.id}`}
                src={data.imageUrl || import.meta.env.VITE_DEFAULT_AVATAR}
                alt="profileImage"
                className="h-[40px] w-[40px] rounded-full object-cover transition-opacity"
              />
            </PopoverUserCard>
          )}
          {!isFollowed && (
            <PopoverUserCard
              popoverIsFollowed={false}
              popoverUserPicture={
                data.imageUrl || import.meta.env.VITE_DEFAULT_AVATAR
              }
              popoverUserName={data.screenName}
              popoverUserID={data.username}
              popoverDiscription=""
              popoverFollowing={followingsCount}
              popoverFollowers={followersCount}
              popoverTestID={`${data.username}-popover`}
              popoverSetLocalIsFollowed
            >
              <img
                data-testid={`profileImage${data.id}`}
                src={data.imageUrl || import.meta.env.VITE_DEFAULT_AVATAR}
                alt="profileImage"
                className="h-[40px] w-[40px] rounded-full object-cover transition-opacity"
              />
            </PopoverUserCard>
          )}
        </div>
      </div>

      <div
        className="rightColumn max-w-[95%]"
        data-testid={`${data.replyId}-right-column`}
      >
        <div className="flex flex-row justify-between pb-2">
          <div
            className="userInfo flex flex-wrap hover:cursor-pointer"
            onClick={() => {
              handleUserInfoClick();
            }}
            data-testid={`${data.replyId}-name-field`}
          >
            <div className="name truncate break-words text-[15px] font-bold dark:text-white">
              {data.screenName}
            </div>
            <div className="userName overflow-hidden truncate break-words text-[15px] text-dark-gray">
              &ensp;@<span>{data.username}</span>
            </div>
            <div className="date overflow-hidden text-[15px] text-dark-gray">
              &ensp;.&ensp;
              <ReactTimeAgo
                date={new Date(data.createdAt)}
                locale="en-US"
                timeStyle="twitter"
              />
            </div>
          </div>
          {user.userId === data.replyUserId ? (
            <div
              className="pl-2"
              data-testid={`${data.replyId}-reply-menu`}
            >
              <ReplyMenu
                userId={data.replyUserId}
                tweetId={tweetId}
                reply={data}
                replies={replies}
                setReplies={setReplies}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <div
          className="caption"
          dir="auto"
        >
          {text &&
            text.split(' ').map((word) => {
              if (word.length && word.startsWith('#')) {
                return (
                  <span
                    key={uuid4()}
                    className=" text-blue"
                  >
                    {word.slice(0, 34)}
                    <br />
                    {word.slice(35, word.length - 1)}
                  </span>
                );
              }
              if (word.length > 35) {
                return (
                  <span key={uuid4()}>
                    {word.slice(0, 34)}
                    <br />
                    {word.slice(35, word.length - 1)}
                  </span>
                );
              }
              if (word.startsWith('#')) {
                return (
                  <span
                    key={uuid4()}
                    className=" text-blue"
                  >
                    {word}
                  </span>
                );
              }
              return `${word} `;
            })}
        </div>
      </div>
    </div>
  );
}

Reply.propTypes = {
  /**
   * An object containing all the data for a reply on a certain tweetId.
   */
  data: PropTypes.object.isRequired,
  /**
   * The ID of the tweet for which the reply is rendered.
   */
  tweetId: PropTypes.string.isRequired,
  /**
   * The state array containing all the replies for a certain tweet.
   */
  replies: PropTypes.array.isRequired,
  /**
   * The state function controlling the replies for a certain tweet to be sent to the Reply component.
   */
  setReplies: PropTypes.func.isRequired,
};

export default Reply;
