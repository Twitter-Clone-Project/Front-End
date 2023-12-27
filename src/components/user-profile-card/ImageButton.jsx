import React from 'react';
import PropTypes from 'prop-types';
import ToolTip from './ToolTip';

/**
 * ImageButton component represents a button with an image or icon.
 * It provides a tooltip when hovered over.
 *
 * @component
 * @example
 * ```jsx
 * return (
 *   <ImageButton label="Like" onclick={handleLike}>
 *     <img src="like-icon.png" alt="Like" />
 *   </ImageButton>
 * )
 * ```
 */
function ImageButton({ children, label, onclick }) {
  return (
    <ToolTip label={label}>
      <button
        data-testid={label}
        type="button"
        onClick={onclick}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0000005a] bg-opacity-90 hover:bg-[#0000003e]"
      >
        {children}
      </button>
    </ToolTip>
  );
}

ImageButton.propTypes = {
  /**
   * The content of the ImageButton component.
   */
  children: PropTypes.node.isRequired,
  /**
   * The label for the ImageButton component.
   */
  label: PropTypes.string.isRequired,
  /**
   * The function to be called when the ImageButton is clicked.
   */
  onclick: PropTypes.func.isRequired,
};

export default ImageButton;
