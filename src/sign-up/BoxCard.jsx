/* eslint-disable react/prop-types */
import React from 'react';

function BoxCard({ children, classes }) {
  return (
    <div
      className={`relative flex w-full flex-col justify-between rounded-2xl 
      border-[1px] border-light-gray p-12 px-16 text-lg text-black 
      dark:border-none dark:bg-pure-black 
      dark:text-white md:h-[650px] md:w-[600px] ${classes}`}
    >
      {children}
    </div>
  );
}

export default BoxCard;
