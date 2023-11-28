import React from 'react';
import PropTypes from 'prop-types';

function UserImg({ user }) {
  return (
    <div className="flex items-center justify-center">
      <img
        className="flex h-8 w-8 rounded-full"
        src="https://img.icons8.com/color/48/circled-user-male-skin-type-3--v1.png"
        alt={`${user.name.split(' ')[0]} photo}`}
      />
    </div>
  );
}

UserImg.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
export default UserImg;
