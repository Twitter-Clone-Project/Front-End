import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import Tweet from '../tweetPage/Tweet';

function RepliesList({ repliesData, setRepliesData, tweetId }) {
  // const [repliesLoading, setRepliesLoading] = useState(false);

  useEffect(() => {
    if (repliesData.length !== 0) return;
    // setRepliesLoading(true);
    const controller = new AbortController();
    const getData = async () => {
      try {
        const res = await fetch(
          `http://${import.meta.env.VITE_API_DOMAIN}tweets/${tweetId}/replies`,
          {
            signal: controller.signal,
          },
        );
        const data = await res.json();
        if (data.status === false) throw new Error(data.message);
        else {
          setRepliesData(data.data);
        }
      } catch (err) {
        if (err.name !== 'AbortError') toast(err.message);
      } finally {
        // setRepliesLoading(false);
      }
    };
    getData();
    return () => {
      controller.abort();
    };
  });
  return (
    <div data-testid="replies-list">
      {repliesData.length === 0 ? (
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
  setRepliesData: PropTypes.func.isRequired,
  tweetId: PropTypes.string.isRequired,
};
export default RepliesList;
