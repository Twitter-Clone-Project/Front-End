import React from 'react';
import PropTypes from 'prop-types';

function SearchResult({ data }) {
  return (
    <div className="flex h-[60px] w-full flex-wrap items-center justify-center px-4 py-2 hover:bg-black">
      <div className="w-1/6">
        <img
          src={data.displayPicture || import.meta.env.VITE_DEFAULT_AVATAR}
          alt="dp"
          className="h-[40px] w-[40px] rounded-full"
        />
      </div>
      <div className="flex w-5/6 flex-col text-base font-medium ">
        <span className="font-semibold dark:text-white">{data.name}</span>
        <span className="text-sm text-light-gray">{data.userName}</span>
      </div>
    </div>
  );
}

SearchResult.propTypes = {
  data: PropTypes.string.isRequired,
};
export default SearchResult;
