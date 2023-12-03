import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import toast from 'react-hot-toast';
import UserProfileCard from './UserProfileCard';
import { useAuth } from '../../hooks/AuthContext';
import ListNav from '../navigation-bars/ListNav';
import Spinner from '../Spinner';
import OwnToaster from '../OwnToaster';

function ProfilePage() {
  const { user: curUser, dispatch } = useAuth();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams('username');

  const ListNavItems = [
    {
      label: 'Posts',
      path: `/app/${username}/posts`,
    },
    {
      label: 'Likes',
      path: `/app/${username}/likes`,
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `http://${import.meta.env.VITE_API_DOMAIN}profile/${username}`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const data = await res.json();
        if (data.status === false) throw new Error(data.message);
        setUser(data.data.user);
      } catch (err) {
        toast(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, curUser, username]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          data-testid={`${username}-profile`}
          className="border-x-0 border-light-gray dark:border-border-gray dark:text-white sm:border-x-[1px]"
        >
          <div
            className={`${
              user.isBlockingMe ? '' : 'border-b-[1px]'
            } border-light-gray dark:border-border-gray`}
          >
            <UserProfileCard user={user} />

            {!user.isBlockingMe && <ListNav items={ListNavItems} />}
          </div>
          <Outlet />
        </div>
      )}
      <OwnToaster />
    </>
  );
}

export default ProfilePage;
