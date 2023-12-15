import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import BackBtn from './BackBtn';

function SettingsList({ windowWidth }) {
  const list = [
    {
      label: 'Account Info',
      path: `/app/settings/accountinfo`,
    },
    {
      label: 'Change Password',
      path: `/app/settings/changepassword`,
    },
    {
      label: 'Blocked Users',
      path: `/app/settings/blockedusers`,
    },
    {
      label: 'Muted Users',
      path: `/app/settings/mutedusers`,
    },
  ];
  const navigate = useNavigate();

  if (windowWidth > 988 || window.location.pathname === '/app/settings') {
    return (
      <div className="h-screen w-full  min-w-[318px] max-w-full flex-col border-l  border-light-gray dark:border-border-gray dark:bg-black">
        <div className="flex h-[57px] w-full items-center border-b border-light-gray p-2 dark:border-border-gray">
          {windowWidth < 640 && (
            <BackBtn
              onClick={() => {
                navigate(-1);
              }}
            />
          )}
          <p className=" text-xl font-semibold text-black dark:text-white">
            Settings
          </p>
        </div>
        <div className="flex flex-col">
          {list.map((item) => (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'list-nav-active flex-1 bg-xx-light-gray hover:no-underline dark:bg-[#16181c] '
                  : 'flex-1  hover:no-underline'
              }
            >
              <div className="flex h-12 w-full justify-between px-4 py-3">
                <p className=" text-black dark:text-white">{item.label}</p>
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className=" h-[18.75px] w-[18.75px] text-black dark:text-dark-gray"
                  >
                    <g>
                      <path
                        d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    );
  }
}

export default SettingsList;
