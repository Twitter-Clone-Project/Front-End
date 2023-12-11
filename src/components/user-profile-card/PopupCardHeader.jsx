import React from 'react';
import PropTypes from 'prop-types';

function PopupCardHeader({ children, footer }) {
  return (
    <div className="flex h-full w-full items-center">
      <div
        className={`fixed z-[100] flex h-[54.5px] w-[calc(100%-1rem-1px)] flex-1
        items-center justify-between bg-white bg-opacity-70 px-4 py-2
        dark:bg-pure-black md:w-[598px] ${
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
  children: PropTypes.node.isRequired,
  footer: PropTypes.bool,
};

export default PopupCardHeader;
