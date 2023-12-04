/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
// import PropTypes from 'prop-types';
import ConversationCard from './ConversationCard';
import { ChatContext } from '../../hooks/ContactContext';

function ConversationsHistory({ socket, userId }) {
  const [conversations, setConversations] = useState([]);
  const { chatContext, top } = useContext(ChatContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://${import.meta.env.VITE_API_DOMAIN}conversations`,
        {
          method: 'GET',
          origin: true,
          credentials: 'include',
          withCredentials: true,
        },
      );
      const Json = await response.json();
      const { data } = Json;

      setConversations(data.conversations);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const conversationIndex = conversations.findIndex(
      (conversation) => conversation.conversationId === top.conversationId,
    );

    if (conversationIndex !== -1) {
      const updatedConversations = [...conversations];
      const [removedConversation] = updatedConversations.splice(
        conversationIndex,
        1,
      );
      removedConversation.lastMessage.text = top.text;
      if (removedConversation.conversationId !== chatContext.conversationId) {
        removedConversation.unseen = true;
      }
      updatedConversations.unshift(removedConversation);
      setConversations(updatedConversations);
    }
  }, [top]);

  if (conversations.length > 0) {
    return (
      <div>
        {conversations.map((conversation) => (
          <ConversationCard
            key={conversation.conversationId}
            conversationData={conversation}
            socket={socket}
            userId={userId}
            setConversations={setConversations}
            conversations={conversations}
          />
        ))}
      </div>
    );
  }
}

ConversationsHistory.propTypes = {
  // selectedConversationId: PropTypes.string.isRequired,
  // setSelectedConversationId: PropTypes.func.isRequired,
  // setContact: PropTypes.func.isRequired,
};

export default ConversationsHistory;
