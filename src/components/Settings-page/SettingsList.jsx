import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import BackBtn from './BackBtn';
import { v4 as uuid4 } from 'uuid';
import PropTypes from 'prop-types';

/**
 * Renders a list of settings options.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.windowWidth - The width of the window.
 * @returns {JSX.Element|null} The rendered SettingsList component.
 * @example
 * ```js
 * <SettingsList windowWidth={window.outerWidth} />
 * ```
 */

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
      <div
        className="h-screen w-full  min-w-[318px] max-w-full flex-col border-l  border-l-x-light-gray dark:border-border-gray dark:bg-black"
        data-testid="SettingsList_0"
      >
        <div className="flex h-[57px] w-full items-center border-b border-b-x-light-gray p-2 dark:border-border-gray">
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
          {list.map((item, index) => (
            <NavLink
              key={uuid4()}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'list-nav-active flex-1 bg-xx-light-gray hover:no-underline dark:bg-[#16181c] '
                  : 'flex-1  hover:no-underline'
              }
              data-testid={`SettingsList_Link_${index}`}
            >
              <div className="flex h-12 w-full justify-between px-4 py-3 hover:bg-xx-light-gray hover:dark:bg-[#16181c] ">
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

SettingsList.propTypes = {
  /**
   * The width of the window.
   */
  windowWidth: PropTypes.number.isRequired,
};

export default SettingsList;
