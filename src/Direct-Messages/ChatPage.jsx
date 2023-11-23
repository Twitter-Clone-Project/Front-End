import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PersonCard from './PersonCard';
import MessagesInput from './MessagesInput';
import Messages from './Messages';
import Header from './Header';

function ChatPage({ selectedTag }) {
  const [messages, setMessages] = useState([]);
  const [info, setInfo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedTag !== '') {
        const response = await fetch(
          `http://localhost:3000/information?tag=${selectedTag}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setInfo(data);
      }
    };

    fetchData();
  }, [selectedTag]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedTag !== '') {
        const response = await fetch(
          `http://localhost:3000/messages?tag=${selectedTag}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setMessages(data);
      }
    };

    fetchData();
  }, [selectedTag]);

  if (info) {
    return (
      <div className=" flex h-screen w-full    max-w-full flex-col  border-x-[1px] border-[#f6f8f9] dark:border-[#252829] dark:bg-black">
        <Header
          title={info.name}
          path="M13.5 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5zM13 17v-5h-2v5h2zm-1 5.25c5.66 0 10.25-4.59 10.25-10.25S17.66 1.75 12 1.75 1.75 6.34 1.75 12 6.34 22.25 12 22.25zM20.25 12c0 4.56-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12 7.44 3.75 12 3.75s8.25 3.69 8.25 8.25z"
          type="-"
        />
        <div
          className="
        flex flex-grow flex-col overflow-y-auto px-4 scrollbar-thin scrollbar-track-[#f9f9f9] 
        scrollbar-thumb-[#c0c0c0]
        scrollbar-thumb-rounded-full hover:scrollbar-thumb-[#7b7b7b] dark:scrollbar-track-[#272727] dark:scrollbar-thumb-[#606060] dark:hover:scrollbar-thumb-[#888888]"
        >
          <div>
            <PersonCard
              image={info.image}
              name={info.name}
              tag={info.tag}
              date={info.date}
              followers={info.followers}
              followerImage={info.followerImage}
              followerName={info.followerName}
            />
          </div>
          <Messages messages={messages} />
        </div>
        <div>
          <MessagesInput
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      </div>
    );
  }
}

ChatPage.propTypes = {
  selectedTag: PropTypes.string.isRequired,
};

export default ChatPage;
