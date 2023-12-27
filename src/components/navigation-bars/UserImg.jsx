import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the user's profile image.
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object containing name and imageUrl.
 * @param {string} props.user.name - The name of the user.
 * @param {string} props.user.imageUrl - The URL of the user's profile image.
 * @returns {JSX.Element} - The rendered UserImg component.
 */
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
  /**
   * The user object containing name and imageUrl.
   */
  user: PropTypes.shape({
    /**
     * The name of the user.
     */
    name: PropTypes.string.isRequired,
    /**
     * The URL of the user's profile image.
     */
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserImg;
