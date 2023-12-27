/* eslint-disable max-len */
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserItem from '../userComponents/UserItem';
import { ChatContext } from '../../hooks/ContactContext';
import ConfirmPopUp from '../user-profile-card/ConfirmPopUp';
import Button from '../form-controls/Button';

/**
 * Component for displaying conversation information, allowing users to block or leave a conversation.
 * @component
 * @returns {JSX.Element} JSX for the Compose Page component.
 * @example
 * ```jsx
 *  <InfoPage />
 * ```
 */
export default function InfoPage() {
  const { chatContext, setChatContext } = useContext(ChatContext);
  const [user, setUser] = useState(null);
  const [block, isBlock] = useState(false);
  const [leave, isleave] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (chatContext.contact.username !== '') {
        const res = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}profile/${
            chatContext.contact.username
          }`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        const data = await res.json();
        if (data.status === false) {
          throw new Error(data.message);
        }
        setUser(data.data.user);
      }
    };
    fetchUser();
  }, [chatContext]);

  const handleLeave = async () => {
    await fetch(
      `${import.meta.env.VITE_API_DOMAIN}conversations/leaveConversation`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        origin: true,
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({
          conversationId: chatContext.conversationId,
        }),
      },
    );
    setChatContext((prevChatContext) => ({
      ...prevChatContext,
      conversationId: '',
    }));
    navigate(`/app/messages/`);
    window.location.reload();
  };
  const handleBlock = async () => {
    await fetch(
      `${import.meta.env.VITE_API_DOMAIN}users/${
        chatContext.contact.userName
      }/block`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        origin: true,
        credentials: 'include',
        withCredentials: true,
      },
    );
    navigate(`/app/messages/`);
    window.location.reload();
  };
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.outerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  if (user)
    return (
      <div
        data-testid="info-page"
        className={`flex  h-screen w-full max-w-full  flex-col  border-r-[1px]
        border-[#E1E8ED] dark:border-[#252829] dark:bg-black ${
          windowWidth > 640 ? 'w-[559px]' : ' w-screen'
        }`}
      >
        <div className="flex h-[53px] items-center gap-7  px-4">
          <div>
            <Link
              data-testid="info-page-link"
              className=" hover:no-underline"
              to={`/app/messages/${chatContext.contact.username}`}
            >
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full hover:bg-[#e7e7e7] dark:hover:bg-[#181919]">
                <svg
                  className="h-5 w-5 fill-black dark:fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
                </svg>
              </div>
            </Link>
          </div>

          <div className=" text-[20px]  font-bold dark:text-white">
            Conversation info
          </div>
        </div>
        <div className=" border-b-[1px]  border-[#E1E8ED] dark:border-[#252829]">
          <UserItem
            isFollowed={user.isFollowed}
            isFollowing={user.isFollowing}
            userPicture={chatContext.contact.imageUrl}
            userName={chatContext.contact.name}
            userID={chatContext.contact.username}
            discription=""
            following={user.followersCount}
            followers={user.followingsCount}
            testID={999}
          />
        </div>
        <button
          data-testid="info-page-button"
          onClick={() => {
            isBlock(1);
          }}
          type="button"
          className="flex h-[52px] w-full items-center justify-center p-4 text-blue hover:bg-[#eaf4fd] dark:hover:bg-[#07101f]"
        >
          Block @{chatContext.contact.username}
        </button>
        <button
          data-testid="info-page-button-2"
          onClick={() => {
            isleave(1);
          }}
          type="button"
          className="flex h-[52px] w-full items-center justify-center p-4 text-warning hover:bg-[#fde9ea] dark:hover:bg-[#1c0305] "
        >
          Leave Converstaion
        </button>
        <div
          data-testid="info-page-div"
          className="text-white dark:text-black"
        >
          {block && (
            <ConfirmPopUp>
              <div className="flex h-full w-full flex-col justify-between gap-5 px-8 py-3">
                <div>
                  <p className="py-2 text-sm text-dark-gray">
                    Block @{chatContext.contact.username}, @
                    {chatContext.contact.username} will no longer be able to
                    follow or message you, and you will not see notifications
                    from @{chatContext.contact.username}
                  </p>
                </div>
                <div className="flex h-full flex-1 flex-col items-end justify-end gap-5">
                  <Button
                    onClick={handleBlock}
                    backGroundColor="black"
                    backGroundColorDark="white"
                    label="Leave"
                    labelColor="white"
                    labelColorDark="black"
                    borderColor="none"
                  />
                  <Button
                    data-testid="info-page-bnt"
                    onClick={() => {
                      isBlock(0);
                    }}
                    backGroundColor="white"
                    backGroundColorDark="black"
                    borderColor="gray"
                    label="Cancel"
                    labelColor="black"
                    labelColorDark="white"
                  />
                </div>
              </div>
            </ConfirmPopUp>
          )}
        </div>
        <div
          data-testid="info-page-leave"
          className="text-white dark:text-black"
        >
          {leave && (
            <ConfirmPopUp>
              <div className="flex h-full w-full flex-col justify-between gap-5 px-8 py-3">
                <div>
                  <p className="py-2 text-lg font-semibold dark:text-white">
                    Leave converstaion?
                  </p>
                  <p className="py-2 text-sm text-dark-gray">
                    This conversation will be deleted from your inbox. Other
                    people in the conversation will still be able to see it.
                  </p>
                </div>
                <div className="flex h-full flex-1 flex-col items-end justify-end gap-5">
                  <Button
                    onClick={handleLeave}
                    backGroundColor="warningRed"
                    backGroundColorDark="warningRed"
                    label="Yes"
                    labelColor="white"
                    labelColorDark="white"
                    borderColor="none"
                  />
                  <Button
                    data-testid="info-page-leave-btn"
                    onClick={() => {
                      isleave(0);
                    }}
                    backGroundColor="white"
                    backGroundColorDark="black"
                    borderColor="gray"
                    label="Cancel"
                    labelColor="black"
                    labelColorDark="white"
                  />
                </div>
              </div>
            </ConfirmPopUp>
          )}
        </div>
      </div>
    );
}
