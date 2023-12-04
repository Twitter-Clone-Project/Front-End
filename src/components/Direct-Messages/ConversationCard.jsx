/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ChatContext } from '../../hooks/ContactContext';
import { useAuth } from '../../hooks/AuthContext';

function ConversationCard({
  conversationData,
  socket,
  userId,
  setConversations,
  conversations,
}) {
  const { chatContext, setChatContext } = useContext(ChatContext);
  const { user } = useAuth();

  let differenceInSeconds = 0;
  let differenceInMinutes = 0;
  let differenceInHours = 0;
  let differenceInMonths = 0;
  let differenceInYears = 0;
  let differenceInDays = 0;
  dayjs.extend(customParseFormat);

  if (conversationData.lastMessage !== '') {
    const timestampString = conversationData.lastMessage.timestamp;
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
        setChatContext({ ...conversationData, unseen: false });
        const conversationIndex = conversations.findIndex(
          (conv) => conv.conversationId === conversationData.conversationId,
        );

        if (conversationIndex !== -1) {
          const updatedConversations = [...conversations];
          updatedConversations[conversationIndex].unseen = false;
          setConversations(updatedConversations);
        }

        socket.emit('chat-opened', {
          userId: user.userId,
          conversationId: conversationData.conversationId,
        });
      }}
      className={`${
        conversationData.conversationId === chatContext.conversationId
          ? 'border-r-2 border-blue bg-[#f0f3f3] dark:bg-[#1e2023]'
          : 'bg-white dark:bg-black'
      } 
      ${
        conversationData.unseen ||
        conversationData.conversationId !== chatContext.conversationId
          ? 'bg-xx-light-gray dark:bg-[#16171a]'
          : ''
      }
      
      flex h-[73.06px] w-full p-4 
       pb-3 hover:bg-xx-light-gray dark:hover:bg-[#16171a]`}
    >
      <div className="mr-3 w-fit min-w-[40px]">
        <img
          src={conversationData.contact.imageUrl}
          alt=""
          className="h-10 w-10 rounded-full"
        />
      </div>

      <div className="flex w-full flex-col overflow-clip">
        <div className="flex w-full items-center gap-1 text-center ">
          <div className="w-[50%]  max-w-fit overflow-clip whitespace-nowrap text-base font-bold text-black dark:text-white">
            {conversationData.contact.name}
          </div>
          <div className="w-[50%] max-w-fit overflow-clip whitespace-nowrap text-base text-[#71767B]">
            @{conversationData.contact.username}
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
            conversationData.conversationId === chatContext.conversationId ||
            conversationData.unseen
              ? ' text-black dark:text-white'
              : 'text-[#71767B]'
          } flex  
          w-full max-w-fit overflow-clip whitespace-nowrap pr-8 text-base`}
        >
          <div>{conversationData.lastMessage.text}</div>
        </div>
      </div>

      {conversationData.unseen && (
        <div className="h-3 w-3 rounded-full bg-blue" />
      )}
    </div>
  );
}

// ConversationCard.propTypes = {
//   conversationData: PropTypes.object.isRequired,
//   userId,
// };

export default ConversationCard;
