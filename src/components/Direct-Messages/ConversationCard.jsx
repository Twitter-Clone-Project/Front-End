/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import PropTypes from 'prop-types';
import Time from './Time';

import { ChatContext } from '../../hooks/ContactContext';
import { useAuth } from '../../hooks/AuthContext';

function ConversationCard({ conversationData, setOpenedId }) {
  const {
    chatContext,
    setChatContext,
    conversations,
    setConversations,
    socket,
    setMessagesCount,
    messagesCount,
  } = useContext(ChatContext);
  const { user } = useAuth();
  const { conversationId } = useParams();

  useEffect(() => {
    conversations.map((conversation) => {
      if (conversationId === conversation.contact.username) {
        if (chatContext.conversationId !== '') {
          socket.emit('chat-closed', {
            userId: user.userId,
            conversationId: chatContext.conversationId,
            contactId: chatContext.contact.id,
          });
        }
        setChatContext(conversation);
        setOpenedId(conversation.conversationId);
        socket.emit('chat-opened', {
          userId: user.userId,
          conversationId: conversation.conversationId,
          contactId: conversation.contact.id,
        });
      }
      return conversation;
    });
  }, [conversationId]);

  return (
    <Link
      data-testid={conversationData.conversationId}
      className=" hover:no-underline"
      to={`${conversationData.contact.username}`}
    >
      <div
        data-testid={`${conversationData.conversationId}-main`}
        onClick={() => {
          if (!conversationData.isConversationSeen)
            setMessagesCount(messagesCount - 1);
          if (chatContext.conversationId === '') {
            // console.log('First open id:', conversationData.conversationId);
            setChatContext({ ...conversationData });
            setOpenedId(conversationData.conversationId);
            socket.emit('chat-opened', {
              userId: user.userId,
              conversationId: conversationData.conversationId,
              contactId: conversationData.contact.id,
            });
          } else if (
            chatContext.conversationId !== conversationData.conversationId
          ) {
            // console.log('closing id', chatContext.conversationId);
            socket.emit('chat-closed', {
              userId: user.userId,
              conversationId: chatContext.conversationId,
              contactId: chatContext.contact.id,
            });
            setChatContext({ ...conversationData });
            setOpenedId(conversationData.conversationId);
            // console.log('opening id', conversationData.conversationId);
            socket.emit('chat-opened', {
              userId: user.userId,
              conversationId: conversationData.conversationId,
              contactId: conversationData.contact.id,
            });
          }
        }}
        className={`
      ${
        conversationData.conversationId === chatContext.conversationId
          ? 'border-r-2 border-blue'
          : 'bg-white hover:bg-xx-light-gray dark:bg-black  dark:hover:bg-[#16171a]'
      } 
      ${
        !conversationData.isConversationSeen ||
        conversationData.conversationId === chatContext.conversationId
          ? 'bg-xx-light-gray dark:dark:bg-[#16171a]'
          : 'bg-white hover:bg-xx-light-gray dark:bg-black  dark:hover:bg-[#16171a]'
      } 
      flex h-[73.06px] w-full  p-4 pb-3
        `}
      >
        <div className="mr-3 w-fit min-w-[40px]">
          <img
            src={conversationData.contact.imageUrl}
            alt=""
            className="h-10 w-10 rounded-full"
          />
        </div>

        <div className="flex w-full flex-col overflow-clip">
          <div className="flex w-full items-center gap-1 text-center ">
            <div className="w-[50%]  max-w-fit overflow-clip whitespace-nowrap text-base font-bold text-black dark:text-white">
              {conversationData.contact.name}
            </div>
            <div className="w-[50%] max-w-fit overflow-clip whitespace-nowrap text-base text-[#71767B]">
              @{conversationData.contact.username}
            </div>
            <div className="">
              <div className="h-[2px] w-[2px] rounded-full bg-[#71767B]" />
            </div>

            <div
              data-testid={`${conversationData.conversationId}-lastMessage`}
              className="text-base text-[#71767B]"
            >
              {conversationData.lastMessage !== null && (
                <Time sendedTime={conversationData.lastMessage.timestamp} />
              )}
            </div>
          </div>

          <div
            data-testid={`${conversationData.conversationId}-lastMessage`}
            className={` ${
              conversationData.conversationId === chatContext.conversationId ||
              !conversationData.isConversationSeen
                ? ' text-black dark:text-white'
                : 'text-[#71767B]'
            } flex  
          w-full max-w-fit overflow-clip whitespace-nowrap pr-8 text-base`}
          >
            {conversationData.lastMessage !== null && (
              <div>{conversationData.lastMessage.text}</div>
            )}
          </div>
        </div>

        {!conversationData.isConversationSeen && (
          <div
            data-testid={`${conversationData.conversationId}-point`}
            className="h-3 w-3 rounded-full bg-blue"
          />
        )}
      </div>
    </Link>
  );
}

// ConversationCard.propTypes = {
//   conversationData: PropTypes.object.isRequired,
//   userId,
// };

export default ConversationCard;
