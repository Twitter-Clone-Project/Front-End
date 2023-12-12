/* eslint-disable import/prefer-default-export */
import React, { useMemo, useState } from 'react';
import { ChatContext } from '../hooks/ContactContext';
import DirectMessages from '../components/Direct-Messages/DirectMessages';

export function ChatProvider() {
  const [top, setTop] = useState({
    conversationId: '',
    text: '',
  });
  const [socket, setSocket] = useState(null);
  const [socketMessages, setSocketMessages] = useState([]);
  const [chatState, setChatState] = useState({});

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
        ],
      )}
    >
      <DirectMessages />
    </ChatContext.Provider>
  );
}
