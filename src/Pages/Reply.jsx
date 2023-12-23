/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// eslint-disable-next-line import/no-extraneous-dependencies
import ReactTimeAgo from 'react-time-ago';
import PropTypes from 'prop-types';
import { v4 as uuid4 } from 'uuid';
import OwnToaster from '../components/OwnToaster';
import PopoverUserCard from '../components/userComponents/PopoverUserCard';
import { useAuth } from '../hooks/AuthContext';
import ReplyMenu from './ReplyMenu';

function Reply({ data, tweetId, replies, setReplies }) {
  const [text, setText] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    setText(data.replyText);
  }, [data]);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const navigate = useNavigate();
  const handleUserInfoClick = () => {
    navigate(`/app/${data.username}`);
  };
  return (
    <div
      className="tweet mb-[0.5px] mt-[-0.5px] grid w-full border-collapse grid-cols-[auto_1fr] border-y-[0.5px]  border-y-border-gray bg-white px-3 pb-2 pt-[12px] hover:cursor-default hover:bg-xx-light-gray dark:bg-pure-black dark:text-white dark:hover:bg-pure-black sm:px-[16px] lg:w-[598px]"
      data-testid={`${data.replyId}`}
    >
      <div
        className="leftColumn mr-[12px] h-[40px] w-[40px] hover:cursor-pointer"
        data-testid={`${data.replyId}-left-column`}
        onClick={() => {
          handleUserInfoClick();
        }}
      >
        <div className="profileImage leftColumn absolute mr-[12px] h-[40px] w-[40px] ">
          <img
            data-testid={`profileImage${data.id}`}
            src={data.profileImageURL || import.meta.env.VITE_DEFAULT_AVATAR}
            alt="profileImage"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="h-[40px] w-[40px] rounded-full object-cover transition-opacity"
          />
        </div>
        {isHovered && (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative left-0 right-24 top-[-1] z-10 mt-5 flex h-[250px]  flex-col justify-center sm:w-[300px]"
          >
            <PopoverUserCard
              popoverIsFollowed={data.isFollowed}
              popoverUserPicture={
                data.profileImageURL || import.meta.env.VITE_DEFAULT_AVATAR
              }
              popoverUserName={data.screenName}
              popoverUserID={data.username}
              popoverDiscription=""
              popoverFollowing={data.followingCount}
              popoverFollowers={data.followersCount}
              popoverTestID={`${data.username}-popover`}
              popoverSetLocalIsFollowed
            />
          </div>
        )}
      </div>

      <div
        className="rightColumn max-w-[95%]"
        data-testid={`${data.replyId}-right-column`}
      >
        <div className="flex flex-row justify-between ">
          <div
            className="userInfo flex flex-row hover:cursor-pointer"
            onClick={() => {
              handleUserInfoClick();
            }}
          >
            <div className="name  text-[15px] font-bold dark:text-white">
              {data.screenName}
            </div>
            <div className="userName   overflow-hidden text-[15px] text-dark-gray">
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
          {text.split(' ').map((word) => {
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
      <OwnToaster />
    </div>
  );
}

Reply.propTypes = {
  data: PropTypes.object.isRequired,
  tweetId: PropTypes.string.isRequired,
  replies: PropTypes.string.isRequired,
  setReplies: PropTypes.func.isRequired,
};

export default Reply;
