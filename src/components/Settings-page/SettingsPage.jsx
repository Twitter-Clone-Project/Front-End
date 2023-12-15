import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useAuth } from '../../hooks/AuthContext';
import SettingsList from './SettingsList';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import OwnToaster from '../OwnToaster';

function SettingPage() {
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  const navigate = useNavigate();

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
    <div className="h-screen w-full">
      <div className="layout mx-auto h-full grid-cols-[auto_1fr] grid-rows-1 overflow-auto no-scrollbar  dark:bg-black md:grid">
        <div className="">
          <SettingsList windowWidth={windowWidth} />
        </div>
        <div className=" h-screen w-full  max-w-full flex-col border-x-[1px]  border-light-gray dark:border-border-gray dark:bg-black md:w-[600px]   lg:w-[600px] xl:w-[600px]">
          {/* {windowWidth < 988 && window.location.pathname != '/app/settings' && (
            <button
              className=" absolute left-2 top-2"
              type="button"
              onClick={() => {
                navigate('/app/settings');
              }}
            >
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full hover:bg-[#e7e7e7] dark:hover:bg-[#181919]">
                <svg
                  className="h-5 w-5 fill-black dark:fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
                </svg>
              </div>
            </button>
          )} */}
          <Outlet />
          <OwnToaster />
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
