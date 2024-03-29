/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ChatContext } from '../../hooks/ContactContext';
import { useAuth } from '../../hooks/AuthContext';

/**
 * Renders a card representing a conversation in a search result.
 *
 * Handles click events to manage chat context and emit socket events(open/close).
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.conversationData - Data related to the conversation.
 * @returns {JSX.Element} JSX for the search result card.
 * @example
 * ```jsx
 *  <SearchCard conversationData={conversationData} />
 * ```
 */

function SearchCard({ conversationData }) {
  const {
    chatContext,
    setChatContext,
    socket,
    conversations,
    setMessagesCount,
    messagesCount,
    setConversations,
  } = useContext(ChatContext);
  const { user } = useAuth();
  return (
    <Link
      data-testid={`${conversationData.conversationId}-search-card`}
      className=" hover:no-underline"
      to={`${conversationData.contact.username}`}
    >
      <div
        data-testid={`${conversationData.conversationId}-search-card-main`}
        onClick={() => {
          if (!conversationData.isConversationSeen)
            setMessagesCount(messagesCount - 1);
          if (chatContext.conversationId === '') {
            setChatContext({ ...conversationData });
            const conversationIndex = conversations.findIndex(
              (conv) => conv.conversationId === conversationData.conversationId,
            );
            if (conversationIndex !== -1) {
              const updatedConversations = [...conversations];
              updatedConversations[conversationIndex].isConversationSeen = true;
              setConversations(updatedConversations);
            }

            socket.emit('chat-opened', {
              userId: user.userId,
              conversationId: conversationData.conversationId,
              contactId: conversationData.contact.id,
            });
          } else if (
            chatContext.conversationId !== conversationData.conversationId
          ) {
            socket.emit('chat-closed', {
              userId: user.userId,
              conversationId: chatContext.conversationId,
              contactId: chatContext.contact.id,
            });
            setChatContext({ ...conversationData });
            const conversationIndex = conversations.findIndex(
              (conv) => conv.conversationId === conversationData.conversationId,
            );
            if (conversationIndex !== -1) {
              const updatedConversations = [...conversations];
              updatedConversations[conversationIndex].isConversationSeen = true;
              setConversations(updatedConversations);
            }

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
    </Link>
  );
}

export default SearchCard;
SearchCard.propTypes = {
  /**
   *  Data related to the conversation.
   */
  conversationData: PropTypes.object.isRequired,
};
