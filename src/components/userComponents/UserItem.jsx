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

function UserItem({
  isFollowed,
  isFollowing,
  userPicture,
  userName,
  userID,
  discription,
  following,
  followers,
}) {
  const [localIsFollowed, setLocalIsFollowed] = useState(isFollowed);
  const { user: curUser } = useAuth();
  const [isButtonHovered, setButtonHovered] = useState(false);

  // Function to handle follow request
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
      .then((data) => {
        console.log('Response data:', data);
      })
      .catch((error) => {
        console.error('Error during fetch:', error);
      });
  };

  // Function to handle unFollow request
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
        console.log(localIsFollowed);
        return response.json();
      })
      .then((data) => {
        console.log('Response data:', data);
      })
      .catch((error) => {
        console.error('Error during fetch:', error);
      });
  };

  const handelFollowUnFollowButton = (event) => {
    event.preventDefault();
    event.stopPropagation(); // to ignore any other functions in the same component
    localIsFollowed ? unFollowReq() : followReq();
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
          <div className="mr-3 h-full w-11">
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
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex h-[41.5px] flex-col">
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
                >
                  <label
                    htmlFor="img"
                    className=" h-[21.5px] cursor-pointer text-[15px] font-bold text-pure-black hover:underline dark:text-white"
                    data-testid={`UserItem_${userID}_name`}
                  >
                    {userName}
                  </label>
                </PopoverUserCard>
                <div className="flex h-5 flex-row items-center">
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
                  >
                    <span
                      className=" w-min text-light-thin"
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
                      <p className=" h-3 text-[11px] leading-3 text-light-thin">
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
                        localIsFollowed
                          ? isButtonHovered
                            ? 'red'
                            : 'white'
                          : 'white'
                      }
                      backGroundColorDark={
                        localIsFollowed
                          ? isButtonHovered
                            ? 'red'
                            : 'black'
                          : 'black'
                      }
                      borderColor={
                        localIsFollowed
                          ? isButtonHovered
                            ? 'red'
                            : 'gray'
                          : 'gray'
                      }
                      label={
                        localIsFollowed
                          ? isButtonHovered
                            ? 'Unfollow'
                            : 'Following'
                          : 'Follow'
                      }
                      labelColor={
                        localIsFollowed
                          ? isButtonHovered
                            ? 'red'
                            : 'black'
                          : 'black'
                      }
                      labelColorDark={
                        localIsFollowed
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
            <div className=" pt-1">
              <p className=" text-[15px] text-pure-black dark:text-white">
                {discription}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

UserItem.propTypes = {
  isFollowed: PropTypes.bool.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  userPicture: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  discription: PropTypes.string.isRequired,
  following: PropTypes.string.isRequired,
  followers: PropTypes.string.isRequired,
};

export default UserItem;
