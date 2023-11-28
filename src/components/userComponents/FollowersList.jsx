/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import UserItem from './UserItem';
import ListNav from '../navigation-bars/ListNav';

function FollowersList() {
  // Get the past location for Back Button
  const location = useLocation();
  const pastPath = location.state;

  // Get the username from the URL params
  const { username } = useParams('username');

  // Define navigation items for the ListNav component
  const ListNavItems = [
    {
      label: 'Following',
      path: `/${username}/following`,
    },
    {
      label: 'Followers',
      path: `/${username}/followers`,
    },
  ];

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handelBackButton = () => {
    navigate(pastPath);
  };

  // Fetch the list of Following users
  useEffect(() => {
    fetch('https://6548ef1edd8ebcd4ab23e882.mockapi.io/Xproject/followers')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <div className="flex h-full min-h-screen w-full justify-center bg-white dark:bg-pure-black">
      <div className="w-full overflow-y-clip bg-white dark:bg-pure-black">
        <div className=" flex h-28 flex-col">
          <div className="flex h-[53px] flex-row px-4 ">
            <div className=" w-14">
              <div
                className="mb-2 mt-[9px] flex h-9 w-9 items-center justify-center rounded-full hover:bg-black"
                onClick={handelBackButton}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className=" h-5 w-5 text-x-light-gray"
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
                  The user Name
                </span>
              </div>
              <span
                className=" w-min text-sm leading-4 text-light-thin"
                data-popover-target="popover-user-profile"
              >
                @{username}
              </span>
            </div>
          </div>
          <div
            className=" border-b border-border-gray"
            data-testid="FollowerList_1"
          >
            <ListNav
              items={ListNavItems}
              pastPath={pastPath}
            />
          </div>
        </div>
        <div data-testid="FollowerList_2">
          {users.map((user, index) => (
            <UserItem
              key={uuid4()}
              isFollowed={user.isFollowed}
              isFollowing={user.isFollowing}
              userPicture={user.avatar}
              userName={user.userName}
              userID={user.userId}
              discription={user.discription}
              following={user.following}
              followers={user.followers}
              testID={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FollowersList;
