import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuid4 } from 'uuid';
import UserItem from '../userComponents/UserItem';
import Spinner from '../Spinner';
import NoResults from '../user-profile-card/NoResults';
import SettingsHeader from './SettingsHeader';
import usePost from './usePost';

function MutedUsers() {
  const { data, error, isLoading, fetchData } = usePost();
  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_DOMAIN}users/mutedUsers`, {
      method: 'GET',
      origin: true,
      credentials: 'include',
      withCredentials: true,
    });
  }, [fetchData]);

  useEffect(() => {
    if (error) toast(error);
  }, [error]);

  return (
    <div
      data-testid="muted-users-page"
      className="w-full"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SettingsHeader title="Muted accounts" />
          {data && data.users.length ? (
            data.users.map((user) => (
              <UserItem
                key={uuid4()}
                isFollowed={user.isFollowed}
                isFollowing={user.isFollowing}
                userPicture={user.imageUrl}
                userName={user.name}
                userID={user.username}
                discription={user.bio}
                following={user.followingsCount}
                followers={user.followersCount}
                testID={user.userId}
                isMuted
              />
            ))
          ) : (
            <div className="mx-auto flex h-full max-w-lg justify-center px-10">
              <NoResults title="You didn't mute any accounts." />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MutedUsers;
