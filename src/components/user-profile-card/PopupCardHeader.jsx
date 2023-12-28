/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the header component for the popup card.
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the header.
 * @param {boolean} props.footer - Determines if the header is for the footer section.
 * @returns {JSX.Element} - The rendered component.
 */
function PopupCardHeader({ children, footer }) {
  return (
    <div className="flex h-full w-full items-center">
      <div
        className={`fixed z-[100] flex h-[54.5px] w-[calc(100%-1rem-1px)] flex-1
        items-center justify-between bg-white bg-opacity-70 px-4 py-2
        dark:bg-pure-black md:w-[calc(615px-1rem-1px)] ${
          footer ? 'md:rounded-bl-2xl' : 'md:rounded-tl-2xl'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

PopupCardHeader.defaultProps = {
  footer: false,
};

PopupCardHeader.propTypes = {
  /**
   * The content to be rendered inside the header.
   */
  children: PropTypes.node.isRequired,
  /**
   * Determines if the header is for the footer section.
   */
  footer: PropTypes.bool,
};

export default PopupCardHeader;
