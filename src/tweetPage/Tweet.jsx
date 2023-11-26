/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactButtons from './reactButtons';
import Media from './Media';

function Tweet({ data }) {
  const [repost, toggleRepost] = useState(data.isRetweeted);
  const [reply, toggleReply] = useState(false);
  const [like, toggleLike] = useState(data.isLiked);
  const [repostsCount, setRepostsCount] = useState(data.retweetsCount);
  const [repliesCount, setRepliesCount] = useState(data.repliesCount);
  const [likesCount, setLikesCount] = useState(data.likesCount);
  const handleLike = () => {
    if (like === true) setLikesCount(likesCount - 1);
    else setLikesCount(likesCount + 1);
    toggleLike(!like);
  };
  const handleRepost = () => {
    if (repost === true) setRepostsCount(repostsCount - 1);
    else setRepostsCount(repostsCount + 1);
    toggleRepost(!repost);
  };
  const handleReply = () => {
    if (reply === true) setRepliesCount(repliesCount - 1);
    else setRepliesCount(repliesCount + 1);
    toggleReply(!reply);
  };

  return (
    <div className="tweet mt-[0.5px] flex w-[88%] flex-row  border-y-[0.5px] border-y-x-light-gray bg-white px-[16px] pt-[12px] hover:cursor-pointer hover:bg-xx-light-gray dark:bg-pure-black dark:text-white dark:hover:bg-pure-black md:w-[598px]">
      <div className="leftColumn mr-[12px] h-[40px] w-[40px] ">
        <div className={` pb-1 ${data.isRetweet === false ? 'hidden' : ''}`}>
          <svg
            viewBox="0 0 24 24"
            className="ml-[24px] h-[16px] w-[16px] fill-dark-gray  "
          >
            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
          </svg>
        </div>
        <div className="profileImage leftColumn mr-[12px] h-[40px] w-[40px] ">
          <img
            src={data.user.profileImageURL}
            alt="profileImage"
            className=" h-[40px] w-[40px] rounded-full object-cover"
          />
        </div>
      </div>

      <div className="rightColumn w-[512px] ">
        <div
          className={` retweeted-info h-[16px] pb-4 text-[13px] font-semibold
           text-dark-gray ${data.isRetweet === false ? 'hidden' : ''} `}
        >
          {' '}
          <span>{data.retweetedUser.screenName}</span> reposted
        </div>
        <div className="userInfo flex flex-row">
          <div className="name  text-[15px] font-bold">
            {data.user.screenName}
          </div>
          <div className="userName  overflow-hidden text-[15px] text-dark-gray">
            {' '}
            &ensp;@ <span>{data.user.userName}</span>
          </div>
          <div className="date overflow-hidden text-[15px] text-dark-gray">
            {' '}
            &ensp;.&ensp;<span>{data.createdAt}</span>
          </div>
        </div>
        <div className="caption"> {data.text}</div>
        <Media images={data.attachmentsURL} />
        <div className="buttons flex h-[32px] flex-row  justify-between">
          <button
            data-testid="reply"
            type="submit"
            onClick={() => handleReply()}
          >
            <ReactButtons
              type="Reply"
              data={repliesCount}
              clicked={reply}
            />
          </button>
          <button
            data-testid="repost"
            type="submit"
            onClick={() => handleRepost()}
          >
            <ReactButtons
              type="Repost"
              data={repostsCount}
              clicked={repost}
            />
          </button>
          <button
            data-testid="like"
            type="submit"
            onClick={() => handleLike()}
          >
            <ReactButtons
              type="Like"
              data={likesCount}
              clicked={like}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

Tweet.propTypes = {
  // eslint-disable-next-line no-undef
  data: PropTypes.object.isRequired,
};

export default Tweet;
