/* eslint-disable react/prop-types */
import React, { useRef, useState, useContext } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useAuth } from '../../hooks/AuthContext';
import { ChatContext } from '../../hooks/ContactContext';

function MessagesInput({ socketMessages, setSocketMessages, socket }) {
  const { user } = useAuth();
  const { chatContext, setTop } = useContext(ChatContext);
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState('');
  const buttonRef = useRef();

  const addEmoji = (event) => {
    setMessage(message + event.native);
  };

  const handleClick = () => {
    if (socket === null || message === '') return;

    const newMessage = {
      conversationId: chatContext.conversationId,
      senderId: user.userId,
      receiverId: chatContext.contact.id,
      text: message,
    };
    setTop({
      conversationId: chatContext.conversationId,
      text: message,
    });
    socket.emit('msg-send', newMessage);

    setSocketMessages([
      ...socketMessages,
      {
        messageId: '0',
        text: message,
        isFromMe: true,
        isSeen: false,
        time: dayjs().format('YYYY-MM-DD HH:mm:ssZ'),
      },
    ]);
    setMessage('');
  };

  return (
    <div className="flex h-14 w-full flex-col items-center border-t-[1px] border-[#f6f8f9] bg-white px-3 dark:border-[#252829] dark:bg-black">
      <div className="relative my-1 flex h-11 w-full flex-row items-center rounded-2xl bg-[#f0f3f3] p-1 dark:bg-[#1e2023] ">
        {showEmoji && (
          <div className="absolute bottom-[100%] left-2">
            <Picker
              data={data}
              onEmojiSelect={addEmoji}
            />
          </div>
        )}
        <div className="flex flex-row">
          <button
            className=""
            type="button"
          >
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full hover:bg-blue-light dark:hover:bg-[#262f3b]">
              <svg
                className="h-5 w-5 fill-blue"
                viewBox="0 0 24 24"
              >
                <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z" />
              </svg>
            </div>
          </button>

          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full hover:bg-blue-light dark:hover:bg-[#262f3b]">
            <svg
              className="h-5 w-5 fill-blue"
              viewBox="0 0 24 24"
            >
              <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z" />
            </svg>
          </div>
          <button
            onClick={() => {
              setShowEmoji(!showEmoji);
            }}
            type="button"
          >
            <div className=" flex h-[34px]  w-[34px] items-center justify-center rounded-full hover:bg-blue-light dark:hover:bg-[#262f3b]">
              <svg
                className="h-5 w-5 fill-blue"
                viewBox="0 0 24 24"
              >
                <path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z" />
              </svg>
            </div>
          </button>
        </div>

        <div className="flex w-full px-3 py-1">
          <input
            placeholder="Start a new message"
            value={message}
            onClick={() => {
              setShowEmoji(false);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                buttonRef.current.click();
              }
            }}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            className="h-6 w-full bg-[#f0f3f3] py-[2px]  text-sm outline-none dark:bg-[#1e2023] dark:text-white"
          />
        </div>

        <button
          ref={buttonRef}
          type="button"
          onClick={handleClick}
        >
          <div
            className={` ${
              message === ''
                ? 'cursor-default'
                : ' hover:bg-blue-light dark:hover:bg-[#262f3b]'
            } 
          flex h-[34px] w-[34px] items-center justify-center rounded-full`}
          >
            <svg
              className={`h-5 w-5 fill-blue ${
                message === '' ? 'opacity-50' : 'opacity-100'
              } `}
              viewBox="0 0 24 24"
            >
              <path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}

MessagesInput.propTypes = {
  socketMessages: PropTypes.array.isRequired,
  setSocketMessages: PropTypes.func.isRequired,
};

export default MessagesInput;
