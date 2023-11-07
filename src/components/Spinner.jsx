import React from 'react';

function Spinner() {
  return (
    <div
      className="spinner relative flex w-full flex-col items-center justify-center rounded-2xl border-[1px] 
      border-light-gray p-12 px-24 text-center text-lg text-black 
      dark:border-none dark:bg-pure-black 
      dark:text-white md:h-[650px] md:w-[600px]"
    >
      <div className="loader h-10 w-10" />
    </div>
  );
}

export default Spinner;
