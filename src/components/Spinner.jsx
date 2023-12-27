import React from 'react';

/**
 * Renders a spinner component.
 *
 * @component
 * @example
 * ```jsx
 * return (
 *   <Spinner />
 * )
 * ```
 */
function Spinner() {
  return (
    <div
      className="spinner relative flex h-full w-full flex-col items-center justify-center  
      bg-white p-12 px-24 text-center text-lg text-black dark:border-none 
      dark:bg-pure-black dark:text-white 
      sm:h-[650px] sm:w-[600px] sm:rounded-2xl"
    >
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <div className="loader h-6 w-6" />
      </div>
    </div>
  );
}

export default Spinner;
