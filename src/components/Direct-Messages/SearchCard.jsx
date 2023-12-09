/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import { ChatContext } from '../../hooks/ContactContext';
import { useAuth } from '../../hooks/AuthContext';

// eslint-disable-next-line react/prop-types
function SearchCard({ conversationData, setOpenedId }) {
  const { chatContext, setChatContext, socket } = useContext(ChatContext);
  const { user } = useAuth();
  return (
    <div
      onClick={() => {
        if (chatContext.conversationId === '') {
          // console.log('First open id:', conversationData.conversationId);
          setChatContext({ ...conversationData });
          setOpenedId(conversationData.conversationId);
          socket.emit('chat-opened', {
            userId: user.userId,
            conversationId: conversationData.conversationId,
            contactId: conversationData.contact.id,
          });
        } else if (
          chatContext.conversationId !== conversationData.conversationId
        ) {
          // console.log('closing id', chatContext.conversationId);
          socket.emit('chat-closed', {
            userId: user.userId,
            conversationId: chatContext.conversationId,
            contactId: chatContext.contact.id,
          });
          setChatContext({ ...conversationData });
          setOpenedId(conversationData.conversationId);
          // console.log('opening id', conversationData.conversationId);
          socket.emit('chat-opened', {
            userId: user.userId,
            conversationId: conversationData.conversationId,
            contactId: conversationData.contact.id,
          });
        }
      }}
      className={`${
        conversationData.conversationId === chatContext.conversationId
          ? 'bg-[#f0f3f3] dark:bg-[#1e2023]'
          : 'bg-white dark:bg-black'
      } flex h-[73px] w-full p-4 hover:bg-xx-light-gray 
        dark:hover:bg-[#16171a] `}
    >
      <div className="mr-3 w-fit min-w-[40px]">
        <img
          src={conversationData.contact.imageUrl}
          alt=""
          className="h-10 w-10 rounded-full"
        />
      </div>
      <div className="flex w-full flex-col overflow-clip">
        <div className="w-[90%] max-w-fit overflow-clip whitespace-nowrap text-base font-bold text-black dark:text-white">
          {conversationData.contact.name}
        </div>
        <div className="w-[90%]  max-w-fit overflow-clip whitespace-nowrap text-base text-[#71767B]">
          @ {conversationData.contact.username}
        </div>
      </div>
    </div>
  );
}

// SearchCard.propTypes = {};

export default SearchCard;
