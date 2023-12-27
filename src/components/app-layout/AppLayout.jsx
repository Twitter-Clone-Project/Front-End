import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import io from 'socket.io-client';
import NavBar from '../navigation-bars/NavBar';
import { ChatContext } from '../../hooks/ContactContext';
import { useAuth } from '../../hooks/AuthContext';

function AppLayout() {
  const { user, token } = useAuth();
  const { setSocket } = useContext(ChatContext);

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_SOCKET_DOMAIN}`, {
      origin: true,
      credentials: 'include',
      withCredentials: true,
      extraHeaders: {
        token,
      },
    });
    newSocket.on('connect', () => {
      newSocket.emit('add-user', { userId: user.userId });
    });
    setSocket(newSocket);
    return () => {
      if (newSocket.connected) {
        newSocket.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-full w-full">
      <div className="layout mx-auto flex  h-full w-full min-w-[250px] flex-1 justify-center">
        <div className="relative">
          <NavBar />
        </div>
        <main className="flex h-full justify-start  md:w-[600px] lg:w-[990px] 2xl:w-[1100px] mlg:w-[920]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
