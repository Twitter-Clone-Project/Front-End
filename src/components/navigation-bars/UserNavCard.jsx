import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

function UserNavCard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  // console.log(location);
  const { username, name, pic, followers, following } = {
    username: user.username,
    name: user.name,
    pic: user.imageUrl || import.meta.env.VITE_DEFAULT_AVATAR,
    followers: user.followersCount,
    following: user.followingsCount,
  };
  return (
    <div className="cursor-auto bg-white bg-opacity-100 p-4 text-black dark:bg-pure-black dark:text-white">
      <div className="flex w-full flex-row justify-between">
        <Link
          to={`/app/${username}`}
          className="hover:no-underline"
        >
          <img
            id="popoverImg"
            src={pic}
            alt=""
            className=" h-12 w-12 rounded-full"
          />
        </Link>
      </div>
      <div className=" mt-2">
        <div className="flex h-[41.5px] flex-col">
          <Link
            to={`/app/${username}`}
            className="hover:no-underline"
          >
            <label
              htmlFor="popoverImg"
              className="cursor-pointer text-[15px] font-bold text-pure-black hover:underline dark:text-white"
            >
              {name}
            </label>
            <div className="flex h-5 flex-row items-center">
              <span className=" w-min cursor-pointer text-light-thin">
                @{username}
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-3 flex flex-row flex-wrap text-sm">
        <div
          role="button"
          tabIndex={-6}
          data-testid="following-btn"
          onKeyDown={() =>
            navigate(`/app/${username}/following`, { state: location.pathname })
          }
          onClick={() =>
            navigate(`/app/${username}/following`, { state: location.pathname })
          }
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
          onKeyDown={() =>
            navigate(`/app/${username}/followers`, { state: location.pathname })
          }
          onClick={() =>
            navigate(`/app/${username}/followers`, { state: location.pathname })
          }
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

export default UserNavCard;
