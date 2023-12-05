/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
// import PropTypes from 'prop-types';
import ConversationCard from './ConversationCard';
import { ChatContext } from '../../hooks/ContactContext';

function ConversationsHistory({ socket }) {
  const [conversations, setConversations] = useState([]);
  const { chatContext, top } = useContext(ChatContext);
  const [openedId, setOpenedId] = useState('');

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
      console.log(data.conversations);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (openedId === '') return;
    const conversationIndex = conversations.findIndex(
      (conv) => conv.conversationId === openedId,
    );
    if (conversationIndex !== -1) {
      const updatedConversations = [...conversations];
      updatedConversations[conversationIndex].lastMessage.isSeen = true;
      setConversations(updatedConversations);
    }
  }, [openedId]);

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
        removedConversation.lastMessage.isSeen = false;
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
            setOpenedId={setOpenedId}
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
