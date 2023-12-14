import React, { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import io from 'socket.io-client';
import { useAuth } from '../../hooks/AuthContext';
import { ChatContext } from '../../hooks/ContactContext';

import NavBar from '../navigation-bars/NavBar';

function AppLayout() {
  const { user } = useAuth();
  const { setSocket } = useContext(ChatContext);

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_SOCKET_DOMAIN}`);
    newSocket.on('connect', () => {
      newSocket.emit('add-user', { userId: user.userId });
    });
    setSocket(newSocket);
    return () => {
      if (newSocket.connected) {
        newSocket.disconnect();
      }
    };
  }, [user.userId]);

  return (
    <div className="min-h-full w-full">
      <div className="layout flex h-full w-full min-w-[250px] flex-1">
        <div className="relative ml-auto">
          <NavBar />
        </div>
        <main className="flex h-full flex-1 justify-start  md:w-[600px] lg:w-[990px] 2xl:w-[1100px] mlg:w-[920]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
