import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SearchCard from './SearchCard';
import { ChatContext } from '../../hooks/ContactContext';

function SearchResults({ searchValue }) {
  const { conversations, setOpenedId } = useContext(ChatContext);

  const filteredConversations = conversations.filter((conversation) =>
    conversation.contact.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
  return (
    <div data-testid="try-searching">
      {searchValue === '' && (
        <div className=" mt-8 flex items-center justify-center text-center text-[15px] text-[#536471] dark:text-[#71767B]">
          Try searching for people, groups, or messages
        </div>
      )}
      {searchValue !== '' && (
        <div data-testid="conversationshistory">
          {filteredConversations.map((conversation) => (
            <SearchCard
              key={conversation.conversationId}
              conversationData={conversation}
              setOpenedId={setOpenedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

SearchResults.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

export default SearchResults;
