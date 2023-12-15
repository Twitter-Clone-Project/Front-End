import React from 'react';
import PropTypes from 'prop-types';
import ToolTip from './ToolTip';

function ImageButton({ children, label, onclick }) {
  return (
    <ToolTip label={label}>
      <button
        data-testid={label}
        type="button"
        onClick={onclick}
        className=" flex h-12 w-12 items-center justify-center rounded-full bg-[#0000005a] bg-opacity-90 hover:bg-[#0000003e]"
      >
        {children}
      </button>
    </ToolTip>
  );
}

ImageButton.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  onclick: PropTypes.func.isRequired,
};

export default ImageButton;
