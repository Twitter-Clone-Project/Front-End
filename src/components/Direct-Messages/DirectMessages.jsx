import React, { useState, useEffect, useContext, useRef } from 'react';
import io from 'socket.io-client';
import dayjs from 'dayjs';
import ChatPage from './ChatPage';
import ConversationsPage from './ConversationsPage';
import { useAuth } from '../../hooks/AuthContext';
import { ChatContext } from '../../hooks/ContactContext';

function DirectMessages() {
  const { user } = useAuth();
  const {
    chatContext,
    setChatContext,
    socket,
    setSocket,
    setSocketMessages,
    setChatState,
    setTop,
  } = useContext(ChatContext);
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);

  // We Make this trick because the chatcontext
  // is an object or a complex data structure
  // and we need the last value at the receive event
  // so we track its value using useRef
  const chatContextRef = useRef();
  useEffect(() => {
    chatContextRef.current = chatContext;
  }, [chatContext]);

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_SOCKET_DOMAIN}`);
    newSocket.on('connect', () => {
      newSocket.emit('add-user', { userId: user.userId });
    });
    setSocket(newSocket);

    return () => {
      if (newSocket.connected) {
        if (chatContext.conversationId === '') {
          // mark the current chat as closed before closed the website
          socket.emit('chat-closed', {
            userId: user.userId,
            conversationId: chatContext.conversationId,
            contactId: chatContext.contact.id,
          });
        }
        newSocket.disconnect();
      }
    };
  }, [user.userId]);

  // Get the Socket messages
  useEffect(() => {
    if (socket === null) return;
    socket.on('msg-receive', async (message) => {
      setTop({ conversationId: message.conversationId, text: message.text });
      const lastChatContext = chatContextRef.current;
      if (
        lastChatContext &&
        lastChatContext.conversationId === message.conversationId
      ) {
        setSocketMessages((prevMessages) => [
          ...prevMessages,
          { ...message, time: dayjs().format('YYYY-MM-DD HH:mm:ssZ') },
        ]);
      }
    });
  }, [socket]);

  // When the context changes, clear the arrayMessages
  useEffect(() => {
    setSocketMessages([]);
  }, [chatContext]);

  // track the chats (opened/closed)
  useEffect(() => {
    if (socket === null) return;
    socket.on('status-of-contact', (data) => {
      setChatState((prevChatState) => {
        const { conversationId } = data;
        if (prevChatState[conversationId]) {
          return {
            ...prevChatState,
            [conversationId]: {
              inChat: data.inConversation,
            },
          };
        }
      });
    });
  }, [socket]);

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
    <div className="h-screen w-full">
      <div className="layout mx-auto h-full grid-cols-[auto_1fr] grid-rows-1 overflow-auto dark:bg-black  md:grid ">
        <ConversationsPage
          visibility={
            (windowWidth < 1024 && chatContext.conversationId === '') ||
            windowWidth >= 1024
          }
        />
        <div className="relative">
          {windowWidth < 1024 && chatContext.conversationId !== '' && (
            <button
              className=" absolute left-2 top-2"
              type="button"
              onClick={() => {
                // console.log('closing id', chatContext.conversationId);
                socket.emit('chat-closed', {
                  userId: user.userId,
                  conversationId: chatContext.conversationId,
                  contactId: chatContext.contact.id,
                });
                setChatContext({
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
                    isSeen: '',
                  },
                });
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
            width={windowWidth}
            showArrow={windowWidth < 1024 && chatContext.conversationId !== ''}
            visibility={
              (windowWidth < 1024 && chatContext.conversationId !== '') ||
              windowWidth >= 1024
            }
          />
        </div>
      </div>
    </div>
  );
}

export default DirectMessages;
