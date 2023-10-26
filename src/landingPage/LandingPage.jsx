import * as React from 'react';
import NewAccountForm from './NewAccountForm';
import Logo from './Logo';

function LandingPage() {
  return (
    <div className="landingPage mx-auto h-screen overflow-auto px-8 dark:bg-pure-black lg:px-16">
      <div className="grid h-screen max-w-xl grid-cols-1 grid-rows-[24px_1fr_56px] flex-col items-start gap-12 py-8 text-black dark:text-white sm:px-28 lg:grid lg:w-full lg:max-w-none lg:grid-cols-2 lg:grid-rows-[1fr_auto] lg:items-center lg:justify-items-center lg:gap-9 lg:p-0">
        <Logo type="bold" />
        <div className="content flex max-w-fit flex-col items-start justify-center gap-10 font-bold">
          <span className="break-words text-5xl font-extrabold sm:text-5xl md:text-6xl">
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
