import React from 'react';
import { NavLink } from 'react-router-dom';
import SettingsHeader from './SettingsHeader';
import { v4 as uuid4 } from 'uuid';

function AccountInfo({ windowWidth }) {
  const list = [
    {
      label: 'Update Your Email',
      path: `/app/settings/accountinfo/email`,
    },
    {
      label: 'Update Your Username',
      path: `/app/settings/accountinfo/updateusername`,
    },
  ];
  return (
    <div>
      <SettingsHeader title="Account Info" />
      <div className="flex flex-col">
        {list.map((item) => (
          <NavLink
            key={uuid4()}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? 'list-nav-active flex-1 bg-xx-light-gray hover:no-underline dark:bg-[#16181c] '
                : 'flex-1  hover:no-underline'
            }
          >
            <div className="flex h-12 w-full justify-between px-4 py-3 hover:bg-xx-light-gray hover:dark:bg-[#16181c]">
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

export default AccountInfo;
