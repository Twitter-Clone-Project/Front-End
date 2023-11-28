import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v4 as uuid4 } from 'uuid';
import { useAuth } from '../../hooks/AuthContext';
import NavItem from './NavItem';
import UserNavCard from './UserNavCard';
import Logout from './Logout';
import UserImg from './UserImg';

function FloatingHeader({ drawerOpen, show, setDrawerOpen, handleLogout }) {
  const { user } = useAuth();
  const items = [
    {
      path: `./${user.username}`,
      label: 'Profile',
      filledIcon:
        'M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z',
      outlinedIcon:
        'M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z',
    },
    {
      path: './settings',
      label: 'Settings',
      filledIcon:
        'M 10.54 1.75 h 2.92 l 1.57 2.36 c 0.11 0.17 0.32 0.25 0.53 0.21 l 2.53 -0.59 l 2.17 2.17 l -0.58 2.54 c -0.05 0.2 0.04 0.41 0.21 0.53 l 2.36 1.57 v 2.92 l -2.36 1.57 c -0.17 0.12 -0.26 0.33 -0.21 0.53 l 0.58 2.54 l -2.17 2.17 l -2.53 -0.59 c -0.21 -0.04 -0.42 0.04 -0.53 0.21 l -1.57 2.36 h -2.92 l -1.58 -2.36 c -0.11 -0.17 -0.32 -0.25 -0.52 -0.21 l -2.54 0.59 l -2.17 -2.17 l 0.58 -2.54 c 0.05 -0.2 -0.03 -0.41 -0.21 -0.53 l -2.35 -1.57 v -2.92 L 4.1 8.97 c 0.18 -0.12 0.26 -0.33 0.21 -0.53 L 3.73 5.9 L 5.9 3.73 l 2.54 0.59 c 0.2 0.04 0.41 -0.04 0.52 -0.21 l 1.58 -2.36 m 1.07 2 z m 0.39 6.25 C 11 10 10 11 10.025 11.933 s 0.975 2.067 1.968 2.058 c 1.007 0.009 2.007 -0.991 1.968 -2.058 S 13 10 12 10 z',
      outlinedIcon:
        'M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z',
    },
  ];
  return (
    <div
      data-testid="mobile-top-nav"
      className={`fixed left-0  z-20 ${
        show ? 'top-0' : '-top-52'
      } flex w-full justify-center border-b-2 border-border-gray
      bg-opacity-75 px-4 py-1
      transition-all duration-[600ms] dark:bg-pure-black dark:bg-opacity-75 
      dark:text-white sm:hidden`}
    >
      <div className="absolute left-0 top-1/2 my-auto ml-1 flex -translate-y-1/2  items-center justify-center p-1 hover:cursor-pointer hover:rounded-full hover:bg-light-hover-layout hover:dark:bg-hover-layout">
        <button
          onClick={() => setDrawerOpen(true)}
          data-testid="drawer-btn"
          type="submit"
          className="peer relative flex flex-1 items-center justify-between font-semibold"
        >
          <UserImg user={user} />
        </button>
      </div>
      <div
        className={`fixed bottom-0 left-0 right-0 top-0 z-[30000] 
          grid h-screen w-full -translate-x-[200vw] 
          grid-cols-[1fr]
          duration-300 xs:grid-cols-[5fr_2fr] ${
            drawerOpen ? 'translate-x-[0px]' : ''
          }`}
      >
        <div className="flex w-full flex-col items-start justify-between bg-white dark:bg-pure-black dark:text-white">
          <div className="flex flex-col items-start">
            <div
              role="button"
              data-testid="close-drawer-btn"
              tabIndex={-6}
              onKeyDown={() => setDrawerOpen(false)}
              onClick={() => setDrawerOpen(false)}
              className="flex h-10 w-10 items-center justify-center p-2 text-xl text-pure-black hover:cursor-pointer hover:rounded-full hover:bg-light-hover-layout dark:text-white hover:dark:bg-hover-layout"
            >
              <svg
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-pure-black dark:fill-white"
                  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                />
                <path
                  className="fill-pure-black dark:fill-white"
                  d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                />
              </svg>
            </div>
            <UserNavCard />
            {items.map((item) => (
              <NavItem
                key={uuid4()}
                label={item.label}
                filledIcon={item.filledIcon}
                outlinedIcon={item.outlinedIcon}
                path={item.path}
                hidden={false}
              />
            ))}
          </div>
          <Logout handleLogout={handleLogout} />
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, 
          jsx-a11y/no-static-element-interactions */}
        <div
          className="hidden bg-dark-layout bg-opacity-60 transition-colors duration-300 xs:flex"
          data-testid="drawer-overlay"
          onClick={() => {
            setDrawerOpen(false);
          }}
        />{' '}
      </div>
      <div className="mx-auto p-3 hover:cursor-pointer hover:rounded-full hover:bg-light-hover-layout hover:dark:bg-hover-layout sm:hidden">
        <Link to="/">
          <svg
            className="inline-block w-[1.6rem] fill-pure-black dark:fill-white"
            viewBox="0 0 24 24"
          >
            <g>
              <path
                className="fill-pure-black dark:fill-white"
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99
                21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161
                17.52h1.833L7.084 4.126H5.117z"
              >
                {' '}
              </path>
            </g>
          </svg>
        </Link>
      </div>
    </div>
  );
}

FloatingHeader.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default FloatingHeader;
