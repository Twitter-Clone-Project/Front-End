import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../search-bar/SearchBar';

function TrandsPage() {
  const [trands, setTrends] = useState([]);
  const [value, setValue] = useState('');

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
    <div
      className="flex h-screen w-full flex-col border-x-[1px] border-[#E1E8ED] dark:border-[#252829]
    sm:w-[560px] 
    md:w-[600px] 
    xl:w-[600px]
    small:w-screen
    "
    >
      <div className="border-b-[1px]  border-[#E1E8ED] px-2 py-1 dark:border-[#252829]">
        <SearchBar
          setValue={setValue}
          value={value}
        />
      </div>
      <div className="overflow-y-auto no-scrollbar">
        {trands &&
          trands.map((trand) => (
            <Link
              key={trand.trendId}
              to={`/app/search/tweets?q=${trand.name}`}
              className="text-black hover:no-underline dark:text-white "
            >
              <div
                className={` px-4 py-3 text-[15px] hover:bg-[#f7f7f7]  
              dark:hover:bg-[#070707]`}
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
    </div>
  );
}

export default TrandsPage;
