/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactTimeAgo from 'react-time-ago';
import PropTypes from 'prop-types';
import { v4 as uuid4 } from 'uuid';
import toast from 'react-hot-toast';
import ReactButtons from './reactButtons';
import Media from './Media';
import OwnToaster from '../components/OwnToaster';
import ActionsMenu from './ActionsMenu';
import PopoverUserCard from '../components/userComponents/PopoverUserCard';
// import { useAuth } from '../hooks/AuthContext';

function Tweet({ data, tweets, setTweets, setFetchLikes, setFetchRetweets }) {
  const [repost, toggleRepost] = useState(data.isRetweet);
  const [like, toggleLike] = useState(data.isLiked);
  const [repostsCount, setRepostsCount] = useState();
  const [repliesCount, setRepliesCount] = useState();
  const [likesCount, setLikesCount] = useState();
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isRepostLoading, setIsRepostLoading] = useState(false);
  // const { user: curUser } = useAuth();
  const location = useLocation();
  const [images, setImages] = useState();
  useEffect(() => {
    if (data.attachmentsUrl) {
      setImages(data.attachmentsUrl);
      // console.log(data.attachmentsUrl, 'Url');
    } else {
      setImages(data.attachmentsURL);
      // console.log(data.attachmentsURL, 'URL');
    }
    toggleLike(data.isLiked);
    toggleRepost(data.isRetweeted);
    setLikesCount(data.likesCount);
    setRepliesCount(data.repliesCount);
    setRepostsCount(data.retweetsCount);
  }, [data]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/app/tweets/${data.id}`, { state: { pastPath: location } });
  };
  const handleLike = () => {
    if (like === true) {
      toggleLike((prev) => !prev);
      setLikesCount((prev) => prev - 1);
      if (!isLikeLoading) {
        setIsLikeLoading(true);
        const deleteLike = async () => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_DOMAIN}tweets/${data.id}/deleteLike`,
              {
                origin: true,
                credentials: 'include',
                withCredentials: true,
                method: 'DELETE',
              },
            );
            const res = await response.json();
            if (!res.status) {
              toggleLike((prev) => !prev);
              setLikesCount((prev) => prev + 1);
              throw new Error(res.message);
            }
          } catch (err) {
            toast(err.message);
          } finally {
            setIsLikeLoading(false);
          }
        };

        deleteLike();
      }
    } else if (like === false) {
      toggleLike((prev) => !prev);
      setLikesCount((prev) => prev + 1);

      if (!isLikeLoading) {
        setIsLikeLoading(true);
        const postLike = async () => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_DOMAIN}tweets/${data.id}/addlike`,
              {
                origin: true,
                credentials: 'include',
                withCredentials: true,
                method: 'POST',
              },
            );
            const res = await response.json();
            if (!res.status) {
              toggleLike((prev) => !prev);
              setLikesCount((prev) => prev - 1);
              throw new Error(res.message);
            }
          } catch (err) {
            toast(err.message);
          } finally {
            setIsLikeLoading(false);
          }
        };

        postLike();
      }
    }
    setFetchLikes();
  };
  const handleRepost = () => {
    if (repost === true) {
      toggleRepost((prev) => !prev);
      setRepostsCount((prev) => prev - 1);
      if (!isRepostLoading) {
        setIsRepostLoading(true);
        const deleteRetweet = async () => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_DOMAIN}tweets/${
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
            if (!res.status) {
              toggleRepost((prev) => !prev);
              setRepostsCount((prev) => prev + 1);
              throw new Error(res.message);
            }
          } catch (err) {
            toast(err.message);
          } finally {
            setIsRepostLoading(false);
          }
        };

        deleteRetweet();
      }
    } else if (repost === false) {
      toggleRepost((prev) => !prev);
      setRepostsCount((prev) => prev + 1);
      if (!isRepostLoading) {
        setIsRepostLoading(true);
        const retweet = async () => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_DOMAIN}tweets/${data.id}/retweet`,
              {
                origin: true,
                credentials: 'include',
                withCredentials: true,
                method: 'POST',
              },
            );
            const res = await response.json();
            console.log(res);
            if (!res.status) {
              toggleRepost((prev) => !prev);
              setRepostsCount((prev) => prev - 1);
              throw new Error(res.message);
            }
          } catch (err) {
            toast(err.message);
          } finally {
            setIsRepostLoading(false);
          }
        };
        retweet();
      }
    }
    setFetchRetweets();
  };

  const handleReply = () => {
    handleClick();
  };

  return (
    <div
      data-testid={`${data.id}`}
      className="tweet mb-[0.5px] mt-[-0.5px] grid w-full border-collapse grid-cols-[auto_1fr]  border-y-[0.5px] border-y-border-gray bg-white px-3 pt-[12px] hover:cursor-pointer hover:bg-xx-light-gray dark:bg-pure-black dark:text-white dark:hover:bg-pure-black sm:px-[16px] lg:w-[598px] "
      onClick={handleClick}
    >
      <div
        className="leftColumn mr-[12px] h-[40px] w-[40px] "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <PopoverUserCard
          popoverIsFollowed={data.user.isFollowed}
          popoverIsFollowing={data.user.isFollowing}
          popoverUserPicture={
            data.user.profileImageURL || import.meta.env.VITE_DEFAULT_AVATAR
          }
          popoverUserName={data.user.screenName}
          popoverUserID={data.user.username}
          popoverDiscription={data.user.bio}
          popoverFollowing={data.user.followingCount}
          popoverFollowers={data.user.followersCount}
          popoverTestID={`${data.user.username}-popover`}
          popoverSetLocalIsFollowed
        >
          <div className="profileImage leftColumn absolute mr-[12px] h-[40px] w-[40px] ">
            <img
              data-testid={`profileImage${data.id}`}
              src={
                data.user.profileImageURL || import.meta.env.VITE_DEFAULT_AVATAR
              }
              alt="profileImage"
              className="  h-[40px] w-[40px] rounded-full object-cover transition-opacity"
            />
          </div>
        </PopoverUserCard>
      </div>

      <div className="rightColumn max-w-[95%]">
        {data.isRetweet && (
          <div
            className={` retweeted-info flex w-full items-center text-xs font-semibold
          text-dark-gray `}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="mr-1 h-[16px] w-[16px] fill-dark-gray  "
            >
              <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
            </svg>
            <span>
              {data.isRetweeted ? 'You' : data.retweetedUser.screenName}{' '}
              reposted
            </span>
          </div>
        )}
        <div className="flex w-full justify-between">
          <div
            className="userInfo flex flex-wrap"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Link
              to={`/app/${data.user.username}`}
              className=" text-black"
            >
              <div
                data-testid={`username${data.id}`}
                style={{ wordBreak: 'break-word' }}
                className="name word max-w-[220px] truncate break-words text-[15px] font-bold dark:text-white"
              >
                {data.user.screenName}
              </div>
            </Link>
            <div className="flex flex-wrap">
              <div className="userName max-w-[150px] overflow-hidden truncate break-words  text-[15px] text-dark-gray">
                {' '}
                &ensp;@<span>{data.user.username || data.user.userName}</span>
              </div>

              <div className="date overflow-hidden break-keep text-[15px] text-dark-gray">
                {' '}
                &ensp;.&ensp;
                <ReactTimeAgo
                  date={new Date(data.createdAt)}
                  locale="en-US"
                  timeStyle="twitter"
                />
              </div>
            </div>
          </div>
          <div
            className="pl-2"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ActionsMenu
              userId={data.user.userId}
              tweet={data}
              tweets={tweets}
              setTweets={setTweets}
            />
          </div>
        </div>
        <div className="caption max-w-[95%]">
          <p
            className="break-words"
            style={{ wordBreak: 'break-word' }}
          >
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
          </p>
        </div>

        <div>
          <Media images={images} />
        </div>
        <div className="buttons flex h-[32px] flex-row  justify-between">
          <button
            data-testid={`${data.id}reply`}
            type="submit"
            onClick={(e) => {
              e.stopPropagation();
              handleReply();
            }}
          >
            <ReactButtons
              type="Reply"
              data={repliesCount}
            />
          </button>
          <button
            data-testid={`${data.id}repost`}
            type="submit"
            disabled={isRepostLoading}
            onClick={(e) => {
              e.stopPropagation();
              handleRepost();
            }}
          >
            <ReactButtons
              type="Repost"
              data={repostsCount}
              clicked={repost}
            />
          </button>
          <button
            data-testid={`${data.id}like`}
            disabled={isLikeLoading}
            type="submit"
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
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
  setFetchLikes: PropTypes.func,
  setFetchRetweets: PropTypes.func,
};

Tweet.defaultProps = {
  setFetchLikes: () => {
    // console.log('Hi');
  },
  setFetchRetweets: () => {
    // console.log('Hi');
  },
};

export default Tweet;
