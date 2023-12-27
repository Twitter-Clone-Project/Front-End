/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays a notification card with specific information.
 * @param {Object} props - Component props.
 * @param {string} props.notificationId - The ID of the notification.
 * @param {string} props.timestamp - The timestamp of the notification.
 * @param {boolean} props.isSeen - Indicates if the notification has been seen.
 * @param {string} props.content - The content of the notification.
 * @param {string} props.senderImgUrl - The URL of the sender's image.
 * @returns {JSX.Element} JSX representing the notification card.
 * @example
 * ```jsx
 *  <NotificationCard notificationId={notificationId} timestamp={timestamp} isSeen={isSeen} content={content} senderImgUrl={senderImgUrl} />
 * ```
 */

function NotificationCard({
  notificationId,
  timestamp,
  isSeen,
  content,
  senderImgUrl,
}) {
  return (
    <div
      data-testid={`${notificationId}-notificationId`}
      className={`flex min-h-[88px] gap-4 px-3 py-3 hover:bg-[#f7f7f7]
       dark:hover:bg-[#070707] ${
         !isSeen ? 'bg-[#eaf4fd] dark:bg-[#07101f]' : ''
       }`}
    >
      <div className=" h-[30px] min-w-[30px] ">
        <svg
          className="  fill-blue"
          viewBox="0 0 24 24"
        >
          <path d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z" />
        </svg>
      </div>
      <div className="flex flex-grow flex-col">
        <div>
          <img
            src={senderImgUrl}
            alt=""
            className="mb-2 h-8 w-8 rounded-full"
          />
        </div>
        <div className="break-all font-bold">{content}</div>
      </div>
    </div>
  );
}

export default NotificationCard;
NotificationCard.propTypes = {
  /**
   *  The ID of the notification.
   */
  notificationId: PropTypes.string.isRequired,
  /**
   *  The timestamp of the notification.
   */
  timestamp: PropTypes.string.isRequired,
  /**
   *  Indicates if the notification has been seen.
   */
  isSeen: PropTypes.bool.isRequired,
  /**
   *  The content of the notification.
   */
  content: PropTypes.string.isRequired,
  /**
   *  The URL of the sender's image.
   */
  senderImgUrl: PropTypes.string.isRequired,
};
