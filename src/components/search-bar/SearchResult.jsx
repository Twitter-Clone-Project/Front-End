/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import PopoverUserCard from '../userComponents/PopoverUserCard';
import Button from '../form-controls/Button';
import { useAuth } from '../../hooks/AuthContext';

function SearchResult({ data, searchPage }) {
  const { user: curUser } = useAuth();
  const [popoverIsBlocked] = useState(false);
  const [followed, setFollowed] = useState(data.isFollowed);
  const [isPopoverButtonHovered, setPopoverButtonHovered] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/app/${data.username}`);
  };
  const followReq = () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}users/${data.username}/follow`, {
      method: 'POST',
      origin: true,
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setFollowed(!followed);
      return response.json();
    });
  };

  // Function to handle unFollow request
  const unFollowReq = () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}users/${data.username}/unfollow`, {
      method: 'DELETE',
      origin: true,
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setFollowed(!followed);
      return response.json();
    });
  };

  const handelButtonClick = () => {
    if (!popoverIsBlocked) {
      if (followed) {
        unFollowReq();
      } else {
        followReq();
      }
    }
  };
  return (
    <div
      className="flex h-[70px] w-full flex-wrap items-center px-4 py-2  hover:cursor-pointer hover:bg-hover-layout"
      onClick={() => {
        handleClick();
      }}
      data-testid={`search-result-${data.id}`}
    >
      <div className="pr-2">
        {searchPage ? (
          <PopoverUserCard
            popoverIsFollowed={data.isFollowed}
            popoverUserPicture={
              data.profileImageURL || import.meta.env.VITE_DEFAULT_AVATAR
            }
            popoverUserName={data.screenName}
            popoverUserID={data.username}
            popoverDiscription=""
            popoverFollowing={data.followingCount}
            popoverFollowers={data.followersCount}
            popoverTestID={`${data.username}-popover`}
            popoverSetLocalIsFollowed
          >
            <img
              src={data.displayPicture || import.meta.env.VITE_DEFAULT_AVATAR}
              alt="dp"
              className="h-[40px] w-[40px] rounded-full"
            />
          </PopoverUserCard>
        ) : (
          <img
            src={data.displayPicture || import.meta.env.VITE_DEFAULT_AVATAR}
            alt="dp"
            className="h-[40px] w-[40px] rounded-full"
          />
        )}
      </div>
      <div className="flex flex-col pl-2 text-base font-medium ">
        <div className="flex justify-between">
          <div>
            <span className="font-semibold dark:text-white">
              {data.screenName}
            </span>
            <span className="text-sm text-light-gray">@{data.username}</span>
          </div>
          <div>
            {searchPage && data.username !== curUser.username ? (
              <div
                role="button"
                className=" h-9 w-28"
                onMouseEnter={() => {
                  setPopoverButtonHovered(true);
                }}
                onMouseLeave={() => {
                  setPopoverButtonHovered(false);
                }}
                data-testid={`PopoverUserCard_${data.username}_1`}
                onClick={handelButtonClick}
                tabIndex={-6}
              >
                <Button
                  backGroundColor={
                    popoverIsBlocked
                      ? 'warningRed'
                      : followed
                      ? isPopoverButtonHovered
                        ? 'red'
                        : 'white'
                      : 'white'
                  }
                  backGroundColorDark={
                    popoverIsBlocked
                      ? 'warningRed'
                      : followed
                      ? isPopoverButtonHovered
                        ? 'red'
                        : 'black'
                      : 'black'
                  }
                  borderColor={
                    popoverIsBlocked
                      ? 'none'
                      : followed
                      ? isPopoverButtonHovered
                        ? 'red'
                        : 'gray'
                      : 'gray'
                  }
                  label={
                    popoverIsBlocked
                      ? isPopoverButtonHovered
                        ? 'Blocked'
                        : 'Blocked'
                      : followed
                      ? isPopoverButtonHovered
                        ? 'Unfollow'
                        : 'Following'
                      : 'Follow'
                  }
                  labelColor={
                    popoverIsBlocked
                      ? 'white'
                      : followed
                      ? isPopoverButtonHovered
                        ? 'red'
                        : 'black'
                      : 'black'
                  }
                  labelColorDark={
                    popoverIsBlocked
                      ? 'white'
                      : followed
                      ? isPopoverButtonHovered
                        ? 'red'
                        : 'white'
                      : 'white'
                  }
                  hight="h-9"
                  textSize="text-sm"
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

SearchResult.propTypes = {
  data: PropTypes.string.isRequired,
  searchPage: PropTypes.bool,
};

SearchResult.defaultProps = {
  searchPage: false,
};
export default SearchResult;
