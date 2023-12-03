import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import Tweet from '../tweetPage/Tweet';

function RepliesList({ repliesData, emptyReplies }) {
  // const [repliesLoading, setRepliesLoading] = useState(false);
  return (
    <div data-testid="replies-list">
      {repliesData.length === 0 && emptyReplies === false ? (
        <Spinner />
      ) : (
        <div className="w-screen sm:w-full">
          {repliesData.map((replyItem) => (
            <Tweet data={replyItem} />
          ))}
        </div>
      )}
    </div>
  );
}

RepliesList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  repliesData: PropTypes.array.isRequired,
  emptyReplies: PropTypes.bool.isRequired,
};
export default RepliesList;
