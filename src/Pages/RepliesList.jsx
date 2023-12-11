import React from 'react';
import PropTypes from 'prop-types';
import Reply from './Reply';

function RepliesList({ repliesData }) {
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
  // eslint-disable-next-line react/forbid-prop-types
  repliesData: PropTypes.array.isRequired,
  // emptyReplies: PropTypes.bool.isRequired,
};
export default RepliesList;
