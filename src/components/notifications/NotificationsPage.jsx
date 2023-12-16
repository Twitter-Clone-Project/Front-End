import React, { useEffect, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import toast from 'react-hot-toast';
import { ChatContext } from '../../hooks/ContactContext';
import ListNav from '../navigation-bars/ListNav';

function NotificationsPage() {
  const { socket, setNotifications, setSocketNotifications } =
    useContext(ChatContext);
  const location = useLocation();

  useEffect(() => {
    console.log('in Notification page');
    if (
      socket === null ||
      (location.pathname !== '/app/notifications/all' &&
        location.pathname !== '/app/notifications/mentions')
    )
      return;
    socket.on('notification-receive', async (notification) => {
      console.log('Add Notification to the socket list');
      setSocketNotifications((prevSocketNotifications) => [
        ...prevSocketNotifications,
        notification,
      ]);
    });
  }, [socket, location.pathname]);

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
        setNotifications(data.data.notifications);
      } catch (err) {
        toast(err.message);
      }
    };
    fetchData();
  }, []);

  useEffect(
    () => () => {
      setSocketNotifications([]);
    },
    [],
  );

  return (
    <div className="flex h-screen w-full flex-col border-x-[1px] border-[#f6f8f9] dark:border-[#252829]">
      <div>
        <div className="flex h-[53px] items-center px-4 ">
          <div className="py-[2px] text-[20px] font-bold text-black dark:text-white">
            Notificaitons
          </div>
        </div>
      </div>
      <div className="border-b-[1px] border-[#f6f8f9]  dark:border-[#252829]">
        <ListNav
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
