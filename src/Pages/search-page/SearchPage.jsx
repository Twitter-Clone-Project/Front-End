import React, { useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router';
import OwnToaster from '../../components/OwnToaster';
import SearchBar from '../../components/search-bar/SearchBar';
import ListNav from '../../components/navigation-bars/ListNav';

function SearchPage() {
  const [value, setValue] = useState('');
  const location = useLocation();
  const pastPath = location.state?.pastPath;
  const navigate = useNavigate();
  const handelBackButton = () => {
    navigate(pastPath.pathname || -1);
  };
  const ListNavItems = [
    {
      label: 'Tweets',
      path: `/app/search/tweets`,
    },
    {
      label: 'People',
      path: `/app/search/users`,
    },
  ];
  return (
    <div className="flex w-full max-w-[620px] flex-col border-border-gray sm:border-x-[1px]">
      <div className="flex w-full flex-row gap-16 border-b-[0.5px] border-b-light-gray px-2 py-2 dark:border-b-border-gray md:gap-24">
        <div className="flex h-[58px] items-start pl-2">
          <div className="flex h-full items-center">
            <div
              className="mb-2 mt-[9px] flex h-7 w-7 items-center justify-center rounded-full hover:bg-x-light-gray hover:dark:bg-light-thin"
              data-testid="tweet-page-backbtn"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className=" h-5 w-5 cursor-pointer dark:text-x-light-gray"
                onClick={handelBackButton}
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
        <div className="flex w-[60%] justify-center">
          <SearchBar
            value={value}
            setValue={setValue}
          />
        </div>
      </div>
      <div
        // data-testid={`${username}-profile`}
        className="border-x-0 border-light-gray dark:border-border-gray dark:text-white sm:border-x-[1px]"
      >
        <div
          className={`
               border-light-gray dark:border-border-gray`}
        >
          <ListNav items={ListNavItems} />
        </div>
        <Outlet />
      </div>
      <OwnToaster />
    </div>
  );
}

// SearchPage.propTypes = {
//   value: PropTypes.string.isRequired,
//   setValue: PropTypes.string.isRequired,
//   // eslint-disable-next-line react/forbid-prop-types
//   //   tweetData: PropTypes.array.isRequired,
// };

export default SearchPage;
