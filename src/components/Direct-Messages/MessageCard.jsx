/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

/**
 * MessageCard Component displays message within the conversation.
 * @component
 * @param {string} props.Message - The content of the message.
 * @param {string} props.id - The unique identifier for the message.
 * @param {string} props.clicked - The identifier for the clicked message.
 * @param {string} props.lastMessageId - The identifier for the last message.
 * @param {boolean} props.isFromMe - Indicates whether the message is from the current user.
 * @param {boolean} props.isSeen - Indicates whether the message has been seen.
 * @param {Function} props.setClicked - Function to set the clicked message.
 * @param {string} props.time - The timestamp of the message.
 * @returns {JSX.Element} JSX for the MessageCard component.
 * @example
 *  ```jsx
 *  <MessageCard Message={Message} id={id} clicked={clicked} lastMessageId={lastMessageId} isFromMe={isFromMe} isSeen={isSeen} setClicked={setClicked} time={time} />
 * ```
 */

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
      data-testid={`${id}-message-card`}
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
        data-testid={`${id}-message-card-inside`}
        className={`
        min-h-11 
        flex w-fit break-all 
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
          <div
            data-testid={`${id}-message-card-state`}
            className=" w-fit cursor-pointer text-sm text-[#536571] hover:underline"
          >
            {Date.format('YYYY-MM-DD h:mm A')}{' '}
            {!isFromMe ? '' : isSeen ? 'Seen' : 'Sent'}
          </div>
        )}
      </div>
    </div>
  );
}

MessageCard.propTypes = {
  /**
   *  The content of the message.
   */
  Message: PropTypes.string.isRequired,
  /**
   *  The unique identifier for the message.
   */
  id: PropTypes.string.isRequired,
  /**
   *  The identifier for the clicked message.
   */
  clicked: PropTypes.string.isRequired,
  /**
   *  The identifier for the last message.
   */
  lastMessageId: PropTypes.string.isRequired,
  /**
   *  Indicates whether the message is from the current user.
   */
  isFromMe: PropTypes.bool.isRequired,
  /**
   *  Indicates whether the message has been seen.
   */
  isSeen: PropTypes.bool.isRequired,
  /**
   *  Function to set the clicked message.
   */
  setClicked: PropTypes.func.isRequired,
  /**
   *  The timestamp of the message.
   */
  time: PropTypes.string.isRequired,
};

export default MessageCard;
