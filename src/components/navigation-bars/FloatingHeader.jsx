import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function FloatingHeader({ drawerOpen, show, setDrawerOpen }) {
  return (
    <div
      className={`fixed left-0  z-20 ${
        show ? 'top-0' : '-top-52'
      } flex w-full justify-center border-b-2 border-border-gray
        bg-opacity-75 px-4 py-1 transition-all
      duration-[600ms] dark:bg-pure-black dark:bg-opacity-75 dark:text-white
      sm:hidden`}
    >
      <div className="fixed left-0 top-0 flex items-center justify-center p-2 hover:cursor-pointer hover:rounded-full hover:bg-hover-layout">
        <button
          onClick={() => setDrawerOpen(true)}
          type="submit"
          className="peer relative flex flex-1 items-center justify-between font-semibold"
        >
          <div className="flex items-center justify-center">
            <img
              className="flex h-[40px] w-[40px] rounded-full"
              src="https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2023/06/1280/1280/084702d2-messi1.jpg?ve=1&tl=1"
              alt="user"
            />
          </div>
        </button>
      </div>
      <div
        className={`fixed bottom-0 left-0 right-0 top-0 z-[30000] grid h-screen 
          w-full -translate-x-full 
          grid-cols-[5fr_3fr] duration-300 ${
            drawerOpen ? 'translate-x-0' : ''
          }`}
      >
        <div className="bg-pure-black">
          <div>Remaining...</div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, 
          jsx-a11y/no-static-element-interactions */}
        <div
          className="bg-dark-layout bg-opacity-60 transition-colors duration-300"
          onClick={() => {
            setDrawerOpen(false);
          }}
        />{' '}
      </div>
      <div className="mx-auto p-3 hover:cursor-pointer hover:rounded-full hover:bg-hover-layout sm:hidden">
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
};

export default FloatingHeader;
