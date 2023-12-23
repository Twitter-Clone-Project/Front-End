import React, { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/AuthContext';
import { ChatContext } from '../../hooks/ContactContext';
import ListNav from '../navigation-bars/ListNav';

function NotificationsPage() {
  const {
    socket,
    setNotifications,
    setSocketNotifications,
    setNotificationsCount,
  } = useContext(ChatContext);
  const { user } = useAuth();

  useEffect(() => {
    // console.log('in Notification page');
    if (socket === null) return;
    const notificationListener = (notification) => {
      socket.emit('mark-notifications-as-seen', { userId: user.userId });
      // console.log('Add Notification to the socket list');
      setSocketNotifications((prevSocketNotifications) => [
        ...prevSocketNotifications,
        notification,
      ]);
    };
    socket.on('notification-receive', notificationListener);
    return () => {
      socket.off('notification-receive', notificationListener);
    };
  }, [socket]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}notifications`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        if (res.status === 404) return;
        const data = await res.json();
        if (data.status === false) {
          throw new Error(data.message);
        }
        console.log(data.data);
        setNotifications(data.data.notifications);
        setSocketNotifications([]);
        socket.emit('mark-notifications-as-seen', { userId: user.userId });
      } catch (err) {
        toast(err.message);
      }
    };
    fetchData();

    return () => {
      if (socket === null) return;
      setNotificationsCount(0);
    };
  }, []);

  useEffect(
    () => () => {
      setSocketNotifications([]);
    },
    [],
  );

  return (
    <div
      data-testid="notifications-page"
      className="flex h-screen w-full flex-col border-x-[1px] border-[#f6f8f9] dark:border-[#252829]"
    >
      <div>
        <div className="flex h-[53px] items-center px-4 ">
          <div className="py-[2px] text-[20px] font-bold text-black dark:text-white">
            Notificaitons
          </div>
        </div>
      </div>
      <div className="border-b-[1px] border-[#f6f8f9]  dark:border-[#252829]">
        <ListNav
          data-testid="notifications-page-list-nav"
          items={[
            { label: 'All', path: '/app/notifications/all' },
            { label: 'Mentions', path: '/app/notifications/mentions' },
          ]}
        />
      </div>
      <Outlet />
    </div>
  );
}

export default NotificationsPage;