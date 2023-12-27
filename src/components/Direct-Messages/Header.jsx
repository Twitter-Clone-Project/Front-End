/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ChatContext } from '../../hooks/ContactContext';
import { useAuth } from '../../hooks/AuthContext';
/**
 * Header component for conversations page and chat page.
 * @component
 * @param {Object} props - The props for the Header component.
 * @param {string} props.title - The title to be displayed in the header.
 * @param {string} props.path - The path for navigation purposes.
 * @param {string} props.type - The type of header component.
 * @param {string} props.image - The URL of the image to display in the header.
 * @param {boolean} props.imgVisible - Determines whether the image is visible.
 * @returns {JSX.Element} JSX for the Header component.
 * @example
 * ```jsx
 *  <ConversationsPage title={title} path={path} type={type} image={image} imgVisible={imgVisible}/>
 * ```
 */

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
      <div
        data-testid={`${type}`}
        className="flex h-[53px] w-full items-center justify-between px-4"
      >
        <div
          data-testid={`${type}-div`}
          className="relative flex"
        >
          {type === '-' &&
            windowWidth < 1024 &&
            chatContext.conversationId !== '' && (
              <Link
                data-testid={`${type}-link`}
                to="/app/messages"
                className="  left-2 top-2 w-fit hover:no-underline"
                onClick={() => {
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

          <div
            data-testid={`${type}-div2`}
            className={`flex gap-2 `}
          >
            {!imgVisible && (
              <img
                data-testid={`${type}-image`}
                src={image}
                alt=""
                className="h-8 w-8 rounded-full"
              />
            )}
            <div
              data-testid={`${type}-lable-logic`}
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
  /**
   *  The title to be displayed in the header.
   */
  title: PropTypes.string.isRequired,
  /**
   *  The path for svg icon.
   */
  path: PropTypes.string.isRequired,
  /**
   *  The type of header component (for chat page or conversation page).
   */
  type: PropTypes.string.isRequired,
  /**
   *  The URL of the image to display in the header.
   */
  image: PropTypes.string.isRequired,
  /**
   *  Determines whether the image is visible
   */
  imgVisible: PropTypes.bool.isRequired,
};

export default Header;
