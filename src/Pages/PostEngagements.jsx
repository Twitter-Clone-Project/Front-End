/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import PropTypes from 'prop-types';
import UserItem from '../components/userComponents/UserItem';
import ListNav from '../components/navigation-bars/ListNav';

function PostEngagements({ tweetID, setVisibility }) {
  // const location = useLocation();
  // const pastPath = location.state;

  // return (
  //   <div className="popup-screen absolute bottom-0 left-0 top-0 z-20 flex h-full w-full items-center justify-center p-2 md:bg-dark-gray md:bg-opacity-50">
  //     <BoxCard classes="overflow-auto">
  //       <div
  //         className=" border-b border-border-gray"
  //         data-testid="FollowingList_1"
  //       >
  //         <ListNav
  //           items={ListNavItems}
  //           pastPath={pastPath}
  //         />
  //       </div>
  //     </BoxCard>
  //   </div>
  // );
  // Get the past location for Back Button
  // const location = useLocation();
  // const pastPath = location.state;

  // Get the username from the URL params
  // const { username } = useParams('username');

  // Define navigation items for the ListNav component
  const ListNavItems = [
    {
      label: 'Likes',
      path: `/app/tweet/${tweetID}/likes`,
    },
    {
      label: 'Reposts',
      path: `/app/tweet/${tweetID}/reposts`,
    },
  ];
  const [users, setUsers] = useState([]);
  const [name, setName] = useState([]);
  const navigate = useNavigate();

  const handelBackButton = () => {
    // navigate(pastPath);
    setVisibility(false);
  };

  // Fetch the list of Follower users
  // useEffect(() => {
  //   fetch(
  //     `${import.meta.env.VITE_API_DOMAIN}users/${username}/followings`,
  //     {
  //       method: 'GET',
  //       origin: true,
  //       credentials: 'include',
  //       withCredentials: true,
  //     },
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setUsers(data.data.users);
  //       setName(data.data.name);
  //     })
  //     .catch((error) => {
  //       console.error('Error during fetch:', error);
  //     });
  // }, []);
  return (
    <div className="flex h-full min-h-screen w-full justify-center bg-white dark:bg-pure-black" data-testid="post-engagements">
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
                  {name}
                </span>
              </div>
              {/* <span
                className=" w-min text-sm leading-4 text-light-thin"
                data-popover-target="popover-user-profile"
              >
                @{username}
              </span> */}
            </div>
          </div>
          <div
            className=" border-b border-border-gray"
            data-testid="FollowingList_1"
          >
            <ListNav
              items={ListNavItems}
              pastPath=""
            />
          </div>
        </div>
        {/* <div data-testid="FollowingList_2">
          {users.map((user, index) => (
            <UserItem
              key={uuid4()}
              isFollowed={user.isFollowed}
              isFollowing={user.isFollowing}
              userPicture={user.imageurl}
              userName={user.name}
              userID={user.username}
              discription={user.bio}
              following={user.followingsCount}
              followers={user.followersCount}
              testID={index}
              itemID={user.userId}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
PostEngagements.propTypes = {
  tweetID: PropTypes.string.isRequired,
  setVisibility: PropTypes.func.isRequired,
};
export default PostEngagements;
