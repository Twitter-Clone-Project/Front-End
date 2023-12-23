/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import toast from 'react-hot-toast';
import NavItem from './NavItem';
import Button from '../form-controls/Button';
import { useAuth } from '../../hooks/AuthContext';
import FloatingHeader from './FloatingHeader';
import UserImg from './UserImg';
import ComposePost from '../compose-popup/ComposePost';
import { ChatContext } from '../../hooks/ContactContext';

function NavBar() {
  const { user } = useAuth();
  const location = useLocation();
  const [composeOpen, setComposeOpen] = useState(false);
  const {
    setMessagesCount,
    messagesCount,
    setNotificationsCount,
    socket,
    chatContext,
  } = useContext(ChatContext);

  // Messages
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_DOMAIN
          }conversations/unseenConversationsCnt`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        if (res.status === 404) return;
        const data = await res.json();
        if (data.status === false) {
          throw new Error(data.message);
        }
        setMessagesCount(parseInt(data.data.unseenCnt, 10));
      } catch (err) {
        toast(err.message);
      }
    };
    fetchCount();
  }, []);

  // Notifications
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_DOMAIN
          }notifications/unseenNotificationsCnt`,
          {
            method: 'GET',
            origin: true,
            credentials: 'include',
            withCredentials: true,
          },
        );
        if (res.status === 404) return;
        const data = await res.json();
        if (data.status === false) {
          throw new Error(data.message);
        }
        setNotificationsCount(data.data.unseenCnt);
      } catch (err) {
        toast(err.message);
      }
    };
    fetchCount();
  }, []);

  useEffect(() => {
    if (socket === null) return;
    socket.on('msg-receive', async (message) => {
      if (message.conversationId !== chatContext.conversationId) {
        setMessagesCount(messagesCount + 1);
      }
    });
  }, [socket]);

  useEffect(() => {
    console.log('in NavBar');
    if (socket === null) return;

    socket.on('notification-receive', async () => {
      console.log('navbar increase count');
      setNotificationsCount(
        (prevNotificationsCount) => prevNotificationsCount + 1,
      );
    });
  }, [socket]);

  const mobileItems = [
    {
      path: './home',
      label: 'Home',
      filledIcon:
        'M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z',
      outlinedIcon:
        'M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z',
    },
    {
      path: './search',
      label: 'Search',
      filledIcon:
        'M10.25 4.25c-3.314 0-6 2.686-6 6s2.686 6 6 6c1.657 0 3.155-.67 4.243-1.757 1.087-1.088 1.757-2.586 1.757-4.243 0-3.314-2.686-6-6-6zm-9 6c0-4.971 4.029-9 9-9s9 4.029 9 9c0 1.943-.617 3.744-1.664 5.215l4.475 4.474-2.122 2.122-4.474-4.475c-1.471 1.047-3.272 1.664-5.215 1.664-4.971 0-9-4.029-9-9z',
      outlinedIcon:
        'M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z',
    },
    {
      path: './notifications',
      label: 'Notifications',
      filledIcon:
        'M11.996 2c-4.062 0-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958C19.48 5.017 16.054 2 11.996 2zM9.171 18h5.658c-.412 1.165-1.523 2-2.829 2s-2.417-.835-2.829-2z',
      outlinedIcon:
        'M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z',
    },
    {
      path: './messages',
      label: 'Messages',
      filledIcon:
        'M1.998 4.499c0-.828.671-1.499 1.5-1.499h17c.828 0 1.5.671 1.5 1.499v2.858l-10 4.545-10-4.547V4.499zm0 5.053V19.5c0 .828.671 1.5 1.5 1.5h17c.828 0 1.5-.672 1.5-1.5V9.554l-10 4.545-10-4.547z',
      outlinedIcon:
        'M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z',
    },
  ];
  const items = [
    {
      path: './home',
      label: 'Home',
      filledIcon:
        'M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z',
      outlinedIcon:
        'M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z',
    },
    {
      path: './notifications',
      label: 'Notifications',
      filledIcon:
        'M11.996 2c-4.062 0-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958C19.48 5.017 16.054 2 11.996 2zM9.171 18h5.658c-.412 1.165-1.523 2-2.829 2s-2.417-.835-2.829-2z',
      outlinedIcon:
        'M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z',
    },
    {
      path: './messages',
      label: 'Messages',
      filledIcon:
        'M1.998 4.499c0-.828.671-1.499 1.5-1.499h17c.828 0 1.5.671 1.5 1.499v2.858l-10 4.545-10-4.547V4.499zm0 5.053V19.5c0 .828.671 1.5 1.5 1.5h17c.828 0 1.5-.672 1.5-1.5V9.554l-10 4.545-10-4.547z',
      outlinedIcon:
        'M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z',
    },
    {
      path: `./${user.username}`,
      label: 'Profile',
      filledIcon:
        'M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z',
      outlinedIcon:
        'M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z',
    },
    {
      path: './settings',
      label: 'Settings',
      filledIcon:
        'M 10.54 1.75 h 2.92 l 1.57 2.36 c 0.11 0.17 0.32 0.25 0.53 0.21 l 2.53 -0.59 l 2.17 2.17 l -0.58 2.54 c -0.05 0.2 0.04 0.41 0.21 0.53 l 2.36 1.57 v 2.92 l -2.36 1.57 c -0.17 0.12 -0.26 0.33 -0.21 0.53 l 0.58 2.54 l -2.17 2.17 l -2.53 -0.59 c -0.21 -0.04 -0.42 0.04 -0.53 0.21 l -1.57 2.36 h -2.92 l -1.58 -2.36 c -0.11 -0.17 -0.32 -0.25 -0.52 -0.21 l -2.54 0.59 l -2.17 -2.17 l 0.58 -2.54 c 0.05 -0.2 -0.03 -0.41 -0.21 -0.53 l -2.35 -1.57 v -2.92 L 4.1 8.97 c 0.18 -0.12 0.26 -0.33 0.21 -0.53 L 3.73 5.9 L 5.9 3.73 l 2.54 0.59 c 0.2 0.04 0.41 -0.04 0.52 -0.21 l 1.58 -2.36 m 1.07 2 z m 0.39 6.25 C 11 10 10 11 10.025 11.933 s 0.975 2.067 1.968 2.058 c 1.007 0.009 2.007 -0.991 1.968 -2.058 S 13 10 12 10 z',
      outlinedIcon:
        'M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z',
    },
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const screen = useRef();

  useEffect(() => {
    setDrawerOpen(false);
  }, [navigate]);

  useEffect(() => {
    const controlNavbar = () => {
      if (window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          setShow(false);
        } else {
          setShow(true);
        }

        setLastScrollY(window.scrollY);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const handleLogout = () => {
    navigate('/logout');
  };
  useEffect(() => {
    const handler = (e) => {
      if (e.keyCode === 27) setDrawerOpen(false);
    };
    if (drawerOpen) {
      screen.current.addEventListener('keydown', handler);
    } else screen.current.removeEventListener('keydown', handler);
  }, [drawerOpen]);
  const regex = /messages\/[^\/]+/;

  const hidden = location.pathname.match(regex);
  return (
    <div
      ref={screen}
      data-testid="nav-bar"
      className={`mx-auto ${
        hidden ? 'hidden' : 'flex'
      } w-0 items-start justify-center dark:bg-pure-black
      sm:mt-auto sm:flex sm:h-full sm:w-[76px] mlg:w-[280px]`}
    >
      {composeOpen && <ComposePost setComposeOpen={setComposeOpen} />}
      <FloatingHeader
        drawerOpen={drawerOpen}
        show={show}
        setDrawerOpen={setDrawerOpen}
        handleLogout={handleLogout}
      />
      <div className="relative h-full w-full overflow-auto text-start transition-colors duration-200 sm:border-0 mlg:min-w-[230px] mlg:max-w-[230px]">
        <div
          className={`fixed bottom-0 left-0 z-10
          flex w-full justify-between
          border-t-[0.5px] border-border-gray
          bg-white p-2 dark:bg-pure-black sm:left-auto
          sm:mt-0 sm:h-full sm:w-auto sm:flex-col
          sm:items-start sm:justify-between sm:gap-1 sm:border-0 sm:px-2 
          ${!show ? 'opacity-30 sm:opacity-100' : ''}`}
        >
          <div className="mb-4 hidden max-w-[230px] p-3 hover:cursor-pointer hover:rounded-full hover:bg-light-hover-layout hover:dark:bg-hover-layout sm:flex">
            <Link to="/">
              <svg
                className="inline-block w-[1.9rem] fill-pure-black dark:fill-white"
                viewBox="0 0 24 24"
              >
                <g>
                  <path
                    className="fill-pure-black dark:fill-white"
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99
                21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161
                17.52h1.833L7.084 4.126H5.117z"
                  >
                    {' '}
                  </path>
                </g>
              </svg>
            </Link>
          </div>
          <div className="hidden max-w-[230px] sm:contents">
            {items.map((item) => (
              <NavItem
                key={uuid4()}
                outlinedIcon={item.outlinedIcon}
                filledIcon={item.filledIcon}
                label={item.label}
                path={item.path}
              />
            ))}
          </div>
          <div className="contents max-w-[230px] sm:hidden">
            {mobileItems.map((item) => (
              <NavItem
                key={uuid4()}
                outlinedIcon={item.outlinedIcon}
                data-testid={item.label}
                filledIcon={item.filledIcon}
                label={item.label}
                path={item.path}
              />
            ))}
          </div>
          <div className="absolute mx-auto hidden w-full  items-center justify-center rounded-full sm:relative mlg:flex">
            <Button
              label="Post"
              onClick={() => setComposeOpen(true)}
              backGroundColor="blue"
              backGroundColorDark="blue"
              labelColor="white"
              labelColorDark="white"
              borderColor="none"
              hight="h-[53px]"
            />
          </div>
          <div className="absolute bottom-24 right-3  mt-3 flex w-[full] items-center justify-center rounded-full bg-blue p-4 hover:cursor-pointer hover:bg-opacity-90 sm:relative sm:bottom-0 sm:right-0 mlg:hidden">
            <button
              onClick={() => setComposeOpen(true)}
              type="submit"
              className="flex-1"
            >
              <svg
                viewBox="0 0 24 24"
                className="m-auto h-[24px] w-[24px]"
              >
                <g>
                  <path
                    className="fill-white"
                    d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"
                  />
                </g>
              </svg>
            </button>
          </div>
          <div className="absolute bottom-24 right-0 mx-auto my-6 hidden w-full max-w-[230px] items-center justify-between justify-self-end p-2 hover:cursor-pointer hover:rounded-full hover:bg-light-hover-layout hover:dark:bg-hover-layout sm:relative sm:bottom-0 sm:right-0 sm:flex sm:items-start">
            <button
              type="submit"
              data-testid="user-btn"
              className="group relative mx-auto flex max-w-[2500px] items-center justify-between font-semibold"
            >
              <UserImg user={user} />
              <p
                className="
                hidden max-w-[150px] truncate px-2
              text-sm font-semibold tracking-wide dark:text-white lg:flex-1 lg:flex-col lg:items-start mlg:flex"
              >
                <span className="name">{user.name}</span>
                <span className="text-sm font-thin text-light-thin">
                  @{user.username}
                </span>
              </p>
              <span className="hidden items-center justify-center px-2 text-xs font-medium tracking-wider dark:text-white mlg:flex">
                &bull;&bull;&bull;
              </span>
              <div className="absolute bottom-0  left-0 top-0 z-50 hidden h-full w-full group-focus-within:flex dark:text-white  ">
                <div className="absolute bottom-14 left-0 flex w-64 items-center justify-start rounded-2xl bg-white py-4 shadow-[rgba(100,100,100,0.5)_0px_0.5px_4px] dark:bg-pure-black dark:shadow-[rgba(100,100,100,0.7)_0px_0.5px_4px]">
                  <div className="flex flex-1 justify-start px-3 hover:bg-light-hover-layout  hover:dark:bg-hover-layout">
                    <div
                      role="button"
                      data-testid="nav-logout-btn"
                      tabIndex={-6}
                      onClick={handleLogout}
                      onKeyDown={handleLogout}
                      className="z-50 max-w-[230px] flex-1 truncate p-3 text-start"
                    >
                      Log Out @{user.username}
                    </div>
                  </div>
                  <div className="">
                    <svg
                      viewBox="0 0 24 24"
                      className="absolute -bottom-3 left-5 h-5 w-5 rotate-180 drop-shadow-[rgba(150,150,150,0.1)_1px_-1px_1px] dark:drop-shadow-[rgba(100,100,100,0.5)_1px_-1px_1px] lg:left-1/2 lg:-translate-x-1/2 "
                    >
                      <g>
                        <path
                          d="M22 17H2L12 6l10 11z"
                          className="fill-white dark:fill-pure-black"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
