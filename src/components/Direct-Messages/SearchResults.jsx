/* eslint-disable max-len */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SearchCard from './SearchCard';
import { ChatContext } from '../../hooks/ContactContext';

/**
 * Displays search results based on the provided search value.
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.searchValue - The value used for filtering conversations.
 * @returns {JSX.Element} JSX for displaying filtered search results.
 * @example
 * ```jsx
 *  <SearchResults searchValue={searchValue} />
 * ```
 */
function SearchResults({ searchValue }) {
  const { conversations } = useContext(ChatContext);

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
SearchResults.propTypes = {
  /**
   *  The value used for filtering conversations.
   */
  searchValue: PropTypes.string.isRequired,
};
