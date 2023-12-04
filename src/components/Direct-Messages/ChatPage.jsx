/* eslint-disable react/prop-types */
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import PersonCard from './PersonCard';
import MessagesInput from './MessagesInput';
import Messages from './Messages';
import Header from './Header';
import Button from '../form-controls/Button';
import { ChatContext } from '../../hooks/ContactContext';

// eslint-disable-next-line react/prop-types
function ChatPage({ width, visibility, showArrow, socket }) {
  const [messages, setMessages] = useState([]);
  const [socketMessages, setSocketMessages] = useState([]);
  const [imgVisible, setImgVisible] = useState(false);
  const { chatContext, setChatContext, top, setTop } = useContext(ChatContext);

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
      if (chatContext.conversationId !== '') {
        const response = await fetch(
          `http://${import.meta.env.VITE_API_DOMAIN}conversations/${
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
      }
    };
    fetchData();
  }, [chatContext]);

  useEffect(() => {
    setSocketMessages([]);
  }, [chatContext]);

  // console.log('received', message.conversationId); // ====1
  // console.log('chatContext', chatContext.conversationId); // ====2
  // console.log(
  //   'condiation',
  //   chatContext.conversationId === message.conversationId,
  // );

  const func = useCallback(
    async (message) => {
      setTop({ conversationId: message.conversationId, text: message.text });
      if (chatContext.conversationId === message.conversationId) {
        // console.log('iam inside ');
        setSocketMessages((prevMessages) => [...prevMessages, message]);
      }
    },
    [chatContext.conversationId, setTop],
  );

  useEffect(() => {
    if (socket === null) return;
    socket.on('msg-receive', func);
  }, [chatContext, func, socket]);

  if (visibility) {
    if (chatContext.conversationId !== '') {
      return (
        <div className="flex h-screen w-full  max-w-full flex-col border-x-[1px]  border-[#f6f8f9] dark:border-[#252829] dark:bg-black md:w-[600px]   lg:w-[600px] xl:w-[600px]">
          <Header
            title={chatContext.contact.name}
            path="M13.5 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5zM13 17v-5h-2v5h2zm-1 5.25c5.66 0 10.25-4.59 10.25-10.25S17.66 1.75 12 1.75 1.75 6.34 1.75 12 6.34 22.25 12 22.25zM20.25 12c0 4.56-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12 7.44 3.75 12 3.75s8.25 3.69 8.25 8.25z"
            type="-"
            image={chatContext.contact.imageUrl}
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
                image={chatContext.contact.imageUrl}
                name={chatContext.contact.name}
                tag={chatContext.contact.username}
                date={dayjs(chatContext.contact.createdAt).format('MMMM YYYY')}
                followers={chatContext.contact.followersCount}
                commonFollowers={chatContext.contact.commonFollowers}
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
  width: PropTypes.number.isRequired,
  visibility: PropTypes.bool.isRequired,
};

export default ChatPage;
