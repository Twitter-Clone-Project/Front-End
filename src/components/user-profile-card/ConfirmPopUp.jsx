import React from 'react';
import PropTypes from 'prop-types';

function ConfirmPopUp({ children, classes }) {
  return (
    <div
      data-testid="confim-popup-btn"
      className="absolute bottom-0 left-0 top-0 z-[300] flex h-screen w-full items-center justify-center overflow-auto bg-dark-gray bg-opacity-50"
    >
      <div
        className={`relative mx-auto flex w-[320px] flex-col justify-between 
      overflow-auto rounded-2xl border-[1px]
      border-light-gray bg-white py-4 text-lg 
      text-black dark:border-none dark:bg-pure-black 
      dark:text-white ${classes}`}
      >
        {children}
      </div>
    </div>
  );
}
ConfirmPopUp.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.string.isRequired,
};
export default ConfirmPopUp;
