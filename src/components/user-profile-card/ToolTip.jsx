import React from 'react';
import PropTypes from 'prop-types';

/**
 * ToolTip component displays a tooltip with a label when hovered over.
 *
 * @component
 * @example
 * ```jsx
 * return (
 *   <ToolTip label="Tooltip Label">
 *     <button>Hover Me</button>
 *   </ToolTip>
 * )
 * ```
 */
function ToolTip({ children, label }) {
  return (
    <div
      data-testid={label}
      className="group relative w-max"
    >
      {children}
      <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-dark-gray bg-opacity-50 px-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
}

ToolTip.propTypes = {
  /**
   * The content to be displayed inside the ToolTip component.
   */
  children: PropTypes.node.isRequired,
  /**
   * The label text to be displayed in the tooltip.
   */
  label: PropTypes.string.isRequired,
};

export default ToolTip;
