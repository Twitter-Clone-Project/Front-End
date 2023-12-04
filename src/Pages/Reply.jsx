/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactTimeAgo from 'react-time-ago';
import PropTypes from 'prop-types';
import { v4 as uuid4 } from 'uuid';
import OwnToaster from '../components/OwnToaster';

function Reply({ data }) {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(data.replyText.replyText);
  }, [data]);

  return (
    <div
      className="tweet mb-[0.5px] mt-[-0.5px] flex w-[88%] border-collapse  flex-row border-y-[0.5px] border-y-border-gray bg-white px-[16px] pt-[12px] hover:cursor-pointer hover:bg-xx-light-gray dark:bg-pure-black dark:text-white dark:hover:bg-pure-black md:w-[598px]"
      data-testid={data.replyId}
    >
      <div className="leftColumn mr-[12px] h-[40px] w-[40px] ">
        {/* <div className={` pb-1 ${repost === false ? 'hidden' : ''}`}>
          <svg
            viewBox="0 0 24 24"
            className="ml-[24px] h-[16px] w-[16px] fill-dark-gray  "
          >
            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
          </svg>
        </div> */}
        <div className="profileImage leftColumn mr-[12px] h-[40px] w-[40px] ">
          <img
            src={data.profileImageURL || import.meta.env.VITE_DEFAULT_AVATAR}
            alt="profileImage"
            className=" h-[40px] w-[40px] rounded-full object-cover"
          />
        </div>
      </div>

      <div className="rightColumn w-[512px] ">
        <div className="flex flex-row justify-between ">
          <div className="userInfo flex flex-row">
            <div className="name  text-[15px] font-bold">{data.screenName}</div>
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
        </div>
        <div className="h-[32px]" />
      </div>
      <OwnToaster />
    </div>
  );
}

Reply.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Reply;
