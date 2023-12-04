/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

function ConversationCard({
  id,
  imageUrl,
  name,
  username,
  lastMessage,
  selectedConversationId,
  setSelectedConversationId,
  setContact,
  contact,
}) {
  let differenceInSeconds = 0;
  let differenceInMinutes = 0;
  let differenceInHours = 0;
  let differenceInMonths = 0;
  let differenceInYears = 0;
  let differenceInDays = 0;

  dayjs.extend(customParseFormat);

  if (lastMessage !== '') {
    const timestampString = lastMessage.timestamp;
    const givenTimestamp = dayjs(timestampString);
    const currentTime = dayjs();
    differenceInSeconds = Math.floor(
      currentTime.diff(givenTimestamp, 'second'),
    );
    differenceInMinutes = Math.floor(
      currentTime.diff(givenTimestamp, 'minute'),
    );
    differenceInHours = Math.floor(currentTime.diff(givenTimestamp, 'hour'));
    differenceInDays = Math.floor(currentTime.diff(givenTimestamp, 'day'));
    differenceInMonths = Math.floor(currentTime.diff(givenTimestamp, 'month'));
    differenceInYears = Math.floor(currentTime.diff(givenTimestamp, 'year'));
  }
  let time = 0;
  let sign = '';
  if (
    differenceInMinutes === 0 &&
    differenceInHours === 0 &&
    differenceInDays === 0 &&
    differenceInMonths === 0 &&
    differenceInYears === 0
  ) {
    time = differenceInSeconds;
    sign = 's';
  } else if (
    differenceInHours === 0 &&
    differenceInDays === 0 &&
    differenceInMonths === 0 &&
    differenceInYears === 0
  ) {
    time = differenceInMinutes;
    sign = 'm';
  } else if (
    differenceInDays === 0 &&
    differenceInMonths === 0 &&
    differenceInYears === 0
  ) {
    time = differenceInHours;
    sign = 'h';
  } else if (differenceInMonths === 0 && differenceInYears === 0) {
    time = differenceInDays;
    sign = 'd';
  } else if (differenceInYears === 0) {
    time = differenceInMonths;
    sign = 'm';
  } else {
    time = differenceInYears;
    sign = 'y';
  }

  return (
    <div
      onClick={() => {
        setSelectedConversationId(id);
        setContact(contact);
      }}
      className={`${
        id === selectedConversationId
          ? 'border-r-2 border-blue bg-[#f0f3f3] dark:bg-[#1e2023]'
          : 'bg-white dark:bg-black'
      } flex h-[73.06px] w-full p-4 
       pb-3 hover:bg-xx-light-gray dark:hover:bg-[#16171a]`}
    >
      <div className="mr-3 w-fit min-w-[40px]">
        <img
          src={imageUrl}
          alt=""
          className="h-10 w-10 rounded-full"
        />
      </div>

      <div className="flex w-full flex-col overflow-clip">
        <div className="flex w-full items-center gap-1 text-center ">
          <div className="w-[50%]  max-w-fit overflow-clip whitespace-nowrap text-base font-bold text-black dark:text-white">
            {name}
          </div>
          <div className="w-[50%] max-w-fit overflow-clip whitespace-nowrap text-base text-[#71767B]">
            @{username}
          </div>
          <div className="">
            <div className="h-[2px] w-[2px] rounded-full bg-[#71767B]" />
          </div>

          <div className="text-base text-[#71767B]">
            {time}
            {sign}
          </div>
        </div>

        <div
          className={` ${
            id === selectedConversationId
              ? ' text-black dark:text-white'
              : 'text-[#71767B]'
          } flex  
          w-full max-w-fit overflow-clip whitespace-nowrap pr-8 text-base`}
        >
          <div id={lastMessage.id}>{lastMessage.text}</div>
        </div>
      </div>
    </div>
  );
}

ConversationCard.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  lastMessage: PropTypes.object.isRequired,
  selectedConversationId: PropTypes.string.isRequired,
  setSelectedConversationId: PropTypes.func.isRequired,
  setContact: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
};

export default ConversationCard;
