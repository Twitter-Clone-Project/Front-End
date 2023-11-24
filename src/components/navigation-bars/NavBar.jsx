import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import toast from 'react-hot-toast';
import NavItem from './NavItem';
import Button from '../form-controls/Button';
import { useAuth } from '../../hooks/AuthContext';
import OwnToaster from '../OwnToaster';

function NavBar({ items }) {
  const { dispatch, user } = useAuth();
  const handleLogout = async () => {
    try {
      const res = await fetch(
        `http://${import.meta.env.VITE_API_DOMAIN}auth/signout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          origin: true,
          credentials: 'include',
          withCredentials: true,
        },
      );

      const data = await res.json();
      if (data.status === false || data.status === 'error')
        throw new Error(data.message);
      else dispatch({ type: 'LOGOUT' });
    } catch (err) {
      toast(err.message);
    }
  };
  return (
    <div className="flex h-screen w-full items-start  justify-center px-3 dark:bg-pure-black">
      <div className="relative flex h-full flex-1 flex-col items-start justify-between gap-1 text-start lg:min-w-[225px]">
        <div className="hover:bg-hover-layout mb-4 p-3 hover:cursor-pointer hover:rounded-full">
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
        <div className="mt-2 hidden w-[90%] items-center justify-center rounded-full lg:flex">
          <Button
            label="Post"
            backGroundColor="blue"
            backGroundColorDark="blue"
            labelColor="white"
            labelColorDark="white"
            borderColor="none"
            hight="h-[53px]"
          />
        </div>
        <div className="mt-3 flex w-[full] items-center justify-center rounded-full bg-blue p-4 hover:cursor-pointer hover:bg-opacity-90 lg:hidden">
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
        <div className="hover:bg-hover-layout my-6 flex w-full content-start items-start justify-between justify-self-end p-2 hover:cursor-pointer hover:rounded-full">
          <button
            type="submit"
            className="group relative flex flex-1 items-center justify-between font-semibold"
          >
            <div className="flex items-center justify-center">
              <img
                className="flex h-[40px] w-[40px] rounded-full"
                src="https://img.icons8.com/color/48/circled-user-male-skin-type-3--v1.png"
                alt={`${user.name.split(' ')[0]} photo}`}
              />
            </div>
            <p
              className="
                hidden px-4 text-base font-semibold capitalize tracking-wide
              dark:text-white lg:flex lg:flex-1 lg:flex-col lg:items-start"
            >
              {user.name}
              <span className="text-sm font-thin text-light-thin">
                @{user.username}
              </span>
            </p>
            <span className="hidden items-center justify-center px-2 text-xs font-medium tracking-wider dark:text-white lg:flex">
              &bull;&bull;&bull;
            </span>
            <div className="bg-transparent absolute bottom-0 left-0 top-0 z-50 hidden h-full w-full group-focus-within:flex dark:text-white  ">
              <div className="absolute bottom-14 left-0 flex w-64 items-center justify-start rounded-2xl bg-white py-4 shadow-[rgba(100,100,100,0.3)_0px_0.5px_4px] dark:bg-pure-black dark:shadow-[rgba(100,100,100,0.8)_0px_0.5px_4px]">
                <div className="hover:dark:bg-hover-layout flex flex-1 justify-start px-3 hover:bg-x-light-gray  hover:bg-opacity-40 hover:dark:bg-opacity-100">
                  <div
                    role="button"
                    tabIndex={-6}
                    onClick={handleLogout}
                    onKeyDown={handleLogout}
                    className="z-50 flex-1 p-3 text-start"
                  >
                    Log Out @{user.username}
                  </div>
                </div>
                <div className="">
                  <svg
                    viewBox="0 0 24 24"
                    className="absolute -bottom-3 left-5 h-5 w-5 rotate-180 drop-shadow-[rgba(100,100,100,0.5)_1px_-1px_1px] dark:shadow-[rgba(100,100,100,0.3)_0px_0.5px_4px] lg:left-1/2 lg:-translate-x-1/2 "
                  >
                    <g>
                      <path
                        d="M22 17H2L12 6l10 11z"
                        className="fill-white dark:fill-pure-black"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <OwnToaster />
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
