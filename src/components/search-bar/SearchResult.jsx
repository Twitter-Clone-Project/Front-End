/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

function SearchResult({ data }) {
  useEffect(() => {
    console.log(data);
  });
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/app/${data.username}`);
  };
  return (
    <div
      className="flex h-[70px] w-full flex-wrap items-center justify-center px-4 py-2  hover:cursor-pointer hover:bg-hover-layout"
      onClick={() => {
        handleClick();
      }}
      data-testid={`search-result-${data.id}`}
    >
      <div className="w-1/6">
        <img
          src={data.displayPicture || import.meta.env.VITE_DEFAULT_AVATAR}
          alt="dp"
          className="h-[40px] w-[40px] rounded-full"
        />
      </div>
      <div className="flex w-5/6 flex-col text-base font-medium ">
        <span className="font-semibold dark:text-white">{data.screenName}</span>
        <span className="text-sm text-light-gray">@{data.username}</span>
      </div>
    </div>
  );
}

SearchResult.propTypes = {
  data: PropTypes.string.isRequired,
};
export default SearchResult;
