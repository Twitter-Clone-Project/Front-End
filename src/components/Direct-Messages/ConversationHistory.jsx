import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ConversationCard from './ConversationCard';

function ConversationsHistory({ selectedTag, setSelectedTag }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetch('https://654a8f7d1f197d51e492699b.mockapi.io/Conversations')
      .then((response) => response.json())
      .then((data) => setConversations(data));
    //   .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      {conversations.map((conversation) => (
        <ConversationCard
          key={conversation.id}
          image={conversation.image}
          name={conversation.name}
          tag={conversation.tag}
          lastDate={conversation.lastDate}
          lastMessage={conversation.lastMessage}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      ))}
    </div>
  );
}

ConversationsHistory.propTypes = {
  selectedTag: PropTypes.string.isRequired,
  setSelectedTag: PropTypes.func.isRequired,
};

export default ConversationsHistory;
