/* eslint-disable import/prefer-default-export */
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { ChatContext } from '../hooks/ContactContext';

export function ChatProvider({ children }) {
  const [top, setTop] = useState({
    conversationId: '',
    text: '',
  });
  const [socket, setSocket] = useState(null);
  const [socketMessages, setSocketMessages] = useState([]);
  const [chatState, setChatState] = useState({});
  const [conversations, setConversations] = useState([]);
  const [messagesCount, setMessagesCount] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const [chatContext, setChatContext] = useState({
    conversationId: '',
    isConversationSeen: false,
    contact: {
      id: '',
      email: '',
      name: '',
      username: '',
      imageUrl: '',
      followersCount: '',
      createdAt: '',
      commonFollowers: [
        {
          name: '',
          username: '',
          imageUrl: '',
        },
        {
          name: '',
          username: '',
          imageUrl: null,
        },
      ],
      commonFollowersCnt: 0,
    },
    lastMessage: {
      id: '',
      text: '',
      timestamp: '',
      isSeen: '',
    },
  });

  return (
    <ChatContext.Provider
      value={useMemo(
        () => ({
          chatContext,
          setChatContext,
          top,
          setTop,
          socket,
          setSocket,
          socketMessages,
          setSocketMessages,
          chatState,
          setChatState,
          conversations,
          setConversations,
          notificationsCount,
          setNotificationsCount,
          messagesCount,
          setMessagesCount,
        }),
        [
          chatContext,
          setChatContext,
          top,
          setTop,
          socket,
          setSocket,
          socketMessages,
          setSocketMessages,
          chatState,
          setChatState,
          conversations,
          setConversations,
          notificationsCount,
          setNotificationsCount,
          messagesCount,
          setMessagesCount,
        ],
      )}
    >
      {children}
    </ChatContext.Provider>
  );
}
ChatProvider.defaultProps = {
  children: null,
};
ChatProvider.propTypes = {
  children: PropTypes.node,
};
