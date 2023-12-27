import React from 'react';
import PropTypes from 'prop-types';

/**
 * ConfirmPopUp Component
 *
 * A reusable component that displays a confirmation popup.
 *
 * @component
 * @example
 * ```jsx
 * return (
 *   <ConfirmPopUp classes="custom-class">
 *     Are you sure you want to delete this item?
 *   </ConfirmPopUp>
 * )
 * ```
 */
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
  /**
   * The content to be displayed inside the confirmation popup.
   */
  children: PropTypes.node.isRequired,

  /**
   * Additional CSS classes to be applied to the confirmation popup.
   */
  classes: PropTypes.string.isRequired,
};

export default ConfirmPopUp;
