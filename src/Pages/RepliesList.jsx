/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Reply from './Reply';

/**
 * RepliesList is responsible for receiving an array of replies for a certain tweet
 * and mapping over this array to display all the replies.
 * @param {Object} props - The properties passed to the RepliesList component.
 * @param {Array} props.repliesData - The state array containing all the replies for a certain tweet.
 * @param {string} props.tweetId - The ID of the tweet for which the replies are rendered.
 * @param {Function} props.setReplies - The function controlling the replies for a certain tweet to be sent to the Reply component.
 * @returns {JSX.Element} The JSX for displaying a list of replies.
 * @example
 * // Rendering RepliesList with sample data
 * const sampleReplies = [
 *   { replyId: '1', content: 'This is the first reply.' },
 *   { replyId: '2', content: 'This is the second reply.' },
 *   // ... other replies
 * ];
 *
 * // Within a parent component
 * function ParentComponent() {
 *   return (
 *     <RepliesList
 *       repliesData={sampleReplies}
 *       tweetId="tweet_123"
 *       setReplies={(updatedReplies) => {
 *         // Logic to update the replies in the parent component
 *       }}
 *     />
 *   );
 * }
 */
function RepliesList({ repliesData, setReplies, tweetId }) {
  // console.log(repliesData);
  return (
    <div data-testid="replies-list">
      {repliesData.length === 0 ? (
        ''
      ) : (
        <div className="w-full">
          {repliesData.map((replyItem, index) => (
            <Reply
              data={replyItem}
              replies={repliesData}
              setReplies={setReplies}
              tweetId={tweetId}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

RepliesList.propTypes = {
  /**
   * The state array containing all the replies for a certain tweet.
   */
  repliesData: PropTypes.array.isRequired,
  /**
   * The ID of the tweet for which the replies are being rendered.
   */
  tweetId: PropTypes.string.isRequired,
  /**
   * The function controlling the replies for a certain tweet.
   */
  setReplies: PropTypes.func.isRequired,
};
export default RepliesList;
