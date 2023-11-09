/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import ReactButtons from './reactButtons';
import Media from './Media';

function Tweet() {
  const [repost, toggleRepost] = useState(false);
  const [reply, toggleReply] = useState(false);
  const [like, toggleLike] = useState(false);
  const images = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/18566272/pexels-photo-18566272/free-photo-of-journalists-and-visitors-of-borobudur-interviewed-the-bhante-who-walked-from-thailand-to-indonesia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'media 1',
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/12106470/pexels-photo-12106470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'media 2',
    },
    {
      id: 1,
      src: 'https://images.pexels.com/photos/16776919/pexels-photo-16776919/free-photo-of-blue-motor-scooter-standing-outside-a-beauty-center.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'media 1',
    },
    // Add more image objects as needed
  ];

  return (
    <div className="tweet flex w-[88%] flex-row bg-white   px-[16px] pt-[12px] hover:cursor-pointer hover:bg-xx-light-gray dark:bg-pure-black dark:text-white md:w-[598px]">
      <div className="leftColumn mr-[12px] h-[40px] w-[40px] ">
        <div className=" pb-1">
          <svg
            viewBox="0 0 24 24"
            className="ml-[24px] h-[16px] w-[16px] fill-dark-gray  "
          >
            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
          </svg>
        </div>
        <div className="profileImage leftColumn mr-[12px] h-[40px] w-[40px] ">
          <img
            src="https://images.pexels.com/photos/16776919/pexels-photo-16776919/free-photo-of-blue-motor-scooter-standing-outside-a-beauty-center.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="profileImage"
            className=" h-[40px] w-[40px] rounded-full object-fill"
          />
        </div>
      </div>

      <div className="rightColumn w-[512px] ">
        <div className=" retweeted-info h-[16px] pb-4 text-[13px] font-semibold text-dark-gray  ">
          {' '}
          <span>retweeted name</span> reposted
        </div>
        <div className="userInfo flex flex-row">
          <div className="name  text-[15px] font-bold text-black">name</div>
          <div className="userName  text-[15px] text-dark-gray">
            {' '}
            &ensp;@username
          </div>
          <div className="date text-[15px] text-dark-gray">
            {' '}
            &ensp;.&ensp;Nov 4
          </div>
        </div>
        <div className="caption"> if any</div>
        <Media images={images} />
        <div className="buttons flex h-[32px] flex-row  justify-between">
          <button
            type="submit"
            onClick={() => toggleReply(!reply)}
          >
            <ReactButtons
              type="Reply"
              data={100}
              clicked={reply}
              toggleClicked={toggleReply}
            />
          </button>
          <button
            type="submit"
            onClick={() => toggleRepost(!repost)}
          >
            <ReactButtons
              type="Repost"
              data={100}
              clicked={repost}
              toggleClicked={toggleRepost}
            />
          </button>
          <button
            type="submit"
            onClick={() => toggleLike(!like)}
          >
            <ReactButtons
              type="Like"
              data={100}
              clicked={like}
              toggleClicked={toggleLike}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

// Tweet.propTypes = {
//   images: PropTypes.object.isRequired,
// };

export default Tweet;
// {data.user.profileImageURL}
// {data.user.userName}
// {data.createdAt}
// {data.text}
