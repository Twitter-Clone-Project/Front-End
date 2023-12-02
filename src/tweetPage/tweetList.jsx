import React from 'react';
import PropTypes from 'prop-types';
import Tweet from './Tweet';

function TweetList({ data }) {
  return (
    <div>
      {data.map((tweetItem) => (
        <Tweet data={tweetItem} />
      ))}
    </div>
  );
}

TweetList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf()).isRequired,
};
export default TweetList;
