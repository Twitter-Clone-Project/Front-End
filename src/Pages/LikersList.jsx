/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import { useAuth } from '../hooks/AuthContext';
import UserItem from '../components/userComponents/UserItem';
import ListNav from '../components/navigation-bars/ListNav';

function LikersList() {
  // Get the past location for Back Button
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { tweetId } = useParams('tweetId');
  const [likesData, setLikesData] = useState();

  // Define navigation items for the ListNav component
  const ListNavItems = [
    {
      label: 'Likes',
      path: `/app/tweets/${tweetId}/likes`,
    },
    {
      label: 'Retweets',
      path: `/app/tweets/${tweetId}/retweets`,
    },
  ];

  // const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handelBackButton = () => {
    navigate(`/app/tweets/${tweetId}`);
  };

  // Fetch the list of likers
  useEffect(() => {
    console.log(tweetId.tweetId, user);
    fetch(`${import.meta.env.VITE_API_DOMAIN}tweets/${tweetId}/likers`, {
      method: 'GET',
      origin: true,
      credentials: 'include',
      withCredentials: true,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLikesData(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.error('Error during fetch:', error);
      });
  }, [tweetId]);

  return (
    <div className="flex h-full min-h-screen w-full justify-center bg-white dark:bg-pure-black">
      <div className="w-full overflow-y-clip bg-white dark:bg-pure-black">
        <div className=" flex h-28 flex-col hover:cursor-pointer">
          <div className="flex h-[53px] flex-row px-4 ">
            <div className=" w-14">
              <div
                className="mb-2 mt-[9px] flex h-9 w-9 items-center justify-center rounded-full hover:bg-x-light-gray dark:hover:bg-[#181919]"
                onClick={handelBackButton}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className=" h-5 w-5 text-black dark:text-x-light-gray"
                >
                  <g>
                    <path
                      d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="mb-[3px] mt-[6px] flex flex-col">
              <div className=" h-7 py-0.5">
                <span
                  className=" cursor-pointer text-[20px] font-bold leading-6 text-pure-black hover:underline dark:text-white"
                  data-popover-target="popover-user-profile"
                >
                  {user.name}
                </span>
              </div>
              <span
                className=" w-min text-sm leading-4 text-light-thin"
                data-popover-target="popover-user-profile"
              >
                @{user.username}
              </span>
            </div>
          </div>
          <div
            className=" border-b border-border-gray"
            data-testid="FollowerList_1"
          >
            <ListNav
              items={ListNavItems}
              pastPath={pathname}
            />
          </div>
        </div>
        <p className="text-white">
          {likesData && likesData.length > 0 && likesData[0].screenName}
        </p>
        {/* <div data-testid="FollowerList_2">
          {users.map((userDetails, index) => (
            <UserItem
              key={uuid4()}
              isFollowed={userDetails.isFollowed}
              isFollowing="false"
              userPicture={
                user.profileImageUrl || import.meta.env.VITE_DEFAULT_AVATAR
              }
              userName={user.name}
              userID={user.username}
              discription=""
              following="0"
              followers="0"
              testID={index}
              itemID={userDetails.id}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default LikersList;
