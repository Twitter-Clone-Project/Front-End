import React from 'react';

function Logo({ type }) {
  return (
    <div className="logo mb-10 flex max-w-[25%] flex-1 basis-2 items-center justify-center align-middle lg:w-full lg:max-w-none ">
      {type === 'bold' ? (
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
      ) : (
        <svg
          width="50%"
          viewBox="0 0 1200 1227"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
            className="fill-black dark:fill-white"
          />
        </svg>
      )}
    </div>
  );
}

export default Logo;
