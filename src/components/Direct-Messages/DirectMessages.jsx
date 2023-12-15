import React, { useState, useEffect, useContext, useRef } from 'react';
import dayjs from 'dayjs';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import ConversationsPage from './ConversationsPage';
import Button from '../form-controls/Button';
import { useAuth } from '../../hooks/AuthContext';
import { ChatContext } from '../../hooks/ContactContext';

function DirectMessages() {
  const { user } = useAuth();
  const {
    chatContext,
    socket,
    setSocketMessages,
    setChatState,
    setTop,
    setChatContext,
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

  // close the opened chat when go to another page

  useEffect(
    () => () => {
      if (
        chatContextRef.current &&
        chatContextRef.current.conversationId !== ''
      ) {
        // mark the current chat as closed before closing the website
        socket.emit('chat-closed', {
          userId: user.userId,
          conversationId: chatContextRef.current.conversationId,
          contactId: chatContextRef.current.contact.id,
        });
      }
      setChatContext({
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
    },
    [],
  );

  // useEffect(() => {
  //   const newSocket = io(`${import.meta.env.VITE_SOCKET_DOMAIN}`);
  //   newSocket.on('connect', () => {
  //     newSocket.emit('add-user', { userId: user.userId });
  //   });
  //   setSocket(newSocket);

  //   return () => {
  //     if (newSocket.connected) {
  //       if (chatContext.conversationId === '') {
  //         // mark the current chat as closed before closed the website
  //         if (chatContext.conversationId !== '') {
  //           socket.emit('chat-closed', {
  //             userId: user.userId,
  //             conversationId: chatContext.conversationId,
  //             contactId: chatContext.contact.id,
  //           });
  //         }
  //       }
  //       newSocket.disconnect();
  //     }
  //   };
  // }, [user.userId]);

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
    <div className="h-full w-full text-black">
      <div className="layout max-h-screenover flow-auto mx-auto  h-full grid-cols-[auto_1fr]  grid-rows-1 dark:bg-black  md:grid ">
        <ConversationsPage />

        {windowWidth >= 1024 && chatContext.conversationId === '' && (
          <div
            className="flex h-screen  flex-col justify-center border-x-[1px]  border-[#f6f8f9]
                      dark:border-[#252829] dark:bg-black dark:text-white
                      md:w-[600px] lg:w-[600px]
                      xl:w-[600px]"
          >
            <div className="mx-[100px] flex flex-col">
              <div className="text-[31px] font-bold">Select a message</div>
              <div className="text-[#71767B]">
                Choose from your existing conversations, start a
              </div>
              <div className="mb-7 text-[#71767B]">
                new one, or just keep swimming.
              </div>

              <Link
                style={{ textDecoration: 'inherit' }}
                to="/app/messages/compose"
              >
                <Button
                  backGroundColor="blue"
                  borderColor="none"
                  label="New Message"
                  labelColor="white"
                  width="w-[179px]"
                />
              </Link>
            </div>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export default DirectMessages;
