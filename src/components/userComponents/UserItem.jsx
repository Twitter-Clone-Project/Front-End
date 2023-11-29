/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../form-controls/Button';
import PopoverUserCard from './PopoverUserCard';

function UserItem({
  isFollowed,
  isFollowing,
  userPicture,
  userName,
  userID,
  discription,
  following,
  followers,
  testID,
  itemID,
}) {
  const [localIsFollowed, setLocalIsFollowed] = useState(isFollowed);

  // Function to handle follow request
  const followReq = () => {
    fetch(`http://${import.meta.env.VITE_API_DOMAIN}users/${itemID}/follow`, {
      method: 'POST',
      origin: true,
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: { userID },
      }),
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

  // Function to handle unFollow request
  const unFollowReq = () => {
    fetch(`http://${import.meta.env.VITE_API_DOMAIN}users/${itemID}/unfollow`, {
      method: 'DELETE',
      origin: true,
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: { userID },
      }),
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

  const [isButtonHovered, setButtonHovered] = useState(false);
  const popoverID = `popover-user-profile-${userID}`;

  useEffect(() => {
    let timeOut;
    let timeIn;
    let popoverEntered = false;

    const elements = document.querySelectorAll(
      `[data-popover-target=${popoverID}]`,
    );
    const popover = document.getElementById(popoverID);

    elements.forEach((element) => {
      element.addEventListener('mouseover', () => {
        timeIn = setTimeout(() => {
          clearTimeout(timeOut);
          if (popover) {
            popover.style.left = `${
              element.offsetLeft +
              (element.offsetWidth - popover.offsetWidth) / 2
            }px`;

            const topPosition = element.offsetTop + element.offsetHeight;
            const elementPosition =
              element.getBoundingClientRect().top + element.offsetHeight;
            const popoverHeight = popover.offsetHeight;
            const viewportHeight = window.innerHeight;
            if (elementPosition + popoverHeight > viewportHeight) {
              popover.style.top = `${element.offsetTop - popoverHeight - 16}px`;
            } else {
              popover.style.top = `${topPosition}px`;
            }

            popover.classList.remove('invisible');
            popover.classList.add('opacity-100');
            popover.classList.remove('opacity-0');
          }
        }, 700);
      });

      element.addEventListener('mouseout', () => {
        clearTimeout(timeIn);
        timeOut = setTimeout(() => {
          if (popover && !popoverEntered) {
            popover.classList.add('opacity-0');
            popover.classList.remove('opacity-100');
            setTimeout(() => {
              popover.classList.add('invisible');
            }, 300);
          }
        }, 300);
      });
    });

    popover.addEventListener('mouseover', () => {
      clearTimeout(timeOut);
      popoverEntered = true;
    });

    popover.addEventListener('mouseout', () => {
      popoverEntered = false;
      timeOut = setTimeout(() => {
        if (!popoverEntered) {
          popover.classList.add('opacity-0');
          popover.classList.remove('opacity-100');
          setTimeout(() => {
            popover.classList.add('invisible');
          }, 300);
        }
      }, 300);
    });

    return () => {
      clearTimeout(timeOut);
    };
  });

  let navigate = useNavigate();
  return (
    <div className="relative h-min w-full cursor-pointer px-4 py-3 hover:bg-[#f7f7f7] dark:hover:bg-[#080808]">
      <Link
        to={`/app/${userID}`}
        className="hover:no-underline"
      >
        <div className="flex w-full flex-row">
          <div className="mr-3 h-full w-11">
            <img
              id="img"
              src={userPicture}
              alt=""
              className=" h-10 w-10 rounded-full"
              data-popover-target={popoverID}
            />
          </div>
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex h-[41.5px] flex-col">
                <label
                  htmlFor="img"
                  className=" h-[21.5px] cursor-pointer text-[15px] font-bold text-pure-black hover:underline dark:text-white"
                  data-popover-target={popoverID}
                >
                  {userName}
                </label>
                <div className="flex h-5 flex-row items-center">
                  <span
                    className=" w-min text-light-thin"
                    data-popover-target={popoverID}
                  >
                    @{userID}
                  </span>
                  {isFollowing && (
                    <div
                      className=" ml-1 h-4 items-center rounded bg-x-light-gray px-1 py-0.5 dark:bg-border-gray"
                      data-testid={`UserItem_${testID}_1`}
                    >
                      <p className=" h-3 text-[11px] leading-3 text-light-thin">
                        Follows you
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div
                  className=" h-8 w-[98px] items-center"
                  onMouseEnter={() => {
                    setButtonHovered(true);
                  }}
                  onMouseLeave={() => {
                    setButtonHovered(false);
                  }}
                  data-testid={`UserItem_${testID}_2`}
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

      <div
        data-popover
        id={popoverID}
        className="invisible absolute z-50 mt-2 w-[300px] opacity-100  transition-opacity duration-300"
        data-testid={`UserItem_${testID}_3`}
      >
        <PopoverUserCard
          popoverIsFollowed={localIsFollowed}
          popoverUserPicture={userPicture}
          popoverUserName={userName}
          popoverUserID={userID}
          popoverDiscription={discription}
          popoverFollowing={following}
          popoverFollowers={followers}
          popoverTestID={testID}
          popoverSetLocalIsFollowed={setLocalIsFollowed}
          popoverItemID={itemID}
        />
      </div>
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
  testID: PropTypes.number.isRequired,
  itemID: PropTypes.string.isRequired,
};

export default UserItem;
