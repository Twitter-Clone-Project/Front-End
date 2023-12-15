import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChatContext } from '../../hooks/ContactContext';
import NotificationCard from './NotificationCard';

export default function Mentions() {
  const { notifications, socketNotifications } = useContext(ChatContext);

  return (
    <div className="overflow-y-auto no-scrollbar">
      {socketNotifications &&
        socketNotifications.map((socketNotification) => (
          <Link
            key={socketNotification.notificationId}
            to={`/app/search/${socketNotification.notificationId}`}
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
        notifications
          .filter((notification) => notification.type === 'mention')
          .map((notification) => (
            <Link
              key={notification.notificationId}
              to={`/app/search/${notification.notificationId}`}
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
