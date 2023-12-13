import React, { useEffect, useState } from 'react';
import SearchBar from '../search-bar/SearchBar';
import { Link } from 'react-router-dom';

function TrandsPage() {
  const [trands, setTrends] = useState([]);
  const [value, setValue] = useState([]);
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

  return (
    <div className="flex w-full flex-col border-x-[1px] border-[#f6f8f9] dark:border-[#252829]">
      <div className="border-b-[1px] border-[#f6f8f9] px-2 py-1 dark:border-[#252829]">
        <SearchBar
          setValue={setValue}
          value={value}
        />
      </div>
      {trands &&
        trands.map((trand) => (
          <Link
            key={trand.trendId}
            to={`/app/search/${trand.name}`}
            className="text-black hover:no-underline dark:text-white "
          >
            <div
              className={` px-4 py-3 text-[15px] hover:bg-[#f7f7f7]  dark:hover:bg-[#070707]`}
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
  );
}

export default TrandsPage;
