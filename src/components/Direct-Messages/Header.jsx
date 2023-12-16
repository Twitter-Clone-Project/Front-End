import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ChatContext } from '../../hooks/ContactContext';
import { useAuth } from '../../hooks/AuthContext';

function Header({ title, path, type, image, imgVisible }) {
  const { user } = useAuth();
  const { chatContext, setChatContext, socket } = useContext(ChatContext);
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
  return (
    <div>
      <div className="flex h-[53px] w-full items-center justify-between px-4">
        <div className="relative flex">
          {type === '-' &&
            windowWidth < 1024 &&
            chatContext.conversationId !== '' && (
              <Link
                to="/app/messages"
                className="  left-2 top-2 w-fit hover:no-underline"
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
                <div
                  className={`  
                      left-0 flex h-[34px]  w-[34px] items-center  justify-start
                    hover:bg-[#e7e7e7] dark:hover:bg-[#181919]`}
                >
                  <svg
                    className="h-5 w-5  fill-black   dark:fill-white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
                  </svg>
                </div>
              </Link>
            )}

          <div className={`flex gap-2 `}>
            {!imgVisible && (
              <img
                src={image}
                alt=""
                className="h-8 w-8 rounded-full"
              />
            )}
            <div
              className={`${
                type !== 'Messages' ? 'text-[17px] ' : 'text-[20px] '
              }
            py-[2px] pt-1 font-bold dark:text-white`}
            >
              {title}
            </div>
          </div>
        </div>

        <Link
          style={{ textDecoration: 'inherit' }}
          to={type === '-' ? 'info' : 'compose'}
        >
          <button type="button">
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full hover:bg-[#e7e7e7] dark:hover:bg-[#181919]">
              <svg
                className="h-5 w-5 fill-black dark:fill-white"
                viewBox="0 0 24 24"
              >
                <path d={path} />
              </svg>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imgVisible: PropTypes.bool.isRequired,
};

export default Header;
