import React, { useState } from 'react';
import ChatPage from './ChatPage';
import ConversationsPage from './ConversationsPage';

function DirectMessages() {
  const [selectedChat, setSelectedChat] = useState('');

  return (
    <div className="h-screen min-h-full w-full">
      <div className="layout mx-auto h-full max-w-[80%] grid-cols-[auto_1fr_auto] grid-rows-1 dark:bg-black sm:grid ">
        <ConversationsPage
          selectedTag={selectedChat}
          setSelectedTag={setSelectedChat}
        />
        <ChatPage selectedTag={selectedChat} />
      </div>
    </div>
  );
}

export default DirectMessages;
