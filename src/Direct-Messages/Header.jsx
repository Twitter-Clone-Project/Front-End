import React from 'react';
import PropTypes from 'prop-types';

function Header({ title, path, type }) {
  return (
    <div>
      <div className="flex h-[53px] items-center justify-between px-4">
        <div className=" w-full">
          <div
            className={`${type !== 'Messages' ? 'text-[17px] ' : 'text-[20px] '}
            py-[2px] font-bold dark:text-white`}
          >
            {title}
          </div>
        </div>
        <div>
          <button type="button">
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full hover:bg-[#e7e7e7] dark:hover:bg-[#181919]">
              <svg
                className="h-5 w-5 fill-black dark:fill-white"
                viewBox="0 0 24 24"
              >
                <path d={path} />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Header;
