/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactTimeAgo from 'react-time-ago';
import PropTypes from 'prop-types';
import { v4 as uuid4 } from 'uuid';
import OwnToaster from '../components/OwnToaster';
import PopoverUserCard from '../components/userComponents/PopoverUserCard';
import { useAuth } from '../hooks/AuthContext';

function Reply({ data }) {
  const [text, setText] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    let reply;
    if (typeof data.replyText === 'string') {
      reply = data.replyText.slice(14, data.replyText.length - 2);
    } else if (typeof data.replyText === 'object') {
      reply = data.replyText.replyText;
    }
    setText(reply);
  }, [data]);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="tweet mb-[0.5px] mt-[-0.5px] flex w-[88%] border-collapse flex-row border-b-[0.5px] border-b-light-gray bg-white px-[16px] pb-4 pt-[12px] hover:cursor-pointer hover:bg-xx-light-gray dark:border-b-border-gray dark:bg-pure-black dark:text-white dark:hover:bg-pure-black md:w-[598px]"
      data-testid={data.replyId}
    >
      <div className="leftColumn mr-[12px] h-[40px] w-[40px] ">
        <div className="profileImage leftColumn absolute mr-[12px] h-[40px] w-[40px] ">
          <img
            data-testid={`profileImage${data.id}`}
            src={data.profileImageURL || import.meta.env.VITE_DEFAULT_AVATAR}
            alt="profileImage"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="  h-[40px] w-[40px] rounded-full object-cover transition-opacity"
          />
        </div>
        {isHovered && (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative left-0 right-24 top-[-1] z-10 mt-5 flex h-[250px]  w-[300px] flex-col justify-center "
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

      <div className="rightColumn w-[512px] pl-2">
        <div className="flex flex-row justify-between ">
          <div className="userInfo flex flex-row">
            <div className="name  text-[15px] font-bold dark:text-white">
              {data.screenName || user.name}
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
        </div>
        <div className="caption">
          {text.split(' ').map((word) => {
            if (word.startsWith('#')) {
              return (
                <span
                  key={uuid4()}
                  className=" text-blue"
                >
                  {word}{' '}
                </span>
              );
            }
            return `${word} `;
          })}
          {/* {text} */}
        </div>
      </div>
      <OwnToaster />
    </div>
  );
}

Reply.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Reply;
