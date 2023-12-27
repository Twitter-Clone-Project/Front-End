import React from 'react';
import PropTypes from 'prop-types';

/**
 * UserDetail component displays a user detail with an icon and text.
 */
function UserDetail({ path, children }) {
  return (
    <span className="flex align-middle text-base font-thin text-light-thin">
      <svg
        viewBox="0 0 24 24"
        width="18px"
        className="align-middle"
      >
        <g>
          <path
            className="fill-light-thin align-middle text-xs"
            d={path}
          />
        </g>
      </svg>
      <span className="px-1">{children}</span>
    </span>
  );
}

UserDetail.propTypes = {
  /**
   * The path of the icon to be displayed.
   */
  path: PropTypes.string.isRequired,
  /**
   * The content to be displayed next to the icon.
   */
  children: PropTypes.node.isRequired,
};

export default UserDetail;
