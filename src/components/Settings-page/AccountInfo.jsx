import React from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import SettingsHeader from './SettingsHeader';

/**
 * Renders the AccountInfo component.it is a child component of SettingsPage that has the navigation links to update email and username.
 *
 * @component
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered AccountInfo component.
 * @example
 * import AccountInfo from './AccountInfo';
 * ```js
 * <AccountInfo />
 * ```
 */

function AccountInfo() {
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
    <div data-testid="AccountInfo_0">
      <SettingsHeader title="Account Info" />
      <div className="flex flex-col">
        {list.map((item, index) => (
          <NavLink
            key={uuid4()}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? 'list-nav-active flex-1 bg-xx-light-gray hover:no-underline dark:bg-[#16181c] '
                : 'flex-1  hover:no-underline'
            }
            data-testid={`AccountInfo_Link_${index}`}
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
