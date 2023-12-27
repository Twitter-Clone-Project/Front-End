//  ---------------------------------------------------
//                RepliesList Documentation
//  ---------------------------------------------------
//  RepliesList is responsile for receiving an array of replies
//  for a certain tweet and map over this array to show all the replies.

import React from 'react';
import PropTypes from 'prop-types';
import Reply from './Reply';

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

//  ---------------------------------------------------
//                RepliesList PropTypes
//  ---------------------------------------------------
//   repliesData: the state array conatining all the replies for a certain tweet
//   tweetId: the Id of the tweet for which we are rendering the replies
//   setReplies: the state function which controls the replies for a
//   certain tweet to be sent to the reply Component

RepliesList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  repliesData: PropTypes.array.isRequired,
  tweetId: PropTypes.string.isRequired,
  setReplies: PropTypes.func.isRequired,
  // emptyReplies: PropTypes.bool.isRequired,
};
export default RepliesList;
