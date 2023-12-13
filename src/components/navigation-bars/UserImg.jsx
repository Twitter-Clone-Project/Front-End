import React from 'react';
import PropTypes from 'prop-types';

function UserImg({ user }) {
  return (
    <div className="flex items-center justify-center">
      <img
        className="flex h-8 w-8 rounded-full"
        src={user.imageUrl || import.meta.env.VITE_DEFAULT_AVATAR}
        alt={`${user.name.split(' ')[0]} photo}`}
      />
    </div>
  );
}

UserImg.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};
export default UserImg;
