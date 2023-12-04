/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import PersonCard from './PersonCard';
import MessagesInput from './MessagesInput';
import Messages from './Messages';
import Header from './Header';
import Button from '../form-controls/Button';

// eslint-disable-next-line react/prop-types
function ChatPage({
  selectedConversationId,
  width,
  visibility,
  showArrow,
  socket,
  userId,
  contact,
}) {
  const [messages, setMessages] = useState([]);
  const [socketMessages, setSocketMessages] = useState([]);
  const [imgVisible, setImgVisible] = useState(0);

  const imgRef = useRef(null);

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

  useEffect(() => {
    const fetchData = async () => {
      if (selectedConversationId !== '') {
        const response = await fetch(
          `http://${
            import.meta.env.VITE_API_DOMAIN
          }conversations/${selectedConversationId}/history`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const Json = await response.json();
        setMessages(Json.data.messages);
      }
    };
    fetchData();
  }, [selectedConversationId]);

  useEffect(() => {
    if (socket === null) return;
    socket.on('msg-receive', async (message) => {
      setSocketMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);

  if (visibility) {
    if (contact) {
      return (
        <div className="flex h-screen w-full  max-w-full flex-col border-x-[1px]  border-[#f6f8f9] dark:border-[#252829] dark:bg-black md:w-[600px]   lg:w-[600px] xl:w-[600px]">
          <Header
            title={contact.name}
            path="M13.5 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5zM13 17v-5h-2v5h2zm-1 5.25c5.66 0 10.25-4.59 10.25-10.25S17.66 1.75 12 1.75 1.75 6.34 1.75 12 6.34 22.25 12 22.25zM20.25 12c0 4.56-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12 7.44 3.75 12 3.75s8.25 3.69 8.25 8.25z"
            type="-"
            image={contact.imageUrl}
            imgVisible={imgVisible}
            showArrow={showArrow}
          />
          <div
            onScroll={handleScroll}
            className="
        flex flex-grow flex-col overflow-y-auto px-4 scrollbar-thin scrollbar-track-[#f9f9f9] 
        scrollbar-thumb-[#c0c0c0]
        scrollbar-thumb-rounded-full hover:scrollbar-thumb-[#7b7b7b] dark:scrollbar-track-[#272727] dark:scrollbar-thumb-[#4a4a4a] dark:hover:scrollbar-thumb-[#888888]"
          >
            <div>
              <PersonCard
                image={contact.imageUrl}
                name={contact.name}
                tag={contact.username}
                date={dayjs(contact.createdAt).format('MMMM YYYY')}
                followers={contact.followersCount}
                commonFollowers={contact.commonFollowers}
                followerImage={contact.username}
                followerName={contact.username}
                imgRef={imgRef}
              />
            </div>
            <Messages
              messages={messages}
              socketMessages={socketMessages}
            />
          </div>
          <div>
            <MessagesInput
              socket={socket}
              socketMessages={socketMessages}
              setSocketMessages={setSocketMessages}
              selectedConversationId={selectedConversationId}
              userId={userId}
              receiverId={contact.id}
            />
          </div>
        </div>
      );
    }
    if (width > 768) {
      return (
        <div
          className=" lg:w-[600px ]md:min-w-[600px]  flex h-screen min-w-[600px] flex-col  justify-center 
           border-x-[1px] border-[#f6f8f9] dark:border-[#252829]
        dark:bg-black dark:text-white
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
            <Button
              backGroundColor="blue"
              borderColor="none"
              label="New Message"
              labelColor="white"
              width="w-[179px]"
            />
          </div>
        </div>
      );
    }
  }
}
ChatPage.propTypes = {
  selectedConversationId: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  visibility: PropTypes.bool.isRequired,
};

export default ChatPage;
