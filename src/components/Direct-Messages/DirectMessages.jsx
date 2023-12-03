import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import io from 'socket.io-client';
import ChatPage from './ChatPage';
import ConversationsPage from './ConversationsPage';
import { useAuth } from '../../hooks/AuthContext';

function DirectMessages() {
  const [selectedChat, setSelectedChat] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  const [socket, setSocket] = useState(null);
  const [person, setPerson] = useState(null);

  const { user } = useAuth();
  useEffect(() => {
    const newSocket = io(`http://${import.meta.env.VITE_SOCKET_DOMAIN}`);

    newSocket.on('connect', () => {
      newSocket.emit('add-user', { userId: user.userId });
    });

    setSocket(newSocket);

    return () => {
      if (newSocket.connected) {
        newSocket.disconnect();
      }
    };
  }, [user.userId]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.outerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div className="h-screen  w-full">
      <div className="layout mx-auto h-full grid-cols-[auto_1fr] grid-rows-1 overflow-auto dark:bg-black  md:grid ">
        <ConversationsPage
          setPerson={setPerson}
          selectedConversationId={selectedChat}
          setSelectedConversationId={setSelectedChat}
          visibility={
            (windowWidth < 1024 && selectedChat === '') || windowWidth >= 1024
          }
        />

        <div className="relative">
          {windowWidth < 1024 && selectedChat !== '' && (
            <button
              className=" absolute left-2 top-2"
              type="button"
              onClick={() => {
                setSelectedChat('');
              }}
            >
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full hover:bg-[#e7e7e7] dark:hover:bg-[#181919]">
                <svg
                  className="h-5 w-5 fill-black dark:fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
                </svg>
              </div>
            </button>
          )}

          <ChatPage
            selectedConversationId={selectedChat}
            setSelectedConversationId={setSelectedChat}
            width={windowWidth}
            socket={socket}
            userId={user.userId}
            person={person}
            showArrow={windowWidth < 1024 && selectedChat !== ''}
            visibility={
              (windowWidth < 1024 && selectedChat !== '') || windowWidth >= 1024
            }
          />
        </div>
      </div>
    </div>
  );
}

export default DirectMessages;
