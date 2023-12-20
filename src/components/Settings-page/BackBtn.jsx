import React from 'react';
import PropTypes from 'prop-types';

function BackBtn({ onClick }) {
  return (
    <div
      role="button"
      data-testid="close-drawer-btn"
      tabIndex={-6}
      onKeyDown={onClick}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center p-2 text-xl text-pure-black hover:cursor-pointer hover:rounded-full hover:bg-light-hover-layout dark:text-white hover:dark:bg-hover-layout"
    >
      <svg
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-pure-black dark:fill-white"
          d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
        />
        <path
          className="fill-pure-black dark:fill-white"
          d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
        />
      </svg>
    </div>
  );
}
BackBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default BackBtn;
