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
}) {
  const { user: curUser } = useAuth();

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
        popoverSetLocalIsFollowed(!popoverIsFollowed);
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
        popoverSetLocalIsFollowed(!popoverIsFollowed);
        return response.json();
      })
      .then((data) => {
        console.log('Response data:', data);
      })
      .catch((error) => {
        console.error('Error during fetch:', error);
      });
  };

  const handelButtonClick = () => {
    if (!popoverIsBlocked) {
      if (popoverIsFollowed) {
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
      openDelay={200}
      closeDelay={200}
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
          >
            <Button
              backGroundColor={
                popoverIsBlocked
                  ? 'warningRed'
                  : popoverIsFollowed
                  ? isPopoverButtonHovered
                    ? 'red'
                    : 'white'
                  : 'white'
              }
              backGroundColorDark={
                popoverIsBlocked
                  ? 'warningRed'
                  : popoverIsFollowed
                  ? isPopoverButtonHovered
                    ? 'red'
                    : 'black'
                  : 'black'
              }
              borderColor={
                popoverIsBlocked
                  ? 'none'
                  : popoverIsFollowed
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
                  : popoverIsFollowed
                  ? isPopoverButtonHovered
                    ? 'Unfollow'
                    : 'Following'
                  : 'Follow'
              }
              labelColor={
                popoverIsBlocked
                  ? 'white'
                  : popoverIsFollowed
                  ? isPopoverButtonHovered
                    ? 'red'
                    : 'black'
                  : 'black'
              }
              labelColorDark={
                popoverIsBlocked
                  ? 'white'
                  : popoverIsFollowed
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
      <div className="mt-2 w-full">
        <div className="flex h-[41.5px] flex-col overflow-ellipsis">
          <Link
            to={`/app/${popoverUserID}`}
            className="max-w-full hover:no-underline"
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
                  className="ml-1 h-4 min-w-[66.08px] items-center rounded bg-x-light-gray px-1 py-0.5 dark:bg-border-gray"
                  data-testid={`PopoverUserCard_${popoverUserID}_2`}
                >
                  <Button
                    backGroundColor={
                      popoverIsBlocked
                        ? 'warningRed'
                        : popoverIsFollowed
                        ? isPopoverButtonHovered
                          ? 'red'
                          : 'white'
                        : 'white'
                    }
                    backGroundColorDark={
                      popoverIsBlocked
                        ? 'warningRed'
                        : popoverIsFollowed
                        ? isPopoverButtonHovered
                          ? 'red'
                          : 'black'
                        : 'black'
                    }
                    borderColor={
                      popoverIsBlocked
                        ? 'none'
                        : popoverIsFollowed
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
                        : popoverIsFollowed
                        ? isPopoverButtonHovered
                          ? 'Unfollow'
                          : 'Following'
                        : 'Follow'
                    }
                    labelColor={
                      popoverIsBlocked
                        ? 'white'
                        : popoverIsFollowed
                        ? isPopoverButtonHovered
                          ? 'red'
                          : 'black'
                        : 'black'
                    }
                    labelColorDark={
                      popoverIsBlocked
                        ? 'white'
                        : popoverIsFollowed
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
            <div className=" mt-2">
              <div className="flex h-[41.5px] flex-col">
                <Link
                  to={`/app/${popoverUserID}`}
                  className="hover:no-underline"
                  data-testid={`PopoverUserCard_${popoverUserID}_userInf`}
                >
                  <label
                    htmlFor="popoverImg"
                    className="cursor-pointer text-[15px] font-bold text-pure-black hover:underline dark:text-white"
                  >
                    {popoverUserName}
                  </label>
                  <div className="flex h-5 flex-row items-center">
                    <span className=" w-min cursor-pointer text-light-thin">
                      @{popoverUserID}
                    </span>
                    {popoverIsFollowing && (
                      <div
                        className=" ml-1 h-4 items-center rounded bg-x-light-gray px-1 py-0.5 dark:bg-border-gray"
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
              <p className=" text-[15px] text-pure-black dark:text-white">
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

PopoverUserCard.propTypes = {
  popoverIsFollowed: PropTypes.bool.isRequired,
  popoverUserPicture: PropTypes.string.isRequired,
  popoverUserName: PropTypes.string.isRequired,
  popoverUserID: PropTypes.string.isRequired,
  popoverDiscription: PropTypes.string.isRequired,
  popoverFollowing: PropTypes.string.isRequired,
  popoverFollowers: PropTypes.string.isRequired,
};

export default PopoverUserCard;
