import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid4 } from 'uuid';
import Tweet from './Tweet';

function TweetList({ data }) {
  return (
    <div>
      {data.map((tweetItem) => (
        <Tweet
          key={uuid4()}
          data={tweetItem}
        />
      ))}
    </div>
  );
}

TweetList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        screenName: PropTypes.string.isRequired,
        profileImageURL: PropTypes.string,
      }),
      retweetedUser: PropTypes.shape({
        userId: PropTypes.string,
        username: PropTypes.string,
        screenName: PropTypes.string,
        profileImageURL: PropTypes.string,
      }),
      createdAt: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      likesCount: PropTypes.number.isRequired,
      repliesCount: PropTypes.number.isRequired,
      retweetsCount: PropTypes.number.isRequired,
      isLiked: PropTypes.bool.isRequired,
      isRetweeted: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
export default TweetList;
