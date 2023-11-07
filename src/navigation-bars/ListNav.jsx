import React from 'react';
import { NavLink } from 'react-router-dom';

function ListNav() {
  return (
    <div className="flex h-screen w-full items-center justify-center text-sm font-bold dark:bg-pure-black dark:text-white">
      <div className="flex h-16 w-[50%] items-center justify-between text-center">
        <NavLink
          to="/1"
          className={({ isActive }) =>
            isActive
              ? 'list-nav-active flex-1 text-black hover:no-underline dark:text-white'
              : 'flex-1 text-light-thin hover:no-underline'
          }
        >
          <p className="relative flex-auto p-5 hover:cursor-pointer hover:bg-hover-layout hover:bg-opacity-10">
            <span>Posts</span>
          </p>
        </NavLink>
        <NavLink
          to="/2"
          className={({ isActive }) =>
            isActive
              ? 'list-nav-active flex-1 text-black hover:no-underline dark:text-white'
              : 'flex-1 text-light-thin hover:no-underline'
          }
        >
          <p className="relative flex-auto p-5 hover:cursor-pointer hover:bg-hover-layout hover:bg-opacity-10">
            <span className="flex w-auto flex-col">Replies</span>
          </p>
        </NavLink>
        <NavLink
          to="/3"
          className={({ isActive }) =>
            isActive
              ? 'list-nav-active flex-1 text-black hover:no-underline dark:text-white'
              : 'flex-1 text-light-thin hover:no-underline'
          }
        >
          <p className="relative flex-auto p-5 hover:cursor-pointer hover:bg-hover-layout hover:bg-opacity-10">
            <span>Likes</span>
          </p>
        </NavLink>
      </div>
    </div>
  );
}

export default ListNav;
