import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Tweet from './Tweet';

function TweetList({ data, setTweets }) {
  const renderTweet = useMemo(
    () =>
      data.map((tweetItem) => (
        <Tweet
          key={`${tweetItem.id}-${tweetItem.isRetweet}`}
          data={tweetItem}
          tweets={data}
          setTweets={setTweets}
        />
      )),
    [data, setTweets],
  );
  return (
    <div
      data-testid="tweetList"
      id="tweet-list"
      className="w-full"
    >
      {renderTweet}
    </div>
  );
}
/**
 * @Component for displaying a list of tweets.
 * @param {Object} props - The component props.
 * @param {Array} props.data - The array of tweet data.
 * @param {function} props.setTweets - The function to update tweets.
 */
TweetList.propTypes = {
  /**
   * The array of tweet data.
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The unique ID of the tweet.
       */
      id: PropTypes.string.isRequired,
      /**
       * The user who posted the tweet.
       */
      user: PropTypes.shape({
        /**
         * The unique ID of the user.
         */
        userId: PropTypes.string.isRequired,
        /**
         * The username of the user.
         */
        username: PropTypes.string.isRequired,
        /**
         * The screen name of the user.
         */
        screenName: PropTypes.string.isRequired,
        /**
         * The URL of the user's profile image.
         */
        imageUrl: PropTypes.string,
      }),
      /**
       * The user who was retweeted in the tweet.
       */
      retweetedUser: PropTypes.shape({
        /**
         * The unique ID of the retweeted user.
         */
        userId: PropTypes.string,
        /**
         * The username of the retweeted user.
         */
        username: PropTypes.string,
        /**
         * The screen name of the retweeted user.
         */
        screenName: PropTypes.string,
        /**
         * The URL of the retweeted user's profile image.
         */
        imageUrl: PropTypes.string,
      }),
      /**
       * The creation date of the tweet.
       */
      createdAt: PropTypes.string.isRequired,
      /**
       * The text content of the tweet.
       */
      text: PropTypes.string.isRequired,
      /**
       * The number of likes on the tweet.
       */
      likesCount: PropTypes.number.isRequired,
      /**
       * The number of replies to the tweet.
       */
      repliesCount: PropTypes.number.isRequired,
      /**
       * The number of retweets of the tweet.
       */
      retweetsCount: PropTypes.number.isRequired,
      /**
       * Indicates whether the tweet is liked by the user.
       */
      isLiked: PropTypes.bool.isRequired,
      /**
       * Indicates whether the tweet is retweeted by the user.
       */
      isRetweeted: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  /**
   * The function to update tweets.
   * @param {Array} updatedTweets - The updated array of tweets.
   */
  setTweets: PropTypes.func.isRequired,
};
export default TweetList;
