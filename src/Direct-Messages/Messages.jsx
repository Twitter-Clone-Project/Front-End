/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import MessageCard from './MessageCard';

// eslint-disable-next-line react/prop-types
function Messages({ messages, socketMessages }) {
  const divRef = useRef(null);
  const [clicked, setClicked] = useState('');

  useEffect(() => {
    divRef.current?.scrollIntoView();
  }, [messages, socketMessages]);

  return (
    <div className="flex flex-col gap-2 text-white dark:bg-black">
      {messages.map((message, index) => (
        <MessageCard
          key={message.messageId}
          id={message.messageId}
          Message={message.text}
          clicked={clicked}
          setClicked={setClicked}
          lastMessageId={
            index === messages.length - 1 ? message.messageId : '-1'
          }
          isFromMe={message.isFromMe}
          isSeen={message.isSeen}
          time={message.time}
        />
      ))}
      {socketMessages.map((socketMessage, i) => (
        <MessageCard
          key={socketMessage.messageId}
          id={socketMessage.messageId}
          Message={socketMessage.text}
          clicked={clicked}
          setClicked={setClicked}
          lastMessageId={
            i === messages.length - 1 ? socketMessage.messageId : '-1'
          }
          isFromMe={socketMessage.isFromMe}
          isSeen={socketMessage.isSeen}
          time={socketMessage.time}
        />
      ))}

      <div ref={divRef} />
    </div>
  );
}

export default Messages;
