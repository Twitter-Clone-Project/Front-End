/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import moment from 'moment';
import Button from '../form-controls/Button';
import 'react-photo-view/dist/react-photo-view.css';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/AuthContext';
import UserDetail from './UserDetail';
import UserActions from './UserActions';

/**
 * Renders the user profile information.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object containing profile information.
 * @param {Function} props.setUpdateFormOpen - Callback function to open the update form.
 * @returns {JSX.Element} The rendered UserProfileInfo component.
 */

function UserProfileInfo({ user, setUpdateFormOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dob = moment(user.birthDate).format('MMMM D, YYYY');
  const createdAt = moment(user.createdAt).format('MMMM YYYY');
  const { user: curUser } = useAuth();
  const { username, name, pic, followers, following } = {
    username: user.username,
    name: user.name,
    pic: user.imageUrl || import.meta.env.VITE_DEFAULT_AVATAR,
    followers: user.followersCount,
    following: user.followingsCount,
  };

  return (
    <div className="relative cursor-auto bg-white bg-opacity-100 p-4 text-black dark:bg-pure-black dark:text-white">
      <div className="absolute -top-0 z-10 flex aspect-square w-1/4 min-w-[3rem] -translate-y-1/2 justify-between ">
        <PhotoProvider maskOpacity={0.5}>
          <PhotoView src={pic}>
            <img
              id="popoverImg"
              data-testid="user-photo"
              src={pic}
              alt=""
              className="h-auto w-full cursor-pointer rounded-full border-4 border-white bg-white dark:border-pure-black dark:bg-pure-black"
            />
          </PhotoView>
        </PhotoProvider>
      </div>
      <div className="mb-4 flex min-h-[50px] w-full justify-end">
        {user.username === curUser.username ? (
          <div className="w-[50%] max-w-[8rem]">
            <Button
              label="Edit Profile"
              labelColor="black"
              labelColorDark="white"
              backGroundColorDark="black"
              backGroundColor="white"
              className="bg-pure-black text-white"
              onClick={() => setUpdateFormOpen(true)}
            />
          </div>
        ) : (
          <div
            className={`${
              user.isBlockingMe ? 'w-min' : 'w-[50%]'
            } min-w-[48px]  max-w-[147px]`}
            data-testid={`${user.username}-UserProfile-UserActions`}
          >
            <UserActions user={user} />
          </div>
        )}
      </div>
      <div className="mb-5 mt-2">
        <div className="flex  flex-col">
          <span
            style={{ wordBreak: 'break-word', whiteSpace: 'break-spaces' }}
            className="max-w-[350px] truncate break-words text-xl font-bold text-pure-black dark:text-white"
          >
            {name}
          </span>
          <div className="flex h-5 flex-row items-center">
            <span
              data-testid={`${username}-username`}
              className="w-min text-light-thin"
            >
              @{username}
            </span>
          </div>
        </div>
      </div>
      <div data-testid={`${user.username}-UsersProfile-Block-Test`}>
        {!user.isBlockingMe && (
          <div>
            {user.bio && (
              <div className="bio mb-2 max-w-[95%]">
                <p
                  data-testid="user-bio"
                  className="whitespace-break-spaces break-words"
                >
                  {user.bio}
                </p>
              </div>
            )}
            <div className="mb-3 flex flex-wrap items-center gap-x-3 text-sm">
              {user.location && (
                <UserDetail path="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z">
                  <span
                    data-testid="user-location"
                    className="block max-w-[100px] overflow-hidden text-ellipsis"
                  >
                    {user.location}
                  </span>
                </UserDetail>
              )}
              {user.website && (
                <UserDetail path="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z">
                  <a
                    href={user.website}
                    target="_blank"
                    className="max-w-[140px]"
                    rel="noreferrer"
                  >
                    <span
                      data-testid="user-website"
                      className="block max-w-[140px] truncate"
                    >
                      {user.website}
                    </span>
                  </a>
                </UserDetail>
              )}
              {user.birthDate && (
                <UserDetail path="M8 10c0-2.21 1.79-4 4-4v2c-1.1 0-2 .9-2 2H8zm12 1c0 4.27-2.69 8.01-6.44 8.83L15 22H9l1.45-2.17C6.7 19.01 4 15.27 4 11c0-4.84 3.46-9 8-9s8 4.16 8 9zm-8 7c3.19 0 6-3 6-7s-2.81-7-6-7-6 3-6 7 2.81 7 6 7z">
                  <span data-testid="dob">Born {dob}</span>
                </UserDetail>
              )}
              {user.createdAt && (
                <UserDetail path="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z">
                  <span data-testid="join-date">Joined {createdAt}</span>
                </UserDetail>
              )}
            </div>
            <div className="mt-1 flex flex-row flex-wrap">
              <div
                role="button"
                tabIndex={-6}
                data-testid="following-btn"
                onKeyDown={() =>
                  navigate(`/app/${username}/following`, {
                    state: location.pathname,
                  })
                }
                onClick={() =>
                  navigate(`/app/${username}/following`, {
                    state: location.pathname,
                  })
                }
              >
                <span
                  data-testid="following-count"
                  className="mr-2 cursor-pointer text-pure-black decoration-1 hover:underline dark:text-white"
                >
                  <span className="font-semibold">{following}</span>
                  <span className="text-light-thin"> Following</span>
                </span>
              </div>
              <div
                role="button"
                data-testid="followers-btn"
                tabIndex={-6}
                onKeyDown={() =>
                  navigate(`/app/${username}/followers`, {
                    state: location.pathname,
                  })
                }
                onClick={() =>
                  navigate(`/app/${username}/followers`, {
                    state: location.pathname,
                  })
                }
              >
                <span
                  data-testid="folllowers-count"
                  className="mr-5  cursor-pointer text-pure-black decoration-1 hover:underline dark:text-white"
                >
                  <span className="font-semibold">{followers}</span>
                  <span className="text-light-thin"> Followers</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// Prop types for the UserProfileInfo component
UserProfileInfo.propTypes = {
  // Prop types for the UserProfileInfo component
  user: PropTypes.shape({
    // The username of the user (required)
    username: PropTypes.string.isRequired,
    // The name of the user (required)
    name: PropTypes.string.isRequired,
    // The birth date of the user
    birthDate: PropTypes.string,
    // The creation date of the user
    createdAt: PropTypes.string,
    // The image URL of the user
    imageUrl: PropTypes.string,
    // The number of followers of the user
    followersCount: PropTypes.string,
    // The number of followings of the user
    followingsCount: PropTypes.string,
    // The bio of the user
    bio: PropTypes.string,
    // The location of the user
    location: PropTypes.string,
    // The website of the user
    website: PropTypes.string,
    // Indicates if the user is blocking the current user
    isBlockingMe: PropTypes.bool,
  }).isRequired,
  // Callback function to open the update form (required)
  setUpdateFormOpen: PropTypes.func.isRequired,
};

export default UserProfileInfo;
