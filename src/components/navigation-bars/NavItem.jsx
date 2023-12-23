import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChatContext } from '../../hooks/ContactContext';
import { useAuth } from '../../hooks/AuthContext';

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

  return (
    <div className="flex content-start items-start justify-between p-3 hover:cursor-pointer hover:rounded-full hover:bg-light-hover-layout  hover:dark:bg-hover-layout">
      <NavLink
        onClick={() => {
          if (label === 'Notifications') setNotificationsCount(0);
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
NavItem.defaultProps = {
  hidden: true,
};
NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  outlinedIcon: PropTypes.string.isRequired,
  filledIcon: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
};

export default NavItem;
