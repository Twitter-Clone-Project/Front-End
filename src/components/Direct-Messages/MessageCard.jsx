import React from 'react';
import PropTypes from 'prop-types';

function MessageCard({ Message, id, clicked, lastMessageId, state }) {
  return (
    <div
      className={` flex  flex-col break-words  dark:bg-black ${
        state === 'send' ? 'items-end ' : 'items-start'
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
          state === 'send'
            ? 'bg-blue hover:bg-[#1a8cd8]'
            : ' bg-[#f0f3f4] text-black dark:bg-[#2F3336] dark:text-white'
        } 
       
       `}
      >
        {Message}
      </div>
      <div className="h-2">
        {id === clicked && (
          <div className=" w-fit cursor-pointer text-sm text-[#536571] hover:underline">
            {state}
          </div>
        )}
      </div>
    </div>
  );
}

MessageCard.propTypes = {
  Message: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  clicked: PropTypes.number.isRequired,
  lastMessageId: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
};

export default MessageCard;
