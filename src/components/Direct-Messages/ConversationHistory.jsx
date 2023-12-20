/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react';
// import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import ConversationCard from './ConversationCard';
import { ChatContext } from '../../hooks/ContactContext';

function ConversationsHistory({ setOpenedId, openedId }) {
  const {
    chatContext,
    top,
    socket,
    setChatState,
    conversations,
    setConversations,
  } = useContext(ChatContext);
  dayjs.extend(utc);
  dayjs.extend(timezone);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}conversations`,
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

      // set the initial state of the chatState
      data.conversations.map((conversation) => {
        setChatState((prevConversations) => ({
          ...prevConversations,
          [conversation.conversationId]: {
            inChat: conversation.contact.inConversation,
          },
        }));
        return conversation;
      });
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
      updatedConversations[conversationIndex].isConversationSeen = true;
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
      if (removedConversation.lastMessage === null) {
        removedConversation.lastMessage = {
          id: '',
          text: top.text,
          timestamp: dayjs().format(),
          isSeen: true,
        };
      } else {
        removedConversation.lastMessage.text = top.text;
        removedConversation.lastMessage.timestamp = dayjs().format();
      }

      if (removedConversation.conversationId !== chatContext.conversationId) {
        removedConversation.isConversationSeen = false;
      }
      updatedConversations.unshift(removedConversation);
      setConversations(updatedConversations);
    }
  }, [top]);

  if (conversations.length > 0) {
    return (
      <div
        data-testid="conversationshistory"
        className="w-full"
      >
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

export default ConversationsHistory;
