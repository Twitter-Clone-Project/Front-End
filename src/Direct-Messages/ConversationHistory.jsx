import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ConversationCard from './ConversationCard';

function ConversationsHistory({
  selectedConversationId,
  setSelectedConversationId,
  setPerson,
}) {
  const [conversations, setConversations] = useState([]);

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

  if (conversations.length > 0) {
    return (
      <div>
        {conversations.map((conversation) => (
          <ConversationCard
            key={conversation.conversationId}
            id={conversation.conversationId}
            imageUrl={
              conversation.contact.imageUrl ? conversation.contact.imageUrl : ''
            }
            name={conversation.contact.name}
            username={conversation.contact.username}
            lastMessage={
              conversation.lastMessage ? conversation.lastMessage : ''
            }
            personId={conversation.contact.id}
            selectedConversationId={selectedConversationId}
            setSelectedConversationId={setSelectedConversationId}
            setPerson={setPerson}
          />
        ))}
      </div>
    );
  }
}

ConversationsHistory.propTypes = {
  selectedConversationId: PropTypes.string.isRequired,
  setSelectedConversationId: PropTypes.func.isRequired,
};

export default ConversationsHistory;
