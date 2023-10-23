import * as React from 'react';

function LandingPage() {
  return (
    <div className="landingPage mx-auto h-screen bg-pure-black p-8 lg:px-16">
      <div className="flex h-screen max-w-xl flex-col text-black dark:text-white sm:px-28 lg:w-full lg:max-w-none lg:flex-1 lg:flex-row lg:justify-evenly lg:p-0">
        <div className="mb-10 flex max-w-[10%] basis-2 justify-start lg:max-w-none lg:basis-1/4 ">
          <svg
            width="95%"
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
        <div className="flex max-w-fit flex-col items-start justify-center gap-10 font-bold">
          <span className="break-words text-5xl font-extrabold sm:text-5xl md:text-6xl">
            Happening now
          </span>
          <p className="text-2xl font-extrabold sm:text-3xl">Join today.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
