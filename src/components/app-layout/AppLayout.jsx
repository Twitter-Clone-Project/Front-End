import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../navigation-bars/NavBar';

function AppLayout() {
  return (
    <div className="min-h-full w-full">
      <div className="layout flex h-full min-w-[250px] grid-cols-[auto_1fr] grid-rows-1 sm:grid sm:max-w-[84%] mlg:mx-auto ">
        <NavBar />
        <main className="h-full flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
