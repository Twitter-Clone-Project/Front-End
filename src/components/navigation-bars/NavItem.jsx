import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function NavItem({ label, outlinedIcon, filledIcon, path }) {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(3);
  return (
    <div className="flex content-start items-start justify-between p-3 hover:cursor-pointer hover:rounded-full hover:bg-hover-layout">
      <NavLink
        onClick={() => setCount(0)}
        to={path}
        className={({ isActive }) =>
          isActive
            ? 'filled flex flex-1 items-center justify-center font-semibold hover:no-underline'
            : 'outlined flex flex-1 items-center justify-center font-medium hover:no-underline'
        }
      >
        <div className="relative flex-1">
          <svg
            className="inline-block w-[1.75rem]"
            viewBox="0 0 24 24"
          >
            <g>
              <path
                className="outlined fill-pure-black dark:fill-white"
                d={outlinedIcon}
              >
                {' '}
              </path>
              <path
                className="filled fill-pure-black dark:fill-white"
                d={filledIcon}
              >
                {' '}
              </path>
            </g>
          </svg>
          {(label === 'Notifications' || label === 'Messages') &&
            count !== 0 && (
              <span className="absolute right-[-5px] top-[-7px] flex h-5 w-5 items-center justify-center rounded-full bg-blue text-center text-xs font-semibold text-white">
                {count}
              </span>
            )}
        </div>
        <p
          className={`${
            label ? 'px-4' : ''
          } hidden text-xl capitalize tracking-wide
          dark:text-white lg:flex`}
        >
          {label}
        </p>
      </NavLink>
    </div>
  );
}

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  outlinedIcon: PropTypes.string.isRequired,
  filledIcon: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavItem;
