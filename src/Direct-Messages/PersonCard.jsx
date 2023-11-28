import React from 'react';
import PropTypes from 'prop-types';

function PersonCard({
  image,
  name,
  tag,
  date,
  followers,
  followerImage,
  followerName,
  imgRef,
}) {
  return (
    <div className="mb-4 flex h-[271.555px] w-full flex-col  items-center border-b-[1px] border-[#f6f8f9] px-4 py-5 hover:bg-[#f0f3f3] dark:border-[#252829] dark:bg-black dark:hover:bg-[#16171a]">
      <div className=" h-[68px] w-[68px]">
        <img
          ref={imgRef}
          src={image}
          alt=""
          className="h-16 w-16 rounded-full"
        />
      </div>
      <div className="mb-1 flex flex-col">
        <p className="  text-center text-base font-bold text-black dark:text-white">
          {name}
        </p>
        <p className="text-center text-base text-[#71767B]">{tag}</p>
      </div>
      <div className="my-3 flex flex-row ">
        <div className="text-center text-sm text-[#71767B]">Joined {date}</div>
        <div className="px-1 text-sm text-[#71767B]">.</div>
        <div className="text-center text-sm text-[#71767B]">
          {followers} Followers
        </div>
      </div>
      <div className="flex flex-row">
        <div>
          <img
            className="h-4 w-4 rounded-full"
            src={followerImage}
            alt=""
          />
        </div>
        <div className="ml-3 text-center text-xs text-[#71767B]">
          Followed by {followerName}
        </div>
      </div>
    </div>
  );
}

PersonCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  followerName: PropTypes.string.isRequired,
  followerImage: PropTypes.string.isRequired,
  imgRef: PropTypes.object.isRequired,
};

export default PersonCard;
