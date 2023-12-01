import React from 'react';
import PropTypes from 'prop-types';

function ToolTip({ children, label }) {
  return (
    <div className="group relative w-max">
      {children}
      <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-dark-gray bg-opacity-50 px-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
}
ToolTip.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default ToolTip;
