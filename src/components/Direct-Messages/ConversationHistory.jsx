/* eslint-disable max-len */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React, { useEffect, useContext, useRef } from 'react';
// import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import ConversationCard from './ConversationCard';
import { ChatContext } from '../../hooks/ContactContext';
/**
 * Represents the component displaying conversation history.
 * @component
 * @returns {JSX.Element} JSX for the Conversations History component.
 * @example
 * ```jsx
 *  <ConversationsHistory />
 * ```
 */

function ConversationsHistory() {
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
  const chatContextRef = useRef();
  useEffect(() => {
    chatContextRef.current = chatContext;
  }, [chatContext]);

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
          isSeen:
            removedConversation.conversationId ===
            chatContextRef.current.conversationId,
        };
      } else {
        removedConversation.lastMessage.text = top.text;
        removedConversation.lastMessage.timestamp = dayjs().format();
        removedConversation.lastMessage.isSeen =
          removedConversation.conversationId ===
          chatContextRef.current.conversationId;
      }
      removedConversation.isConversationSeen =
        removedConversation.conversationId ===
        chatContextRef.current.conversationId;

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
          />
        ))}
      </div>
    );
  }
}

export default ConversationsHistory;
