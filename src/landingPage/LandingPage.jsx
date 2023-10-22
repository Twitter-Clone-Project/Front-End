import * as React from 'react';

function LandingPage() {
  return (
    <div className="landingPage mx-auto h-screen p-8 lg:px-16">
      <div className="flex h-screen max-w-xl flex-col text-white sm:px-28 lg:w-full lg:max-w-none lg:flex-1 lg:flex-row lg:justify-evenly lg:p-0">
        <div className="mb-10 flex max-w-[30%] basis-2 justify-start lg:max-w-none lg:basis-1/4 ">
          <svg
            width="auto"
            className="p-2"
            viewBox="0 0 1500 1500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
              fill="white"
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
