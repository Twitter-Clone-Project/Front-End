import React, { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import UserProfileInfo from './UserProfileInfo';
import 'react-photo-view/dist/react-photo-view.css';
import UpdateProfileForm from './UpdateProfileForm';

// eslint-disable-next-line react/prop-types
function UserProfileCard({ user }) {
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
              <PhotoView src={import.meta.env.VITE_DEFAULT_BANNER}>
                <img
                  className="m-auto aspect-[3/1] max-h-full w-full cursor-pointer object-fill"
                  src={import.meta.env.VITE_DEFAULT_BANNER}
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

export default UserProfileCard;
