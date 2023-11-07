import React, { useState } from 'react';
import ConversationSearchBar from './ConversationSearchBar';
import ConversationsHistory from './ConversationHistory';
import SearchResults from './SearchResults';

// eslint-disable-next-line react/prop-types
function ConversationsPage() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedTag, setSelectedTag] = useState('±');
  const [mode, setMode] = useState(false);

  return (
    <div className="h-screen w-full border-x border-[#f0f3f4] bg-white text-black dark:border-[#1e2122] dark:bg-black dark:text-white">
      <div className="flex h-[53px] items-center justify-between px-4">
        <div className="w-full">
          <div className=" py-[2px] text-[20px] ">Messages</div>
        </div>
        <div>
          <button
            className=""
            type="button"
          >
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full hover:bg-[#e7e7e7] dark:hover:bg-[#181919]">
              <svg
                className="h-5 w-5 fill-black dark:fill-white"
                viewBox="0 0 24 24"
              >
                <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5V12h-2v-1.537l-8 3.635-8-3.635V18.5c0 .276.224.5.5.5H13v2H4.498c-1.381 0-2.5-1.119-2.5-2.5v-13zm2 2.766l8 3.635 8-3.635V5.5c0-.276-.224-.5-.5-.5h-15c-.276 0-.5.224-.5.5v2.766zM19 18v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
      <ConversationSearchBar
        setValue={setSearchValue}
        active={mode}
        setActive={setMode}
      />
      {!mode && (
        <ConversationsHistory
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      )}

      {mode && (
        <SearchResults
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          searchValue={searchValue}
        />
      )}
    </div>
  );
}

export default ConversationsPage;
