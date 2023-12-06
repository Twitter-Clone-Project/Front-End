import React from 'react';

function AccountInfo({ windowWidth }) {
  if (visible) {
    return (
      <div>
        <div className=" flex h-[53px] w-full items-center border-b border-[#f6f8f9] px-4 dark:border-border-gray">
          {windowWidth < 988 && (
            <button
              className="mr-3"
              type="button"
              onClick={() => {
                navigate(-1);
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
          )}
          <p className=" text-xl font-bold text-black dark:text-white">
            Settings
          </p>
        </div>
      </div>
    );
  }
}

export default AccountInfo;
