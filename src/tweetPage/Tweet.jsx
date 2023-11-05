/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import ReactButtons from './reactButtons';

function Tweet() {
  const [repost, toggleRepost] = useState(false);
  const [reply, toggleReply] = useState(false);
  const [like, toggleLike] = useState(false);

  return (
    <div className="tweet flex w-[598px] flex-row bg-white  px-[16px] pt-[12px] dark:bg-pure-black dark:text-white">
      <div className="leftColumn mr-[12px] h-[40px] w-[40px] ">
        <div className="profileImage leftColumn mr-[12px] h-[40px] w-[40px] ">
          <img
            src="https://images.pexels.com/photos/16776919/pexels-photo-16776919/free-photo-of-blue-motor-scooter-standing-outside-a-beauty-center.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="profileImage"
            className=" h-[40px] w-[40px] rounded-full object-fill"
          />
        </div>
      </div>

      <div className="rightColumn w-[512px] pb-[12px]">
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
        <div className="media flex flex-row ">
          {' '}
          <img
            src="https://images.pexels.com/photos/16776919/pexels-photo-16776919/free-photo-of-blue-motor-scooter-standing-outside-a-beauty-center.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="profileImage"
            className=" rounded-xl object-contain"
          />
        </div>
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
//   data: PropTypes.object.isRequired,
//   user: PropTypes.object.isRequired,
// };

export default Tweet;
// {data.user.profileImageURL}
// {data.user.userName}
// {data.createdAt}
// {data.text}
