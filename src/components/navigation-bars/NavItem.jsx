/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React, { useContext, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChatContext } from '../../hooks/ContactContext';
import { useAuth } from '../../hooks/AuthContext';

/**
 * Represents the navigation items component for the Nav Bar.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 * @example
 * ```jsx
 * <NavItem label="Home"/>
 * ```
 */
function NavItem({ label, outlinedIcon, filledIcon, path, hidden = true }) {
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  const { user } = useAuth();

  const {
    messagesCount,
    notificationsCount,
    setNotificationsCount,
    setChatContext,
    chatContext,
    socket,
  } = useContext(ChatContext);

  const chatContextRef = useRef();
  useEffect(() => {
    chatContextRef.current = chatContext;
  }, [chatContext]);

  return (
    <div className="flex content-start items-start justify-between p-3 hover:cursor-pointer hover:rounded-full hover:bg-light-hover-layout  hover:dark:bg-hover-layout">
      <NavLink
        onClick={() => {
          if (label === 'Notifications') setNotificationsCount(0);
          if (label !== 'Messages') {
            // console.log('close form navitem', socket);
            if (socket === null) return;
            if (
              chatContextRef.current &&
              user &&
              user.userId &&
              chatContextRef.current.conversationId !== '' &&
              chatContextRef.current.contact.id !== ''
            ) {
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
          }
          if (label === 'Messages') {
            if (chatContext.conversationId !== '') {
              socket.emit('chat-closed', {
                userId: user.userId,
                conversationId: chatContext.conversationId,
                contactId: chatContext.contact.id,
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
          }
        }}
        to={path}
        data-testid={label}
        className={({ isActive }) =>
          isActive
            ? 'filled flex flex-1 items-center justify-start font-semibold hover:no-underline'
            : 'outlined flex flex-1 items-center justify-start font-medium hover:no-underline'
        }
      >
        <div className="relative">
          <svg
            className="inline-block w-[1.75rem]"
            viewBox="0 0 24 24"
          >
            <g>
              <path
                className="outlined fill-pure-black dark:fill-white"
                d={outlinedIcon}
              >
                {' '}
              </path>
              <path
                className="filled fill-pure-black dark:fill-white"
                d={filledIcon}
              >
                {' '}
              </path>
            </g>
          </svg>

          {label === 'Notifications' &&
            notificationsCount !== 0 &&
            location.pathname !== '/app/notifications' &&
            location.pathname !== '/app/notifications/all' &&
            location.pathname !== '/app/notifications/mentions' && (
              <span
                className="absolute right-[-5px] top-[-7px] 
              flex h-5 w-5 items-center justify-center rounded-full bg-blue 
              text-center text-xs font-semibold text-white"
              >
                {notificationsCount}
              </span>
            )}
          {label === 'Messages' && messagesCount !== 0 && (
            <span
              className="absolute right-[-5px] top-[-7px] 
              flex h-5 w-5 items-center justify-center rounded-full bg-blue 
              text-center text-xs font-semibold text-white"
            >
              {messagesCount}
            </span>
          )}
        </div>
        <div data-testid={`${label}-text`}>
          <p
            // eslint-disable-next-line no-nested-ternary
            className={`${label ? (hidden ? 'px-4' : 'px-8') : ''} ${
              hidden ? 'hidden' : 'flex'
            } max-w-[150px] truncate text-xl capitalize
          tracking-wide text-pure-black dark:text-white mlg:flex`}
          >
            {label}
          </p>
        </div>
      </NavLink>
    </div>
  );
}

/**
 * The prop types for the NavItem component.
 *
 * @typedef {Object} PropTypes
 * @property {string} label - The label for the navigation item.
 * @property {string} outlinedIcon - The svg path to the outlined icon.
 * @property {string} filledIcon - The svg path to the filled icon.
 * @property {string} path - The url path for the navigation item.
 * @property {boolean} [hidden=true] - Determines if the navigation item label is hidden.
 */

NavItem.defaultProps = {
  hidden: true,
};

NavItem.propTypes = {
  // The label for the navigation item.
  label: PropTypes.string.isRequired,
  // The svg path to the outlined icon.
  outlinedIcon: PropTypes.string.isRequired,
  // The svg path to the filled icon.
  filledIcon: PropTypes.string.isRequired,
  // The url path for the navigation item.
  path: PropTypes.string.isRequired,
  // Determines if the navigation item label is hidden.
  hidden: PropTypes.bool,
};

export default NavItem;
