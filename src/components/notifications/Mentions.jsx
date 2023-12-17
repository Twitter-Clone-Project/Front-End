import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChatContext } from '../../hooks/ContactContext';
import NotificationCard from './NotificationCard';

export default function Mentions() {
  const { notifications, socketNotifications } = useContext(ChatContext);

  return (
    <div
      data-testid="metions"
      className="overflow-y-auto no-scrollbar"
    >
      {socketNotifications &&
        socketNotifications
          .filter((notification) => notification.type === 'mention')
          .map((socketNotification) => (
            <Link
              data-testid={`${socketNotification.notificationId}-socketN`}
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
              data-testid={`${notification.notificationId}-N`}
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
