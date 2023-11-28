import React, { useRef, useEffect } from 'react';
import MessageCard from './MessageCard';

// eslint-disable-next-line react/prop-types
function Messages({ messages }) {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="flex flex-col text-white dark:bg-black">
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          Message={message.message}
          id={1}
          clicked={5}
          lastMessageId={2}
          state={message.mode}
        />
      ))}
      <div ref={divRef} />
    </div>
  );
}

export default Messages;
