/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function MessageCard({
  Message,
  id,
  clicked,
  lastMessageId,
  isFromMe,
  isSeen,
  setClicked,
  time,
}) {
  const Date = dayjs(time);
  return (
    <div
      onClick={() => {
        if (id === clicked) setClicked('-1');
        else setClicked(id);
      }}
      className={` flex  flex-col break-words  dark:bg-black ${
        isFromMe ? 'items-end ' : 'items-start'
      }
      `}
    >
      <div
        className={`
        min-h-11 flex w-fit 
        px-4
        py-3 text-base
         dark:text-white

        
        ${
          id === lastMessageId
            ? 'rounded-bl-3xl  rounded-br-[4px] rounded-tl-3xl rounded-tr-3xl'
            : 'rounded-3xl'
        } 
        ${
          isFromMe
            ? 'bg-blue hover:bg-[#1a8cd8]'
            : ' bg-[#f0f3f4] text-black dark:bg-[#2F3336] dark:text-white'
        } 
       
       `}
      >
        {Message}
      </div>
      <div className="h-fit">
        {id === clicked && (
          <div className=" w-fit cursor-pointer text-sm text-[#536571] hover:underline">
            {Date.format('YYYY-MM-DD h:mm A')}{' '}
            {!isFromMe ? '' : isSeen ? 'Seen' : 'Sent'}
          </div>
        )}
      </div>
    </div>
  );
}

MessageCard.propTypes = {
  Message: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  clicked: PropTypes.string.isRequired,
  lastMessageId: PropTypes.string.isRequired,
  isFromMe: PropTypes.bool.isRequired,
  isSeen: PropTypes.bool.isRequired,
  setClicked: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
};

export default MessageCard;
