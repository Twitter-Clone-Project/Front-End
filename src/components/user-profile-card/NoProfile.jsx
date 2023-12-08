import React from 'react';
import { useParams } from 'react-router';

function NoProfile() {
  const { username: name } = useParams('username');
  return (
    <div
      data-testid="no-profile"
      className="border-x-0 border-border-gray dark:text-white sm:border-x-2"
    >
      <div className="w-full max-w-[600px] dark:text-white">
        <div className="mx-auto flex w-full flex-col">
          <div className="profile-cover max-h-[500px]">
            <div className="object-fill">
              <img
                src={import.meta.env.VITE_DEFAULT_BANNER}
                alt=""
              />
            </div>
          </div>
          <div className="relative cursor-auto bg-white bg-opacity-100 p-4 text-black dark:bg-pure-black dark:text-white">
            <div className="absolute -top-0 z-10 flex aspect-square w-1/4 min-w-[3rem] -translate-y-1/2 justify-between">
              <img
                id="popoverImg"
                src={import.meta.env.VITE_DEFAULT_AVATAR}
                alt=""
                className="h-auto cursor-pointer rounded-full border-4 border-pure-black"
              />
            </div>
            <div className="mb-4 flex min-h-[50px] w-full justify-end">
              <div className="w-[50%] max-w-[8rem]" />
            </div>
            <div className="mb-5 mt-2">
              <div className="flex h-[41.5px] flex-col">
                <span className="text-xl font-bold text-pure-black dark:text-white">
                  @{name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full max-w-[450px] flex-col items-start justify-center gap-4 p-12">
        <p className="break-words  text-3xl font-extrabold dark:text-white">
          This account doesn’t exist
        </p>
        <span className="text-light-thin">Try searching for another.</span>
      </div>
    </div>
  );
}

export default NoProfile;
