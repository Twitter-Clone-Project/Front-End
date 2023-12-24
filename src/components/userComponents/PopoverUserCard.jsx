/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import * as HoverCard from '@radix-ui/react-hover-card';
import Button from '../form-controls/Button';

import { useAuth } from '../../hooks/AuthContext';

function PopoverUserCard({
  children,
  popoverIsFollowed,
  popoverIsFollowing,
  popoverUserPicture,
  popoverUserName,
  popoverUserID,
  popoverDiscription,
  popoverFollowing,
  popoverFollowers,
  popoverSetLocalIsFollowed,
  popoverIsBlocked,
  popoverIsMuted,
}) {
  const { user: curUser } = useAuth();
  const [localIsFollowed, setLocalIsFollowed] = useState(popoverIsFollowed);
  // Function to handle follow request

  const followReq = () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}users/${popoverUserID}/follow`, {
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
        popoverSetLocalIsFollowed(!localIsFollowed);
        setLocalIsFollowed(!localIsFollowed);
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error('Error during fetch:', error);
      });
  };

  // Function to handle unFollow request
  const unFollowReq = () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}users/${popoverUserID}/unfollow`, {
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
        popoverSetLocalIsFollowed(!localIsFollowed);
        setLocalIsFollowed(!localIsFollowed);
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error('Error during fetch:', error);
      });
  };

  const handelButtonClick = () => {
    if (!popoverIsBlocked && !popoverIsMuted) {
      if (localIsFollowed) {
        unFollowReq();
      } else {
        followReq();
      }
    }
  };

  const [isPopoverButtonHovered, setPopoverButtonHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <HoverCard.Root
      openDelay={700}
      closeDelay={300}
      defaultOpen={false}
    >
      <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          hideWhenDetached
          avoidCollisions
          className="HoverCardContent"
          sideOffset={5}
          align="center"
          side="bottom"
        >
          <div
            className="w-[300px] cursor-auto rounded-2xl bg-white bg-opacity-100 p-4 text-black shadow shadow-light-gray dark:bg-pure-black dark:text-white"
            data-testid={`PopoverUserCard_${popoverUserID}_0`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <div className="flex w-full flex-row justify-between">
              <Link
                to={`/app/${popoverUserID}`}
                className="hover:no-underline"
                data-testid={`PopoverUserCard_${popoverUserID}_img`}
              >
                <img
                  id="popoverImg"
                  src={
                    popoverUserPicture || import.meta.env.VITE_DEFAULT_AVATAR
                  }
                  alt=""
                  className=" h-16 w-16 rounded-full"
                />
              </Link>
              {popoverUserID !== curUser.username ? (
                <div
                  role="button"
                  className=" h-9 w-28"
                  onMouseEnter={() => {
                    setPopoverButtonHovered(true);
                  }}
                  onMouseLeave={() => {
                    setPopoverButtonHovered(false);
                  }}
                  data-testid={`PopoverUserCard_${popoverUserID}_1`}
                  onClick={handelButtonClick}
                  tabIndex={-6}
                >
                  <Button
                    backGroundColor={
                      popoverIsBlocked || popoverIsMuted
                        ? 'warningRed'
                        : localIsFollowed
                        ? isPopoverButtonHovered
                          ? 'red'
                          : 'white'
                        : 'white'
                    }
                    backGroundColorDark={
                      popoverIsBlocked || popoverIsMuted
                        ? 'warningRed'
                        : localIsFollowed
                        ? isPopoverButtonHovered
                          ? 'red'
                          : 'black'
                        : 'black'
                    }
                    borderColor={
                      popoverIsBlocked || popoverIsMuted
                        ? 'none'
                        : localIsFollowed
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
                        : popoverIsMuted
                        ? 'Muted'
                        : localIsFollowed
                        ? isPopoverButtonHovered
                          ? 'Unfollow'
                          : 'Following'
                        : 'Follow'
                    }
                    labelColor={
                      popoverIsBlocked || popoverIsMuted
                        ? 'white'
                        : localIsFollowed
                        ? isPopoverButtonHovered
                          ? 'red'
                          : 'black'
                        : 'black'
                    }
                    labelColorDark={
                      popoverIsBlocked || popoverIsMuted
                        ? 'white'
                        : localIsFollowed
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
            <div className=" mt-2 max-w-min">
              <div className="flex h-[41.5px] flex-col">
                <Link
                  to={`/app/${popoverUserID}`}
                  className="hover:no-underline"
                  data-testid={`PopoverUserCard_${popoverUserID}_userInf`}
                >
                  <div className="flex max-w-full">
                    <span
                      htmlFor="popoverImg"
                      className="w-min max-w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-bold text-pure-black hover:underline dark:text-white"
                    >
                      {popoverUserName}
                    </span>
                  </div>

                  <div className="flex h-5 max-w-full flex-row items-center">
                    <span className=" w-min max-w-[196px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-light-thin">
                      @{popoverUserID}
                    </span>
                    {popoverIsFollowing && (
                      <div
                        className=" ml-1 h-4 min-w-[66.08px] items-center rounded bg-x-light-gray px-1 py-0.5 dark:bg-border-gray"
                        data-testid={`PopoverUserCard_${popoverUserID}_2`}
                      >
                        <p className=" h-3 text-[11px] leading-3 text-light-thin">
                          Follows you
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            </div>
            <div className=" mt-3">
              <p className=" max-w-full break-words text-[15px] text-pure-black dark:text-white">
                {popoverDiscription}
              </p>
            </div>
            <div className="mt-3 flex flex-row">
              <div
                role="button"
                tabIndex={-6}
                onClick={() => {
                  navigate(`/app/${popoverUserID}/following`, {
                    state: window.location.pathname,
                  });
                }}
                data-testid={`PopoverUserCard_${popoverUserID}_3`}
              >
                <span className="mr-5 cursor-pointer text-pure-black hover:underline dark:text-white">
                  {popoverFollowing}
                  <span className="text-light-thin"> Following</span>
                </span>
              </div>
              <div
                role="button"
                tabIndex={-6}
                onClick={() =>
                  navigate(`/app/${popoverUserID}/followers`, {
                    state: window.location.pathname,
                  })
                }
                data-testid={`PopoverUserCard_${popoverUserID}_4`}
              >
                <span className="mr-5  cursor-pointer text-pure-black hover:underline dark:text-white">
                  {popoverFollowers}
                  <span className="text-light-thin"> Followers</span>
                </span>
              </div>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

PopoverUserCard.defaultProps = {
  popoverIsBlocked: false,
  popoverIsMuted: false,
  popoverUserPicture: null,
  popoverDiscription: null,
  popoverSetLocalIsFollowed: () => {
    setLocalIsFollowed;
  },
};

PopoverUserCard.propTypes = {
  popoverIsFollowed: PropTypes.bool.isRequired,
  popoverUserPicture: PropTypes.string,
  popoverUserName: PropTypes.string.isRequired,
  popoverUserID: PropTypes.string.isRequired,
  popoverDiscription: PropTypes.string,
  popoverFollowing: PropTypes.string.isRequired,
  popoverFollowers: PropTypes.string.isRequired,
  popoverIsBlocked: PropTypes.bool,
  popoverIsMuted: PropTypes.bool,
  popoverSetLocalIsFollowed: PropTypes.func,
  popoverIsFollowing: PropTypes.bool.isRequired,
};

export default PopoverUserCard;
