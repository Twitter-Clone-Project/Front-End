import React from 'react';
import { Outlet } from 'react-router';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import UserProfileInfo from './UserProfileInfo';
import ListNav from '../navigation-bars/ListNav';
import { useAuth } from '../../hooks/AuthContext';
import 'react-photo-view/dist/react-photo-view.css';

function UserProfileCard() {
  const { user } = useAuth();
  const ListNavItems = [
    {
      label: 'Posts',
      path: `/app/${user.username}/posts`,
    },
    {
      label: 'Replies',
      path: `/app/${user.username}/replies`,
    },
    {
      label: 'Media',
      path: `/app/${user.username}/media`,
    },
    {
      label: 'Likes',
      path: `/app/${user.username}/likes`,
    },
  ];
  return (
    <div className="h-full w-full max-w-[600px] border-x-0 border-border-gray dark:text-white sm:border-x-2">
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
      <ListNav items={ListNavItems} />
      <Outlet />
    </div>
  );
}

export default UserProfileCard;
