/* eslint-disable import/prefer-default-export */
import React, { useMemo, useState } from 'react';
import { ChatContext } from '../hooks/ContactContext';
import DirectMessages from '../components/Direct-Messages/DirectMessages';

export function ChatProvider() {
  const [top, setTop] = useState({
    conversationId: '',
    text: '',
  });
  const [chatContext, setChatContext] = useState({
    conversationId: '',
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
      text: '',
      timestamp: '',
    },
    unseen: false,
  });

  return (
    <ChatContext.Provider
      value={useMemo(
        () => ({ chatContext, setChatContext, top, setTop }),
        [chatContext, setChatContext, top, setTop],
      )}
    >
      <DirectMessages />
    </ChatContext.Provider>
  );
}
