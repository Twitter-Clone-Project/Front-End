import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../search-bar/SearchBar';

function RightNavBar() {
  const [trands, setTrends] = useState([]);
  const [value, setValue] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}trends`, {
        method: 'GET',
        origin: true,
        credentials: 'include',
        withCredentials: true,
      });
      const Json = await response.json();
      const { data } = Json;
      setTrends(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.outerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  if (windowWidth >= 1003)
    return (
      <div
        className={`${
          windowWidth <= 1092 ? 'w-[290px]' : 'w-[350px]'
        } flex flex-col gap-3`}
      >
        <SearchBar
          setValue={setValue}
          value={value}
        />
        <div className="rou flex flex-col rounded-2xl bg-[#f7f8f8] text-black hover:rounded-2xl dark:bg-[#16181c] dark:text-white ">
          <div className="w-full px-4 py-3 text-[20px] font-bold">
            What’s happening
          </div>
          <div className="flex w-full  flex-col ">
            {trands &&
              trands.slice(0, 6).map((trand) => (
                <Link
                  key={trand.trendId}
                  to={`/app/search/${trand.name}`}
                  className="text-black hover:no-underline dark:text-white "
                >
                  <div
                    className={` px-4 py-3 text-[15px]
                     hover:bg-[#edf0f0]  dark:hover:bg-[#1d1e21]`}
                  >
                    <div className="font-bold">#{trand.name}</div>
                    <div className="mt-1 text-dark-gray">
                      {trand.count < 1000
                        ? trand.count
                        : (trand.count / 1000).toFixed(2)}
                      {trand.count < 1000 ? '' : 'K'} posts
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <Link
            to="/app/explore"
            className="text-black hover:no-underline dark:text-white "
          >
            <div className=" w-full px-4  py-3 text-[15px] text-blue hover:bg-[#edf0f0]  dark:hover:bg-[#1d1e21]  ">
              Show more
            </div>
          </Link>
        </div>
      </div>
    );
}

export default RightNavBar;
