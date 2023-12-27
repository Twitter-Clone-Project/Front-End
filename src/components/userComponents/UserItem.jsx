/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../form-controls/Button';
import PopoverUserCard from './PopoverUserCard';
import { useAuth } from '../../hooks/AuthContext';

/**
 * UserItem component displays information about a user and provides functionality for following/unfollowing, blocking/unblocking, and muting/unmuting the user.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isFollowed - Indicates whether the user is followed.
 * @param {boolean} props.isFollowing - Indicates whether the user is following.
 * @param {string} props.userPicture - The URL of the user's profile picture.
 * @param {string} props.userName - The username of the user.
 * @param {string} props.userID - The ID of the user.
 * @param {string} props.discription - The description of the user.
 * @param {number} props.following - The number of users the user is following.
 * @param {number} props.followers - The number of users following the user.
 * @param {boolean} props.isBlocked - Indicates whether the user is blocked.
 * @param {boolean} props.isMuted - Indicates whether the user is muted.
 * @returns {JSX.Element} The rendered UserItem component.
 * @example
 * ```jsx
 * <UserItem
 *   isFollowed={true}
 *   isFollowing={false}
 *   userPicture="https://example.com/profile.jpg"
 *   userName="JohnDoe"
 *   userID="123456"
 *   discription="Lorem ipsum dolor sit amet"
 *   following={100}
 *   followers={500}
 *   isBlocked={false}
 *   isMuted={false}
 * />
 * ```
 */

function UserItem({
  isFollowed,
  isFollowing,
  userPicture,
  userName,
  userID,
  discription,
  following,
  followers,
  isBlocked,
  isMuted,
}) {
  /* ... component implementation ... */
  const [localIsFollowed, setLocalIsFollowed] = useState(isFollowed);
  const [localIsBlocked, setLocalIsBlocked] = useState(isBlocked);
  const [localIsMuted, setLocalIsMuted] = useState(isMuted);
  const { user: curUser } = useAuth();
  const [isButtonHovered, setButtonHovered] = useState(false);

  const followReq = () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}users/${userID}/follow`, {
      method: 'POST',
      origin: true,
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setLocalIsFollowed(!localIsFollowed);
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error('Error during fetch:', error);
      });
  };

  const unFollowReq = () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}users/${userID}/unfollow`, {
      method: 'DELETE',
      origin: true,
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setLocalIsFollowed(!localIsFollowed);
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error('Error during fetch:', error);
      });
  };

  const blockReq = async () => {
    try {
      setLocalIsBlocked(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}users/${userID}/block`,
        {
          method: 'POST',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const res = await response.json();
      if (!res.status) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        setLocalIsFollowed(false);
      }
    } catch (error) {
      setLocalIsBlocked(false);
      console.error('Error during fetch:', error);
    }
  };

  const unBlockReq = async () => {
    try {
      setLocalIsBlocked(false);
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}users/${userID}/unblock`,
        {
          method: 'DELETE',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const res = await response.json();
      if (!res.status) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      setLocalIsBlocked(true);
      console.error('Error during fetch:', error);
    }
  };

  const muteReq = async () => {
    try {
      setLocalIsMuted(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}users/${userID}/mute`,
        {
          method: 'POST',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const res = await response.json();
      if (!res.status) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      setLocalIsMuted(false);
      console.error('Error during fetch:', error);
    }
  };

  const unMuteReq = async () => {
    try {
      setLocalIsMuted(false);
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}users/${userID}/unmute`,
        {
          method: 'DELETE',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const res = await response.json();
      if (!res.status) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      setLocalIsMuted(true);
      console.error('Error during fetch:', error);
    }
  };

  const handelFollowUnFollowButton = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isBlocked) {
      if (localIsBlocked) {
        unBlockReq();
      } else {
        blockReq();
      }
    } else if (isMuted) {
      if (localIsMuted) {
        unMuteReq();
      } else {
        muteReq();
      }
    } else {
      localIsFollowed ? unFollowReq() : followReq();
    }
  };

  return (
    <div
      className="relative h-min w-full cursor-pointer px-4 py-3 hover:bg-[#f7f7f7] dark:hover:bg-[#080808]"
      data-testid={`UserItem_${userID}_0`}
    >
      <Link
        to={`/app/${userID}`}
        className="hover:no-underline"
        data-testid={`UserItem_${userID}_toUserProfile`}
      >
        <div className="flex w-full flex-row">
          <div className="mr-3 h-full ">
            <PopoverUserCard
              popoverIsFollowed={localIsFollowed}
              popoverIsFollowing={isFollowing}
              popoverUserPicture={userPicture}
              popoverUserName={userName}
              popoverUserID={userID}
              popoverDiscription={discription}
              popoverFollowing={following}
              popoverFollowers={followers}
              popoverSetLocalIsFollowed={setLocalIsFollowed}
              popoverIsBlocked={localIsBlocked}
              popoverIsMuted={localIsMuted}
            >
              <img
                id="img"
                src={userPicture || import.meta.env.VITE_DEFAULT_AVATAR}
                alt=""
                className=" h-10 w-10 rounded-full"
                data-testid={`UserItem_${userID}_img`}
              />
            </PopoverUserCard>
          </div>
          <div className="flex w-[calc(100%-56px)] flex-col">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex h-[41.5px] w-full max-w-[75%] flex-col">
                <PopoverUserCard
                  popoverIsFollowed={localIsFollowed}
                  popoverIsFollowing={isFollowing}
                  popoverUserPicture={userPicture}
                  popoverUserName={userName}
                  popoverUserID={userID}
                  popoverDiscription={discription}
                  popoverFollowing={following}
                  popoverFollowers={followers}
                  popoverSetLocalIsFollowed={setLocalIsFollowed}
                  popoverIsBlocked={localIsBlocked}
                  popoverIsMuted={localIsMuted}
                >
                  <label
                    htmlFor="img"
                    className="h-[21.5px] w-min max-w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-bold text-pure-black hover:underline dark:text-white"
                    data-testid={`UserItem_${userID}_name`}
                  >
                    {userName}
                  </label>
                </PopoverUserCard>
                <div className="flex h-5 w-full flex-row items-center">
                  <PopoverUserCard
                    popoverIsFollowed={localIsFollowed}
                    popoverIsFollowing={isFollowing}
                    popoverUserPicture={userPicture}
                    popoverUserName={userName}
                    popoverUserID={userID}
                    popoverDiscription={discription}
                    popoverFollowing={following}
                    popoverFollowers={followers}
                    popoverSetLocalIsFollowed={setLocalIsFollowed}
                    popoverIsBlocked={localIsBlocked}
                    popoverIsMuted={localIsMuted}
                  >
                    <span
                      className="w-min max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap text-light-thin"
                      data-testid={`UserItem_${userID}_userName`}
                    >
                      @{userID}
                    </span>
                  </PopoverUserCard>
                  {isFollowing && (
                    <div
                      className=" ml-1 h-4 items-center rounded bg-x-light-gray px-1 py-0.5 dark:bg-border-gray"
                      data-testid={`UserItem_${userID}_1`}
                    >
                      <p className="h-3 text-[11px] leading-3 text-light-thin">
                        Follows you
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                {userID !== curUser.username ? (
                  <div
                    className=" h-8 w-[98px] items-center"
                    onMouseEnter={() => {
                      setButtonHovered(true);
                    }}
                    onMouseLeave={() => {
                      setButtonHovered(false);
                    }}
                    data-testid={`UserItem_${userID}_2`}
                    onClick={handelFollowUnFollowButton}
                  >
                    <Button
                      backGroundColor={
                        isBlocked || isMuted
                          ? localIsBlocked || localIsMuted
                            ? 'warningRed'
                            : 'white'
                          : localIsFollowed
                          ? isButtonHovered
                            ? 'red'
                            : 'white'
                          : 'white'
                      }
                      backGroundColorDark={
                        isBlocked || isMuted
                          ? localIsBlocked || localIsMuted
                            ? 'warningRed'
                            : 'black'
                          : localIsFollowed
                          ? isButtonHovered
                            ? 'red'
                            : 'black'
                          : 'black'
                      }
                      borderColor={
                        isBlocked || isMuted
                          ? localIsBlocked || localIsMuted
                            ? 'none'
                            : 'red'
                          : localIsFollowed
                          ? isButtonHovered
                            ? 'red'
                            : 'gray'
                          : 'gray'
                      }
                      label={
                        isBlocked
                          ? localIsBlocked
                            ? isButtonHovered
                              ? 'Unblock'
                              : 'Blocked'
                            : 'Block'
                          : isMuted
                          ? localIsMuted
                            ? isButtonHovered
                              ? 'Unmute'
                              : 'Muted'
                            : 'Mute'
                          : localIsFollowed
                          ? isButtonHovered
                            ? 'Unfollow'
                            : 'Following'
                          : 'Follow'
                      }
                      labelColor={
                        isBlocked || isMuted
                          ? localIsBlocked || localIsMuted
                            ? 'white'
                            : 'red'
                          : localIsFollowed
                          ? isButtonHovered
                            ? 'red'
                            : 'black'
                          : 'black'
                      }
                      labelColorDark={
                        isBlocked || isMuted
                          ? localIsBlocked || localIsMuted
                            ? 'white'
                            : 'red'
                          : localIsFollowed
                          ? isButtonHovered
                            ? 'red'
                            : 'white'
                          : 'white'
                      }
                      hight="h-8"
                      textSize="text-sm"
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="pt-1">
              <p className="break-words text-[15px] text-pure-black dark:text-white">
                {discription}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

UserItem.defaultProps = {
  isBlocked: false,
  isMuted: false,
  discription: null,
  userPicture: null,
};

UserItem.propTypes = {
  /**
   * indicates whether the user is followed by the current user.
   */
  isFollowed: PropTypes.bool.isRequired,
  /**
   * indicates whether the current user is following the user.
   */
  isFollowing: PropTypes.bool.isRequired,
  /**
   * the URL of the user's profile picture.
   */
  userPicture: PropTypes.string,
  /**
   * the name of the user.
   */
  userName: PropTypes.string.isRequired,
  /**
   * the username of the user.
   */
  userID: PropTypes.string.isRequired,
  /**
   * the description of the user.
   */
  discription: PropTypes.string,
  /**
   * the number of users the user is following.
   */
  following: PropTypes.string.isRequired,
  /**
   * the number of users following the user.
   */
  followers: PropTypes.string.isRequired,
  /**
   * indicates whether the user is blocked by the current user.
   */
  isBlocked: PropTypes.bool,
  /**
   * indicates whether the user is muted by the current user.
   */
  isMuted: PropTypes.bool,
};
export default UserItem;
