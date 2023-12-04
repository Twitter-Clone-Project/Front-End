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
        <div className="w-screen sm:w-full">
          {repliesData.map((replyItem) => (
            <Reply data={replyItem} />
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
