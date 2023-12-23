/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Tweet from './Tweet';

function TweetList({ data, setTweets }) {
  const renderTweet = useMemo(
    () =>
      data.map((tweetItem) => (
        <Tweet
          key={tweetItem.id}
          data={tweetItem}
          tweets={data}
          setTweets={setTweets}
        />
      )),
    [data],
  );
  return <div className="w-full">{renderTweet}</div>;
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
