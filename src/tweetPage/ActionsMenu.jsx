/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/AuthContext';

function ActionsMenu({ userId, tweet, tweets, setTweets }) {
  const { user } = useAuth();
  const [show, toggleShow] = useState(false);
  const dropdownRef = useRef(null);
  const [followed, toggleFollowed] = useState(tweet.user.isFollowed);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const showMenu = () => {
    toggleShow(!show);
  };
  const handleFollow = () => {
    //
    toggleFollowed(!tweet.user.isFollowed);
    toggleShow(false);
  };
  const handleBlock = () => {
    //

    toggleShow(false);
  };
  const handleMute = () => {
    //

    toggleShow(false);
  };
  const handleDelete = () => {
    const deleteTweet = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}tweets/${tweet.id}/deleteTweet`,
          {
            origin: true,
            credentials: 'include',
            withCredentials: true,
            method: 'DELETE',
          },
        );
        const res = await response.json();
        console.log(res.message);
        if (res.status) {
          if (tweets) {
            const newTweets = tweets.filter((atweet) => atweet.id !== tweet.id);
            setTweets(newTweets);
          }
        }
      } catch (err) {
        toast(err.message);
      }
    };

    deleteTweet();
    toggleShow(false);
  };

  const blockReq = () => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}users/${user.username}/block`, {
      method: 'POST',
      origin: true,
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: user.username,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setLocalIsBlocked(!localIsBlocked);
        setLocalIsFollowed(false);
        return response.json();
      })
      .then((data) => {
        console.log('Response data:', data);
      })
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
      body: JSON.stringify({
        userName: user.username,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setLocalIsBlocked(!localIsBlocked);
        return response.json();
      })
      .then((data) => {
        console.log('Response data:', data);
      })
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
      body: JSON.stringify({
        userName: user.username,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setLocalIsMuted(!localIsMuted);
        return response.json();
      })
      .then((data) => {
        console.log('Response data:', data);
      })
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
      body: JSON.stringify({
        userName: user.username,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setLocalIsMuted(!localIsMuted);
        return response.json();
      })
      .then((data) => {
        console.log('Response data:', data);
      })
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
      body: JSON.stringify({
        userName: user.username,
      }),
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
    fetch(`${import.meta.env.VITE_API_DOMAIN}users/${user.username}/unfollow`, {
      method: 'DELETE',
      origin: true,
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: user.username,
      }),
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

  return (
    <div
      ref={dropdownRef}
      className="dropdown flex scale-75"
    >
      <button
        type="submit"
        data-testid={`${tweet.id}menubtn`}
        onClick={() => showMenu()}
        className="dropbtn group  rounded-full hover:bg-[#e1eef6] dark:hover:bg-[#0a171f]"
      >
        <svg
          viewBox="0 0 25 25"
          className="h-[24px] w-[24px]  "
        >
          <path
            className="fill-dark-gray group-hover:fill-blue "
            d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
          />
        </svg>
      </button>
      {show && (
        <div
          id="myDropdown"
          data-testid={`${tweet.id}menu`}
          className="dropdown-content absolute right-[-10px] z-10 flex w-[480px] flex-col rounded-2xl bg-white py-3 shadow dark:bg-pure-black dark:text-white dark:shadow-white"
        >
          {userId !== user.userId && (
            <div className="anotheruser  h-[220px] py-3">
              <button
                type="submit"
                onClick={() => handleFollow()}
                className="w-[100%]"
              >
                <div className="flex flex-row hover:bg-xx-light-gray dark:hover:bg-[#080808]">
                  <div className="py-5 pl-4">
                    <svg
                      viewBox="0 0 25 25"
                      className="h-[25px] w-[25px]  "
                    >
                      {!tweet.user.isFollowed && (
                        <path
                          className="dark:fill-white"
                          d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm13 4v3h2v-3h3V8h-3V5h-2v3h-3v2h3zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"
                        />
                      )}
                      {tweet.user.isFollowed && (
                        <path
                          className="dark:fill-white"
                          d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm12.586 3l-2.043-2.04 1.414-1.42L20 7.59l2.043-2.05 1.414 1.42L21.414 9l2.043 2.04-1.414 1.42L20 10.41l-2.043 2.05-1.414-1.42L18.586 9zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"
                        />
                      )}
                    </svg>
                  </div>
                  {!tweet.user.isFollowed && (
                    <div className="h-[60px]  px-[14px] py-[16px] text-[20px] font-semibold">
                      Follow @{tweet.user.username}
                    </div>
                  )}
                  {tweet.user.isFollowed && (
                    <div className="h-[60px]  px-[14px] py-[16px] text-[20px] font-semibold">
                      Unfollow @{tweet.user.username}
                    </div>
                  )}
                </div>
              </button>
              <button
                type="submit"
                onClick={() => handleMute()}
                className="w-[100%]"
              >
                <div className="flex flex-row hover:bg-xx-light-gray dark:hover:bg-[#080808]">
                  <div className="py-5 pl-4">
                    <svg
                      viewBox="0 0 25 25"
                      className="h-[25px] w-[25px]  "
                    >
                      <path
                        className="dark:fill-white"
                        d="M18 6.59V1.2L8.71 7H5.5C4.12 7 3 8.12 3 9.5v5C3 15.88 4.12 17 5.5 17h2.09l-2.3 2.29 1.42 1.42 15.5-15.5-1.42-1.42L18 6.59zm-8 8V8.55l6-3.75v3.79l-6 6zM5 9.5c0-.28.22-.5.5-.5H8v6H5.5c-.28 0-.5-.22-.5-.5v-5zm6.5 9.24l1.45-1.45L16 19.2V14l2 .02v8.78l-6.5-4.06z"
                      />
                    </svg>
                  </div>
                  <div className="h-[60px]  px-[14px] py-[16px] text-[20px] font-semibold">
                    Mute @{tweet.user.username}
                  </div>
                </div>
              </button>
              <button
                type="submit"
                onClick={() => handleBlock()}
                className="w-[100%]"
              >
                <div className="flex flex-row hover:bg-xx-light-gray dark:hover:bg-[#080808]">
                  <div className="py-5 pl-4">
                    <svg
                      viewBox="0 0 25 25"
                      className="h-[25px] w-[25px]  "
                    >
                      <path
                        className="dark:fill-white"
                        d="M12 3.75c-4.55 0-8.25 3.69-8.25 8.25 0 1.92.66 3.68 1.75 5.08L17.09 5.5C15.68 4.4 13.92 3.75 12 3.75zm6.5 3.17L6.92 18.5c1.4 1.1 3.16 1.75 5.08 1.75 4.56 0 8.25-3.69 8.25-8.25 0-1.92-.65-3.68-1.75-5.08zM1.75 12C1.75 6.34 6.34 1.75 12 1.75S22.25 6.34 22.25 12 17.66 22.25 12 22.25 1.75 17.66 1.75 12z"
                      />
                    </svg>
                  </div>
                  <div className="h-[60px]  px-[14px] py-[16px] text-[20px] font-semibold">
                    Block @{tweet.user.username}
                  </div>
                </div>
              </button>
            </div>
          )}
          {userId === user.userId && (
            <button
              type="submit"
              onClick={() => handleDelete()}
            >
              <div className="me flex h-[70px] flex-row text-warning  hover:bg-xx-light-gray dark:hover:bg-[#080808] ">
                <div className="py-5 pl-4">
                  <svg
                    viewBox="0 0 25 25"
                    className="h-[25px] w-[25px] "
                  >
                    <path
                      className=" fill-warning "
                      d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"
                    />
                  </svg>
                </div>
                <div className="h-[60px]  px-[14px] py-[16px] text-[20px] font-semibold">
                  Delete
                </div>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ActionsMenu;
