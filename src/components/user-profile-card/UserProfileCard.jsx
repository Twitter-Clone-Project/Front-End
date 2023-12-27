/* eslint-disable max-len */
import React, { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import UserProfileInfo from './UserProfileInfo';
import 'react-photo-view/dist/react-photo-view.css';
import UpdateProfileForm from './UpdateProfileForm';

/**
 * UserProfileCard Component
 *
 * This component displays the user profile card, including the user's cover photo, profile information, and an option to update the profile.
 *
 * Props:
 * - user: The user object containing the user's banner URL and username. (Required)
 *
 * Usage:
 * <UserProfileCard user={user} />
 */
function UserProfileCard({ user }) {
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      data-testid={`${user.username}-card`}
      className="w-full max-w-[600px] dark:text-white"
    >
      {updateFormOpen && (
        <UpdateProfileForm setUpdateFormOpen={setUpdateFormOpen} />
      )}
      <div className="mx-auto flex w-full flex-col">
        <div className="profile-cover max-h-[500px]">
          <div className="grid max-w-full grid-cols-[1fr] grid-rows-1 overflow-hidden object-fill">
            {isLoading && (
              <Skeleton
                sx={{ bgcolor: 'grey.900', aspectRatio: '3/1' }}
                animation="wave"
                variant="rectangular"
                height={200}
              />
            )}
            <PhotoProvider maskOpacity={0.5}>
              <PhotoView
                src={user.bannerUrl || import.meta.env.VITE_DEFAULT_BANNER}
              >
                <img
                  className={`m-auto aspect-[3/1] max-h-full ${
                    isLoading ? 'hidden' : ''
                  } w-full cursor-pointer bg-white object-fill
                  dark:bg-pure-black`}
                  data-testid="user-cover"
                  onLoad={() => setIsLoading(false)}
                  src={user.bannerUrl || import.meta.env.VITE_DEFAULT_BANNER}
                  alt="cover"
                />
              </PhotoView>
            </PhotoProvider>
          </div>
        </div>
        <UserProfileInfo
          user={user}
          setUpdateFormOpen={setUpdateFormOpen}
        />
      </div>
    </div>
  );
}

UserProfileCard.propTypes = {
  /**
   * The user object containing the user's banner URL and username.
   */
  user: PropTypes.shape({
    bannerUrl: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfileCard;
