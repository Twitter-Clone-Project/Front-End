import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuid4 } from 'uuid';
import UserItem from '../userComponents/UserItem';
import Spinner from '../Spinner';
import NoResults from '../user-profile-card/NoResults';
import SettingsHeader from './SettingsHeader';
import usePost from './usePost';

/**
 * Component representing the Blocked Users page in the settings.
 * Fetches and displays a list of blocked user accounts.
 */
function BlockedUsers() {
  const { data, error, isLoading, fetchData } = usePost();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_DOMAIN}users/blockedUsers`, {
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
      data-testid="blocked-users-page"
      className="w-full"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SettingsHeader title="Blocked accounts" />
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
                isBlocked
              />
            ))
          ) : (
            <div className="mx-auto flex h-full max-w-lg justify-center px-10">
              <NoResults title="You didn't block any accounts." />
            </div>
          )}
        </>
      )}
    </div>
  );
}

BlockedUsers.propTypes = {
  // No props required
};

export default BlockedUsers;
