/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/AuthContext';

function ReplyMenu({ userId, tweetId, reply, replies, setReplies }) {
  const { user } = useAuth();
  const [show, toggleShow] = useState(false);
  const dropdownRef = useRef(null);
  //   const [followed, toggleFollowed] = useState(tweet.user.isFollowed);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const showMenu = () => {
    toggleShow(!show);
  };
  const handleDelete = () => {
    const deleteReply = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}tweets/${tweetId}/deleteReplies/${
            reply.replyId
          }`,
          {
            origin: true,
            credentials: 'include',
            withCredentials: true,
            method: 'DELETE',
          },
        );
        const res = await response.json();
        // console.log(res.message);
        if (res.status) {
          if (replies) {
            const newReplies = replies.filter(
              (aReply) => aReply.replyId !== reply.replyId,
            );
            setReplies(newReplies);
          }
        }
      } catch (err) {
        toast(err.message);
      }
    };

    deleteReply();
    toggleShow(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="dropdown relative flex scale-50"
    >
      <button
        type="submit"
        data-testid={`${reply.replyId}menubtn`}
        onClick={() => showMenu()}
        className="dropbtn group rounded-full hover:bg-[#e1eef6] dark:hover:bg-[#0a171f]"
      >
        <svg
          viewBox="0 0 25 25"
          className="h-[24px] w-[24px]  "
        >
          <path
            className="fill-dark-gray group-hover:fill-blue "
            d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
          />
        </svg>
      </button>
      {show && (
        <div
          id="myDropdown"
          data-testid={`${reply.replyId}menu`}
          className="dropdown-content absolute right-[-10px] z-10 flex w-[480px] flex-col rounded-2xl bg-white py-3 shadow shadow-pure-black dark:bg-pure-black dark:text-white dark:shadow-white"
        >
          {userId === user.userId && (
            <button
              type="submit"
              onClick={() => handleDelete()}
              data-testid={`${reply.replyId}-deletebtn`}
            >
              <div className="me flex h-[70px] flex-row text-warning hover:bg-xx-light-gray dark:hover:bg-[#080808]">
                <div className="py-5 pl-4">
                  <svg
                    viewBox="0 0 25 25"
                    className="h-[25px] w-[25px] "
                  >
                    <path
                      className=" fill-warning"
                      d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"
                    />
                  </svg>
                </div>
                <div className="h-[60px]  px-[14px] py-[16px] text-[20px] font-semibold">
                  Delete
                </div>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ReplyMenu;
