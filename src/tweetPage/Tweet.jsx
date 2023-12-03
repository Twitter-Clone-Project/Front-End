/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactTimeAgo from 'react-time-ago';
import { v4 as uuid4 } from 'uuid';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ReactButtons from './reactButtons';
import Media from './Media';
import OwnToaster from '../components/OwnToaster';
import ActionsMenu from './ActionsMenu';
import PopoverUserCard from '../components/userComponents/PopoverUserCard';

function Tweet({ data, tweets, setTweets }) {
  const [repost, toggleRepost] = useState(data.isRetweeted);
  const [reply, toggleReply] = useState(data.isReplied);
  const [like, toggleLike] = useState(data.isLiked);
  const [repostsCount, setRepostsCount] = useState();
  const [repliesCount, setRepliesCount] = useState();
  const [likesCount, setLikesCount] = useState();
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isRepostLoading, setIsRepostLoading] = useState(false);

  useEffect(() => {
    toggleLike(data.isLiked);
    toggleRepost(data.isRetweeted);
    toggleReply(data.isReplied);
    setLikesCount(data.likesCount);
    setRepliesCount(data.repliesCount);
    setRepostsCount(data.retweetsCount);
  }, [data]);
  const handleLike = () => {
    if (like === true && !isLikeLoading) {
      setIsLikeLoading(true);
      const deleteLike = async () => {
        try {
          const response = await fetch(
            `http://${import.meta.env.VITE_API_DOMAIN}tweets/${
              data.id
            }/deleteLike`,
            {
              origin: true,
              credentials: 'include',
              withCredentials: true,
              method: 'DELETE',
            },
          );
          const res = await response.json();
          if (res.status) {
            toggleLike(!like);
            setLikesCount(likesCount - 1);
          }
        } catch (err) {
          toast(err.message);
        } finally {
          setIsLikeLoading(false);
        }
      };

      deleteLike();
    } else if (like === false && !isLikeLoading) {
      setIsLikeLoading(true);
      const postLike = async () => {
        try {
          const response = await fetch(
            `http://${import.meta.env.VITE_API_DOMAIN}tweets/${
              data.id
            }/addlike`,
            {
              origin: true,
              credentials: 'include',
              withCredentials: true,
              method: 'POST',
            },
          );
          const res = await response.json();
          if (res.status) {
            setLikesCount(likesCount + 1);
            toggleLike(!like);
          }
        } catch (err) {
          toast(err.message);
        } finally {
          setIsLikeLoading(false);
        }
      };

      postLike();
    }
  };
  const handleRepost = () => {
    if (repost === true && !isRepostLoading) {
      setIsLikeLoading(true);
      const deleteRetweet = async () => {
        try {
          const response = await fetch(
            `http://${import.meta.env.VITE_API_DOMAIN}tweets/${
              data.id
            }/deleteRetweet`,
            {
              origin: true,
              credentials: 'include',
              withCredentials: true,
              method: 'DELETE',
            },
          );
          const res = await response.json();
          if (res.status) {
            toggleRepost(!repost);
            setRepostsCount(repostsCount - 1);
          }
        } catch (err) {
          toast(err.message);
        } finally {
          setIsRepostLoading(false);
        }
      };

      deleteRetweet();
    } else if (repost === false && !isRepostLoading) {
      setIsRepostLoading(true);
      const retweet = async () => {
        try {
          const response = await fetch(
            `http://${import.meta.env.VITE_API_DOMAIN}tweets/${
              data.id
            }/retweet`,
            {
              origin: true,
              credentials: 'include',
              withCredentials: true,
              method: 'POST',
            },
          );
          const res = await response.json();
          if (res.status) {
            toggleRepost(!repost);
            setRepostsCount(repostsCount + 1);
          }
        } catch (err) {
          toast(err.message);
        } finally {
          setIsRepostLoading(false);
        }
      };
      retweet();
    }
  };

  const handleReply = () => {
    if (reply === true) setRepliesCount(repliesCount - 1);
    else setRepliesCount(repliesCount + 1);
    toggleReply(!reply);
    // console.log(tweetID);
  };

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div className="tweet mb-[0.5px] mt-[-0.5px] flex w-[88%] border-collapse  flex-row border-y-[0.5px] border-y-border-gray bg-white px-[16px] pt-[12px] hover:cursor-pointer hover:bg-xx-light-gray dark:bg-pure-black dark:text-white dark:hover:bg-pure-black md:w-[598px]">
      <div className="leftColumn mr-[12px] h-[40px] w-[40px] ">
        <div className={` pb-1 ${repost === false ? 'hidden' : ''}`}>
          <svg
            viewBox="0 0 24 24"
            className="ml-[24px] h-[16px] w-[16px] fill-dark-gray  "
          >
            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
          </svg>
        </div>
        <div className="profileImage leftColumn absolute mr-[12px] h-[40px] w-[40px] ">
          <img
            src={
              data.user.profileImageURL || import.meta.env.VITE_DEFAULT_AVATAR
            }
            alt="profileImage"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="  h-[40px] w-[40px] rounded-full object-cover transition-opacity"
          />
        </div>
        {isHovered && (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative right-24 top-[-1] z-10 mt-5 flex h-[250px]  w-[300px] flex-col justify-center "
          >
            <PopoverUserCard
              popoverIsFollowed={data.user.isFollowed}
              popoverUserPicture={
                data.user.profileImageURL || import.meta.env.VITE_DEFAULT_AVATAR
              }
              popoverUserName={data.user.screenName}
              popoverUserID={data.user.username}
              popoverDiscription=""
              popoverFollowing={data.user.followingCount}
              popoverFollowers={data.user.followersCount}
              popoverTestID={`${data.user.username}-popover`}
              popoverSetLocalIsFollowed
            />
          </div>
        )}
      </div>

      <div className="rightColumn w-[512px] ">
        <div
          className={` retweeted-info h-[16px] pb-4 text-[13px] font-semibold
          text-dark-gray ${repost === false ? 'hidden' : ''} `}
        >
          {' '}
          <span>{data.retweetedUser.screenName}</span> reposted
        </div>
        <div className="flex flex-row justify-between ">
          <div className="userInfo flex flex-row">
            <Link
              to={`/app/${data.user.username}`}
              className="text-black"
            >
              <div className="name  text-[15px] font-bold">
                {data.user.screenName}
              </div>
            </Link>
            <div className="userName   overflow-hidden text-[15px] text-dark-gray">
              {' '}
              &ensp;@<span>{data.user.username}</span>
            </div>

            <div className="date overflow-hidden text-[15px] text-dark-gray">
              {' '}
              &ensp;.&ensp;
              <ReactTimeAgo
                date={new Date(data.createdAt)}
                locale="en-US"
                timeStyle="twitter"
              />
            </div>
          </div>
          <div className=" ">
            <ActionsMenu
              userId={data.user.userId}
              tweet={data}
              tweets={tweets}
              setTweets={setTweets}
            />
          </div>
        </div>
        <div className="caption">
          {' '}
          {data.text.split(' ').map((word) => {
            if (word.startsWith('#')) {
              return (
                <span
                  key={uuid4()}
                  className=" text-blue"
                >
                  {word}{' '}
                </span>
              );
            }
            return `${word} `;
          })}
        </div>

        <Media images={data.attachmentsUrl} />
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
            disabled={isRepostLoading}
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
            disabled={isLikeLoading}
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
      <OwnToaster />
    </div>
  );
}

Tweet.propTypes = {
  // eslint-disable-next-line no-undef
  data: PropTypes.object.isRequired,
};

export default Tweet;
