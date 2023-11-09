import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import NavItem from './NavItem';
import Button from '../form-controls/Button';

function NavBar({ items }) {
  return (
    <div className="flex h-screen w-full items-start  justify-center px-6 dark:bg-pure-black">
      <div className="flex flex-col items-start justify-between gap-1 text-start lg:min-w-[225px]">
        <div className="mb-4 p-3 hover:cursor-pointer hover:rounded-full hover:bg-hover-layout">
          <Link to="/">
            <svg
              className="inline-block w-[1.9rem] fill-pure-black dark:fill-white"
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
        {items.map((item) => (
          <NavItem
            key={uuid4()}
            outlinedIcon={item.outlinedIcon}
            filledIcon={item.filledIcon}
            label={item.label}
            path={item.path}
          />
        ))}
        <div className="mt-3 hidden  w-full flex-1 items-center justify-center rounded-full lg:flex">
          <Button
            label="Post"
            backGroundColor="blue"
            backGroundColorDark="blue"
            labelColor="white"
            labelColorDark="white"
            hight="h-[53px]"
          />
        </div>
        <div className="mt-3 flex w-full items-center justify-center rounded-full bg-blue p-4 hover:cursor-pointer hover:bg-opacity-90 lg:hidden">
          <button
            type="submit"
            className="flex-1"
          >
            <svg
              viewBox="0 0 24 24"
              className="m-auto h-[24px] w-[24px]"
            >
              <g>
                <path
                  className="fill-white"
                  d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
NavBar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      outlinedIcon: PropTypes.string.isRequired,
      filledIcon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
export default NavBar;