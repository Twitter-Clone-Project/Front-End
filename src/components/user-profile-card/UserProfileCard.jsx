import React, { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import UserProfileInfo from './UserProfileInfo';
import 'react-photo-view/dist/react-photo-view.css';
import UpdateProfileForm from './UpdateProfileForm';
import PropTypes from 'prop-types';

function UserProfileCard({ user }) {
  console.log(user);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  return (
    <div className="w-full max-w-[600px] dark:text-white">
      {updateFormOpen && (
        <UpdateProfileForm setUpdateFormOpen={setUpdateFormOpen} />
      )}
      <div className="mx-auto flex w-full flex-col">
        <div className="profile-cover max-h-[500px]">
          <div className="object-fill">
            <PhotoProvider maskOpacity={0.5}>
              <PhotoView src={user.bannerUrl}>
                <img
                  className="m-auto aspect-[3/1] max-h-full w-full cursor-pointer object-fill"
                  src={user.bannerUrl}
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
UserProfileCard.propTypes = {};
export default UserProfileCard;
