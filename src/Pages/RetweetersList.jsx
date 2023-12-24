/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/AuthContext';
import UserItem from '../components/userComponents/UserItem';
import ListNav from '../components/navigation-bars/ListNav';

function RetweetersList() {
  // Get the past location for Back Button
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { tweetId } = useParams('tweetId');
  const [retweetsData, setRetweetsData] = useState();

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

  const navigate = useNavigate();

  const handelBackButton = () => {
    navigate(-1);
  };

  // Fetch the list of retweeters
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_DOMAIN}tweets/${tweetId}/retweeters`, {
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
        setRetweetsData(data.data);
        // console.log(data.data);
      })
      .catch((error) => {
        toast('Error during fetch:', error);
      });
  }, [tweetId]);

  return (
    <div
      className="flex h-full min-h-screen w-full justify-center bg-white dark:bg-pure-black
      sm:w-[560px] 
      md:w-[600px]
      xl:w-[600px]
      small:w-screen
      "
      data-testid="retweeters-list"
    >
      <div className="w-full overflow-y-clip border-x  border-x-x-light-gray bg-white dark:border-border-gray dark:bg-pure-black">
        <div className="flex flex-row border-b border-x-light-gray pt-4 hover:cursor-pointer dark:border-border-gray">
          <div className="flex h-[53px] px-4 ">
            <div className="flex items-center">
              <div
                className="mb-2 mt-[9px] flex h-9 w-9 items-center justify-center rounded-full hover:bg-x-light-gray dark:hover:bg-[#181919]"
                onClick={handelBackButton}
                data-testid="retweeters-list-backbtn"
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
          </div>
          <div
            className=" w-full"
            data-testid="retweeters-list-1"
          >
            <ListNav
              items={ListNavItems}
              pastPath={pathname}
            />
          </div>
        </div>
        <div data-testid="retweeters-list-2">
          {retweetsData
            ? retweetsData.map((userItem, index) => (
                <UserItem
                  key={uuid4()}
                  isFollowed={userItem.isFollowed}
                  isFollowing={userItem.isFollowing}
                  userPicture={
                    user.profileImageUrl || import.meta.env.VITE_DEFAULT_AVATAR
                  }
                  userName={userItem.name}
                  userID={userItem.screenName}
                  discription={userItem.bio}
                  following={userItem.followingsCount}
                  followers={userItem.followersCount}
                  testID={index}
                  itemID={userItem.id}
                />
              ))
            : ''}
        </div>
      </div>
    </div>
  );
}

export default RetweetersList;
