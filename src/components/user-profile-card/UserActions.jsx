import * as React from 'react';
import Button from '../form-controls/Button';
import { useState, useRef, useEffect } from 'react';

function UserActions({ user }) {
  const [isButtonHovered, setButtonHovered] = useState(false);
  const [localIsFollowed, setLocalIsFollowed] = useState(user.isFollowed);
  const [localIsBlocked, setLocalIsBlocked] = useState(user.isBlocked);
  const [localIsMuted, setLocalIsMuted] = useState(user.isMuted);
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const dropDownRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropDownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const blockReq = () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}users/${user.username}/block`, {
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
        setLocalIsBlocked(!localIsBlocked);
        setLocalIsFollowed(false);
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error('Error during fetch:', error);
      });
  };

  const unBlockReq = () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}users/${user.username}/unblock`, {
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
        setLocalIsBlocked(!localIsBlocked);
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error('Error during fetch:', error);
      });
  };

  const muteReq = () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}users/${user.username}/mute`, {
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
        setLocalIsMuted(!localIsMuted);
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error('Error during fetch:', error);
      });
  };

  const unMuteReq = () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}users/${user.username}/unmute`, {
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
        setLocalIsMuted(!localIsMuted);
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error('Error during fetch:', error);
      });
  };

  const followReq = () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}users/${user.username}/follow`, {
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

  // Function to handle unFollow request
  const unFollowReq = () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}users/${user.username}/unfollow`, {
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
  const handelActionButton = () => {
    if (localIsBlocked) {
      unBlockReq();
    } else {
      if (localIsFollowed) {
        unFollowReq();
      } else {
        followReq();
      }
    }
  };

  return (
    <div
      className="flex w-full flex-row justify-between"
      data-testid={`${user.username}-UserActions-1`}
    >
      <div className="relative mr-2 min-w-[1rem]">
        <div
          className="absolute mr-2 flex h-9 w-9 items-center justify-center rounded-full border border-[#cfd9de] hover:bg-x-light-gray dark:border-border-gray dark:hover:bg-[#181919]"
          onClick={() => setDropDownVisible(true)}
          data-testid={`${user.username}-UserActions-2`}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className=" h-5 w-5 text-black dark:text-x-light-gray"
          >
            <g>
              <path
                d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </div>
        {dropDownVisible && (
          <div
            ref={dropDownRef}
            className="absolute -right-3 top-2 z-50 w-max max-w-[450px] rounded-lg bg-white shadow shadow-light-gray dark:bg-pure-black"
            data-testid={`${user.username}-UserActions-3`}
          >
            {!localIsBlocked && (
              <div
                className="flex h-11 flex-row px-4 py-3 hover:bg-[#f7f9f9] dark:hover:bg-[#16181c]"
                onClick={localIsMuted ? unMuteReq : muteReq}
                data-testid={`${user.username}-UserActions-4`}
              >
                <div
                  className="pr-3"
                  data-testid={`${user.username}-UserActions-5`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className=" h-5 w-5 text-black dark:text-x-light-gray"
                  >
                    <g>
                      <path
                        d={
                          localIsMuted
                            ? 'M18 1.2v21.6L8.71 17H5.5C4.12 17 3 15.88 3 14.5v-5C3 8.12 4.12 7 5.5 7h3.21L18 1.2zM8 9H5.5c-.28 0-.5.22-.5.5v5c0 .28.22.5.5.5H8V9zm2 6.45l6 3.75V4.8l-6 3.75v6.9z'
                            : 'M18 6.59V1.2L8.71 7H5.5C4.12 7 3 8.12 3 9.5v5C3 15.88 4.12 17 5.5 17h2.09l-2.3 2.29 1.42 1.42 15.5-15.5-1.42-1.42L18 6.59zm-8 8V8.55l6-3.75v3.79l-6 6zM5 9.5c0-.28.22-.5.5-.5H8v6H5.5c-.28 0-.5-.22-.5-.5v-5zm6.5 9.24l1.45-1.45L16 19.2V14l2 .02v8.78l-6.5-4.06z'
                        }
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className="w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {localIsMuted ? 'Unmute' : 'Mute'} @{user.username}
                </div>
              </div>
            )}
            <div
              className="flex h-11 flex-row px-4 py-3 hover:bg-[#f7f9f9] dark:hover:bg-[#16181c]"
              onClick={localIsBlocked ? unBlockReq : blockReq}
              data-testid={`${user.username}-UserActions-6`}
            >
              <div
                className="pr-3"
                data-testid={`${user.username}-UserActions-7`}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className=" h-5 w-5 text-black dark:text-x-light-gray"
                >
                  <g>
                    <path
                      d={
                        localIsBlocked
                          ? 'M12 3.75c-4.55 0-8.25 3.69-8.25 8.25 0 1.92.66 3.68 1.75 5.08l2.8-2.79 1.41 1.42-2.79 2.79c1.4 1.1 3.16 1.75 5.08 1.75 4.56 0 8.25-3.69 8.25-8.25 0-1.92-.65-3.68-1.75-5.08l-2.79 2.79-1.41-1.42 2.79-2.79C15.68 4.4 13.92 3.75 12 3.75zM1.75 12C1.75 6.34 6.34 1.75 12 1.75S22.25 6.34 22.25 12 17.66 22.25 12 22.25 1.75 17.66 1.75 12z'
                          : 'M12 3.75c-4.55 0-8.25 3.69-8.25 8.25 0 1.92.66 3.68 1.75 5.08L17.09 5.5C15.68 4.4 13.92 3.75 12 3.75zm6.5 3.17L6.92 18.5c1.4 1.1 3.16 1.75 5.08 1.75 4.56 0 8.25-3.69 8.25-8.25 0-1.92-.65-3.68-1.75-5.08zM1.75 12C1.75 6.34 6.34 1.75 12 1.75S22.25 6.34 22.25 12 17.66 22.25 12 22.25 1.75 17.66 1.75 12z'
                      }
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {localIsBlocked ? 'Unblock' : 'Block'}@{user.username}
              </div>
            </div>
          </div>
        )}
      </div>
      {!user.isBlockingMe && (
        <div
          className="flex h-9 w-[103px] items-center"
          onMouseEnter={() => {
            setButtonHovered(true);
          }}
          onMouseLeave={() => {
            setButtonHovered(false);
          }}
          onClick={handelActionButton}
          data-testid={`${user.username}-UserActions-8`}
        >
          <Button
            backGroundColor={
              localIsBlocked
                ? 'warningRed'
                : localIsFollowed
                ? isButtonHovered
                  ? 'red'
                  : 'white'
                : 'white'
            }
            backGroundColorDark={
              localIsBlocked
                ? 'warningRed'
                : localIsFollowed
                ? isButtonHovered
                  ? 'red'
                  : 'black'
                : 'black'
            }
            borderColor={
              localIsBlocked
                ? 'none'
                : localIsFollowed
                ? isButtonHovered
                  ? 'red'
                  : 'gray'
                : 'gray'
            }
            label={
              localIsBlocked
                ? isButtonHovered
                  ? 'Unblock'
                  : 'Blocked'
                : localIsFollowed
                ? isButtonHovered
                  ? 'Unfollow'
                  : 'Following'
                : 'Follow'
            }
            labelColor={
              localIsBlocked
                ? 'white'
                : localIsFollowed
                ? isButtonHovered
                  ? 'red'
                  : 'black'
                : 'black'
            }
            labelColorDark={
              localIsBlocked
                ? 'white'
                : localIsFollowed
                ? isButtonHovered
                  ? 'red'
                  : 'white'
                : 'white'
            }
            hight="h-9"
            textSize="text-sm"
          />
        </div>
      )}
    </div>
  );
}

export default UserActions;
