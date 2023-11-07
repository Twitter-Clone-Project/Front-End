/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

function SearchCard({ image, name, tag, selectedTag, setSelectedTag }) {
  return (
    <div
      onClick={() => {
        setSelectedTag(tag);
      }}
      className={`${
        tag === selectedTag
          ? 'bg-[#f0f3f3] dark:bg-[#1e2023]'
          : 'bg-white dark:bg-black'
      } flex h-[73px] w-full p-4 hover:bg-xx-light-gray 
        dark:hover:bg-[#16171a]`}
    >
      <div>
        <img
          src={image}
          alt=""
          className="mr-3 h-10 w-10 rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <div className="text-base font-bold text-black dark:text-white">
          {name}
        </div>
        <div className=" text-base text-[#71767B]">{tag}</div>
      </div>
    </div>
  );
}

SearchCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  selectedTag: PropTypes.string.isRequired,
  setSelectedTag: PropTypes.func.isRequired,
};

export default SearchCard;
