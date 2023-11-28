import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/AuthContext';
import Button from '../form-controls/Button';

function UserProfileInfo() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { username, name, pic, followers, following } = {
    username: user.username,
    name: user.name,
    pic: 'https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2023/06/1280/1280/084702d2-messi1.jpg?ve=1&tl=1',
    followers: 12,
    following: 10,
  };
  return (
    <div className="relative cursor-auto bg-white bg-opacity-100 p-4 text-black dark:bg-pure-black dark:text-white">
      <div className="absolute -top-0 z-10 flex aspect-square w-1/4 min-w-[3rem] -translate-y-1/2 justify-between">
        <img
          id="popoverImg"
          src={pic}
          alt=""
          className="h-auto cursor-pointer rounded-full border-4 border-pure-black"
        />
      </div>
      <div className="mb-4 flex min-h-[50px] w-full justify-end">
        <div className="w-[50%] max-w-[8rem]">
          <Button
            label="Edit Profile"
            labelColor="black"
            labelColorDark="white"
            backGroundColorDark="black"
            backGroundColor="white"
            className="bg-pure-black text-white"
            onClick={() => null}
          />
        </div>
      </div>
      <div className="mb-5 mt-2">
        <div className="flex h-[41.5px] flex-col">
          <span className="text-xl font-bold capitalize text-pure-black dark:text-white">
            {name}
          </span>
          <div className="flex h-5 flex-row items-center">
            <span className="w-min text-light-thin">@{username}</span>
          </div>
        </div>
      </div>
      <div>
        <span className="flex text-base font-thin text-light-thin">
          <svg
            viewBox="0 0 24 24"
            width="18px"
          >
            <g>
              <path
                className="fill-light-thin text-xs"
                d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"
              />
            </g>
          </svg>
          <span className="px-2">Joined October 2023</span>
        </span>
      </div>
      <div className="mt-1 flex flex-row flex-wrap">
        <div
          role="button"
          tabIndex={-6}
          data-testid="following-btn"
          onKeyDown={() => navigate(`/app/${username}/following`)}
          onClick={() => navigate(`/app/${username}/following`)}
        >
          <span className="mr-2 cursor-pointer text-pure-black hover:underline dark:text-white">
            {following}
            <span className="text-light-thin"> Following</span>
          </span>
        </div>
        <div
          role="button"
          data-testid="followers-btn"
          tabIndex={-6}
          onKeyDown={() => navigate(`/app/${username}/follower`)}
          onClick={() => navigate(`/app/${username}/follower`)}
        >
          <span className="mr-5  cursor-pointer text-pure-black hover:underline dark:text-white">
            {followers}
            <span className="text-light-thin"> Followers</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserProfileInfo;
