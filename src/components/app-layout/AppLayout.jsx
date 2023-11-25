import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../navigation-bars/NavBar';
import { useAuth } from '../../hooks/AuthContext';

function AppLayout() {
  const { user } = useAuth();
  return (
    <div className="min-h-full w-full">
      <div className="layout mx-auto flex  h-full grid-cols-[auto_1fr_auto] grid-rows-1 sm:grid sm:max-w-[84%] ">
        <NavBar />
        <main className="my-[60px] flex-1 sm:my-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
