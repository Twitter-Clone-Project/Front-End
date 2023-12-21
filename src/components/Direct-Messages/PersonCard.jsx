/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { ChatContext } from '../../hooks/ContactContext';

function PersonCard({ imgRef }) {
  const { chatContext } = useContext(ChatContext);
  console.log(chatContext.contact.commonFollowers.length);

  return (
    <div className="mb-4 flex h-[271.555px] w-full flex-col  items-center border-b-[1px] border-[#f6f8f9] px-4 py-5 hover:bg-[#f0f3f3] dark:border-[#252829] dark:bg-black dark:hover:bg-[#16171a]">
      <div className=" h-[68px] w-[68px]">
        <img
          ref={imgRef}
          src={chatContext.contact.imageUrl}
          alt=""
          className="h-16 w-16 rounded-full"
        />
      </div>
      <div className="mb-1 flex flex-col">
        <p className="  text-center text-base font-bold text-black dark:text-white">
          {chatContext.contact.name}
        </p>
        <p className="text-center text-base text-[#71767B]">
          @{chatContext.contact.username}
        </p>
      </div>
      <div className="my-3 flex flex-row ">
        <div
          data-testid="person-card-date"
          className="text-center text-sm text-[#71767B]"
        >
          Joined {dayjs(chatContext.contact.createdAt).format('MMMM YYYY')}
        </div>
        <div className="px-1 text-sm text-[#71767B]">.</div>
        <div className="text-center text-sm text-[#71767B]">
          {chatContext.contact.followersCount} Followers
        </div>
      </div>

      <div
        data-testid="person-card-common-followers"
        className="flex flex-row"
      >
        <div className="relative">
          {chatContext.contact.commonFollowers.map((follower, index) => (
            <div
              data-testid={`${index}-follower-image`}
              key={index}
            >
              <img
                className={`h-4 w-4 rounded-full border
                 border-white dark:border-black ${
                   index !== 0 ? '' : 'absolute right-2'
                 }`}
                src={follower.imageUrl}
                alt=""
              />
            </div>
          ))}
        </div>

        {chatContext.contact.commonFollowers.length > 0 && (
          <div
            data-testid="followed-by"
            className="ml-2 text-center text-xs text-[#71767B]"
          >
            Followed by
          </div>
        )}
        {chatContext.contact.commonFollowers.map((follower, index) => (
          <div
            data-testid={`${index}-follower-name`}
            key={index}
            className="ml-1 text-center text-xs text-[#71767B]"
          >
            {follower.name}
            {chatContext.contact.commonFollowers.length - 1 !== index
              ? ','
              : ''}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonCard;
