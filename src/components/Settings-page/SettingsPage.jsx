import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/AuthContext';
import SettingsList from './SettingsList';
import OwnToaster from '../OwnToaster';

/**
 * Represents the SettingsPage component. it renders the settings page.
 * @component
 * @returns {JSX.Element} The rendered component.
 * @example
 * import SettingsPage from './SettingsPage';
 * ```js
 * <SettingsPage />
 * ```
 */

function SettingPage() {
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.outerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div
      className="h-screen w-full"
      data-testid="SettingPage_HomeSetteingPage_0"
    >
      <div className="layout mx-auto h-full grid-cols-[auto_1fr] grid-rows-1 overflow-auto no-scrollbar  dark:bg-black md:grid">
        <div className="">
          <SettingsList windowWidth={windowWidth} />
        </div>
        <div className=" h-screen w-full  max-w-full flex-col border-x-[1px]  border-x-x-light-gray dark:border-border-gray dark:bg-black md:w-[600px]   lg:w-[600px] xl:w-[600px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
