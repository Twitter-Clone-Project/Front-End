import React from 'react';
import PropTypes from 'prop-types';

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
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default UserDetail;
