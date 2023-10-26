/* eslint-disable react/prop-types */
import React from 'react';

function BoxCard({ children }) {
  return (
    <div className="relative flex w-[38%] min-w-[300px] flex-col rounded-lg border-[1px] border-light-gray p-3 dark:border-none dark:bg-black">
      {children}
    </div>
  );
}

export default BoxCard;
