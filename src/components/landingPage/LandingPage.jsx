import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NewAccountForm from './NewAccountForm';
import { useAuth } from '../../hooks/AuthContext';

function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate('/app/', { replace: true });
  }, [navigate, isAuthenticated]);

  return (
    <div className="landingPage mx-auto h-screen overflow-auto px-10 dark:bg-pure-black lg:px-16">
      <Outlet />
      <div className="grid h-screen max-w-xl grid-cols-1 grid-rows-[24px_1fr_56px] flex-col items-start gap-12 py-6 text-black dark:text-white sm:px-28 lg:grid lg:w-full lg:max-w-none lg:grid-cols-2 lg:grid-rows-[1fr_auto] lg:items-center lg:justify-items-center lg:gap-9 lg:p-0">
        <div className="logo mb-6 flex max-w-[15%] basis-2 items-center justify-center align-middle lg:w-full lg:max-w-none ">
          <svg
            width="50%"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            {' '}
            <path
              d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
              className="fill-black dark:fill-white"
            />
          </svg>
        </div>
        <div className="content flex max-w-fit flex-col items-start justify-center gap-6 font-bold">
          <span className="break-words text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Happening now
          </span>
          <p className="text-2xl font-extrabold sm:text-3xl">Join today.</p>
          <NewAccountForm />
        </div>
        <div className="footer self-end justify-self-center p-4 text-sm text-light-thin lg:col-span-2">
          <p>&copy; Copyrights by SWE Front-End Team</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
