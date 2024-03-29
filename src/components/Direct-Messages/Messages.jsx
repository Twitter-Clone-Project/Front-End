/* eslint-disable react/no-array-index-key */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unneeded-ternary */
import React, { useRef, useEffect, useState, useContext } from 'react';
import MessageCard from './MessageCard';
import { ChatContext } from '../../hooks/ContactContext';

/**
 * Messages component displays the conversation messages.
 * @component
 * @returns {JSX.Element} JSX for the Messages component.
 * @example
 * ```jsx
 *  <Messages />
 * ```
 */

function Messages() {
  const divRef = useRef(null);
  const [clicked, setClicked] = useState('');
  const [messages, setMessages] = useState([]); // API
  const { chatContext, socketMessages, setSocketMessages, chatState } =
    useContext(ChatContext);

  // We Make this trick because the chatcontext
  // is an object or a complex data structure
  // and we need the last value at the receive event
  // so we track its value using useRef
  const chatContextRef = useRef();
  useEffect(() => {
    chatContextRef.current = chatContext;
  }, [chatContext]);

  const messagesRef = useRef();
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const socketmessagesRef = useRef();
  useEffect(() => {
    socketmessagesRef.current = socketMessages;
  }, [socketMessages]);

  // Get the API messages
  useEffect(() => {
    if (chatContext.conversationId !== '') {
      const fetchData = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}conversations/${
            chatContext.conversationId
          }/history`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const Json = await response.json();
        setMessages(Json.data.messages);
      };
      fetchData();
    }
  }, [chatContext]);

  // When the receiver open the chat make all  API and Socket messages seen
  useEffect(() => {
    const lastChatContext = chatContextRef.current;
    const lastMessages = messagesRef.current;
    const lastSocketMessages = socketmessagesRef.current;
    if (lastChatContext && chatState[lastChatContext.conversationId].inChat) {
      if (lastMessages) {
        const updatedAPIMessages = lastMessages.map((message) => ({
          ...message,
          isSeen: true,
        }));
        setMessages(updatedAPIMessages);
      }
      if (lastSocketMessages) {
        const updatedSocketMessages = lastSocketMessages.map(
          (socketMessage) => ({
            ...socketMessage,
            isSeen: true,
          }),
        );
        setSocketMessages(updatedSocketMessages);
      }
    }
  }, [chatState]);

  useEffect(() => {
    divRef.current?.scrollIntoView();
  }, [messages, socketMessages]);

  return (
    <div
      data-testid="messages-chat"
      className="flex flex-col gap-2 text-white dark:bg-black"
    >
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
          key={i}
          id={i.toString()}
          Message={socketMessage.text}
          clicked={clicked}
          setClicked={setClicked}
          lastMessageId={
            i === socketMessage.length - 1 ? socketMessage.messageId : '-1'
          }
          isFromMe={socketMessage.isFromMe}
          isSeen={socketMessage.isSeen}
          time={socketMessage.time}
        />
      ))}
      <div
        data-testid="div-in-chat"
        ref={divRef}
      />
    </div>
  );
}

export default Messages;
