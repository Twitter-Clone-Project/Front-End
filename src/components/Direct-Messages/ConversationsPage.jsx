/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ConversationSearchBar from './ConversationSearchBar';
import ConversationsHistory from './ConversationHistory';
import SearchResults from './SearchResults';
import Header from './Header';

function ConversationsPage({ visibility, socket }) {
  const [searchValue, setSearchValue] = useState('');
  const [mode, setMode] = useState(false);

  if (visibility)
    return (
      <div className="flex h-screen w-full flex-col border-x-[1px] border-[#f6f8f9] dark:border-[#252829] dark:bg-black dark:text-white md:min-w-[600px] lg:min-w-[318px] xl:min-w-[448px]">
        <Header
          title="Messages"
          path="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5V12h-2v-1.537l-8 3.635-8-3.635V18.5c0 .276.224.5.5.5H13v2H4.498c-1.381 0-2.5-1.119-2.5-2.5v-13zm2 2.766l8 3.635 8-3.635V5.5c0-.276-.224-.5-.5-.5h-15c-.276 0-.5.224-.5.5v2.766zM19 18v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"
          type="Messages"
          image=""
          imgVisible={true}
        />

        <div>
          <ConversationSearchBar
            setValue={setSearchValue}
            active={mode}
            setActive={setMode}
          />
        </div>
        <div className="overflow-y-auto no-scrollbar">
          {!mode && <ConversationsHistory socket={socket} />}
          {mode && <SearchResults searchValue={searchValue} />}
        </div>
      </div>
    );
}

export default ConversationsPage;
