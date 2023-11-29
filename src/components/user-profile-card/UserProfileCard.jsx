import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import UserProfileInfo from './UserProfileInfo';
import 'react-photo-view/dist/react-photo-view.css';

function UserProfileCard() {
  return (
    <div className="w-full max-w-[600px] dark:text-white">
      <div className="mx-auto flex w-full flex-col">
        <div className="profile-cover max-h-[500px]">
          <div className="object-fill">
            <PhotoProvider maskOpacity={0.5}>
              <PhotoView src="https://c4.wallpaperflare.com/wallpaper/142/751/831/landscape-anime-digital-art-fantasy-art-wallpaper-preview.jpg">
                <img
                  className="m-auto aspect-[3/1] max-h-full w-full cursor-pointer object-fill"
                  src="https://c4.wallpaperflare.com/wallpaper/142/751/831/landscape-anime-digital-art-fantasy-art-wallpaper-preview.jpg"
                  alt="cover"
                />
              </PhotoView>
            </PhotoProvider>
          </div>
        </div>
        <UserProfileInfo />
      </div>
    </div>
  );
}

export default UserProfileCard;
