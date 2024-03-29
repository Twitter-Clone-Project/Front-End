/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChatContext } from '../../hooks/ContactContext';
import NotificationCard from './NotificationCard';

/**
 * Renders notifications based on socket notifications and api notifications.
 * @component
 * @returns {JSX.Element} JSX representing the notifications.
 * @example
 * ```jsx
 *  <All />
 * ```
 */

export default function All() {
  const { notifications, socketNotifications } = useContext(ChatContext);

  return (
    <div
      data-testid="all-page"
      className="overflow-y-auto no-scrollbar"
    >
      {socketNotifications &&
        socketNotifications.map((socketNotification) => (
          <Link
            data-testid={`${socketNotification.notificationId}-socketNoti`}
            key={socketNotification.notificationId}
            to={
              socketNotification.type === 'FOLLOW' ||
              socketNotification.type === 'UNFOLLOW'
                ? `/app/${socketNotification.senderUsername}/posts`
                : socketNotification.type === 'MENTION'
                ? `/app/tweets/${socketNotification.tweetId}`
                : '/app/home'
            }
            className="text-black  hover:no-underline  dark:text-white"
          >
            <NotificationCard
              key={socketNotification.notificationId}
              notificationId={socketNotification.notificationId}
              timestamp={socketNotification.timestamp}
              isSeen={socketNotification.isSeen}
              content={socketNotification.content}
              senderImgUrl={socketNotification.senderImgUrl}
            />
          </Link>
        ))}
      {notifications &&
        notifications.map((notification) => (
          <Link
            data-testid={`${notification.notificationId}-Noti`}
            key={notification.notificationId}
            to={
              notification.type === 'FOLLOW' || notification.type === 'UNFOLLOW'
                ? `/app/${notification.senderUsername}/posts`
                : notification.type === 'MENTION'
                ? `/app/tweets/${notification.tweetId}`
                : '/app/home'
            }
            className="text-black  hover:no-underline  dark:text-white"
          >
            <NotificationCard
              key={notification.notificationId}
              notificationId={notification.notificationId}
              timestamp={notification.timestamp}
              isSeen={notification.isSeen}
              content={notification.content}
              senderImgUrl={notification.senderImgUrl}
            />
          </Link>
        ))}
    </div>
  );
}
