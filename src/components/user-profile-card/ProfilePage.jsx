import React from 'react';
import { Outlet } from 'react-router';
import UserProfileCard from './UserProfileCard';
import { useAuth } from '../../hooks/AuthContext';
import ListNav from '../navigation-bars/ListNav';

function ProfilePage() {
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
    <div className="border-x-0 border-border-gray dark:text-white sm:border-x-2">
      <div className="border-b-[1px] border-b-border-gray">
        <UserProfileCard />
        <ListNav items={ListNavItems} />
      </div>
      <Outlet />
    </div>
  );
}

export default ProfilePage;
