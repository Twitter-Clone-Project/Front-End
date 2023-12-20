/* eslint-disable react/prop-types */
import React, { useState, useRef, useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
import PersonCard from './PersonCard';
import MessagesInput from './MessagesInput';
import Messages from './Messages';
import Header from './Header';

import { ChatContext } from '../../hooks/ContactContext';

function ChatPage() {
  const [imgVisible, setImgVisible] = useState(true);
  const { chatContext } = useContext(ChatContext);
  const imgRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.outerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const handleScroll = () => {
    if (imgRef.current) {
      const { top, bottom } = imgRef.current.getBoundingClientRect();
      if (bottom < 0 || top > window.innerHeight) {
        setImgVisible(false);
      } else {
        setImgVisible(true);
      }
    }
  };

  if (
    chatContext.conversationId !== '' &&
    ((windowWidth < 1024 && chatContext.conversationId !== '') ||
      windowWidth >= 1024)
  ) {
    return (
      <div
        data-testid="chat-page"
        className={`flex h-screen  max-w-full flex-col border-x-[1px]
          border-[#f6f8f9] dark:border-[#252829] dark:bg-black  
          ${windowWidth > 640 ? 'w-[559px]' : ' w-screen'}
        `}
      >
        <Header
          title={chatContext.contact.name}
          path="M13.5 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5zM13 17v-5h-2v5h2zm-1 5.25c5.66 0 10.25-4.59 10.25-10.25S17.66 1.75 12 1.75 1.75 6.34 1.75 12 6.34 22.25 12 22.25zM20.25 12c0 4.56-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12 7.44 3.75 12 3.75s8.25 3.69 8.25 8.25z"
          type="-"
          image={chatContext.contact.imageUrl}
          imgVisible={imgVisible}
          windowWidth={windowWidth}
        />
        <div
          data-testid="chat-page-messages"
          onScroll={handleScroll}
          className="
            flex flex-grow flex-col overflow-y-auto px-4 scrollbar-thin scrollbar-track-[#f9f9f9]
            scrollbar-thumb-[#c0c0c0]
            scrollbar-thumb-rounded-full hover:scrollbar-thumb-[#7b7b7b] dark:scrollbar-track-[#272727] dark:scrollbar-thumb-[#4a4a4a] dark:hover:scrollbar-thumb-[#888888]"
        >
          <div>
            <PersonCard imgRef={imgRef} />
          </div>
          <Messages />
        </div>
        <div>
          <MessagesInput />
        </div>
      </div>
    );
  }
}

export default ChatPage;
