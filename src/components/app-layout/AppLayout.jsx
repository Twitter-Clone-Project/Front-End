import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../navigation-bars/NavBar';

function AppLayout() {
  return (
    <div className="min-h-full w-full">
      <div className="layout flex h-full w-full min-w-[250px] flex-1 gap-3">
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
