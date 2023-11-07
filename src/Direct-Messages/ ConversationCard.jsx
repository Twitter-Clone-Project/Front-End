/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import PropTypes from 'prop-types';

function ConversationCard({
  image,
  name,
  tag,
  lastDate,
  lastMessage,
  selectedTag,
  setSelectedTag,
}) {
  return (
    <div
      onClick={() => {
        setSelectedTag(tag);
      }}
      className={`${
        tag === selectedTag
          ? 'border-r-2 border-blue bg-[#f0f3f3] dark:bg-[#1e2023]'
          : 'bg-white dark:bg-black'
      } flex h-[73px] w-full p-4 hover:bg-xx-light-gray 
       dark:hover:bg-[#16171a]`}
    >
      <div>
        <img
          src={image}
          alt=""
          className="mr-3 h-10 w-10 rounded-full"
        />
      </div>
      <div>
        <div className="flex items-center">
          <div className="text-center text-base font-bold text-black dark:text-white">
            {name}
          </div>
          <div className="px-1 text-center text-base text-[#71767B]">{tag}</div>
          <div className="mb-1 flex h-full items-center justify-center pr-[5px]">
            <div className="h-[2px] w-[2px] rounded-full  bg-[#71767B]" />
          </div>

          <div className=" text-center text-base text-[#71767B]">
            {lastDate}
          </div>
        </div>
        <div
          className={` ${
            tag === selectedTag
              ? ' text-black dark:text-white'
              : 'text-[#71767B]'
          } pr-7  text-base`}
        >
          {lastMessage}
        </div>
      </div>
    </div>
  );
}

ConversationCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  lastDate: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  selectedTag: PropTypes.string.isRequired,
  setSelectedTag: PropTypes.func.isRequired,
};

export default ConversationCard;
