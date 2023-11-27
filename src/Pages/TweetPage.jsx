import React, { useState } from 'react';
import Tweet from '../tweetPage/Tweet';
import SearchBar from '../Components/SearchBar';
// import PropTypes from 'prop-types';
// import NavBar from '../Components/navigation-bars/NavBar';

function TweetPage() {
  const [serachValue, setSerachValue] = useState('');
  // const navItems = [
  //   {
  //     outlinedIcon: '',
  //     filledIcon: '',
  //     label: 'Home',
  //     path: 'www.twitter.com',
  //   },
  // ];
  const tweet = {
    status: true,
    data: [
      {
        id: '12345',
        isRetweet: true,
        text: 'This is a sample tweet',
        createdAt: '2023-11-09T12:34:56Z',
        attachmentsURL: [
          'https://images.pexels.com/photos/18566272/pexels-photo-18566272/free-photo-of-journalists-and-visitors-of-borobudur-interviewed-the-bhante-who-walked-from-thailand-to-indonesia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/12106470/pexels-photo-12106470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/16776919/pexels-photo-16776919/free-photo-of-blue-motor-scooter-standing-outside-a-beauty-center.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        retweetedUser: {
          userId: '67890',
          userName: 'John Doe',
          screenName: 'johndoe',
          profileImageURL: 'https://example.com/profile-image.jpg',
        },
        user: {
          userId: '123456',
          userName: 'Jane_Smith',
          screenName: 'jane smith',
          profileImageURL:
            'https://images.pexels.com/photos/18758948/pexels-photo-18758948/free-photo-of-head-of-black-poodle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        isLiked: true,
        isRetweeted: true,
        likesCount: 10,
        retweetsCount: 5,
        repliesCount: 2,
      },
    ],
  };
  const handelBackButton = () => {
    console.log('HI');
  };
  return (
    <div className="flex min-w-fit justify-center xl:justify-between">
      <div className="flex w-1/6 justify-center pt-3 xl:w-1/4">
        <div className=" flex h-16 w-16 items-center justify-center rounded-full hover:bg-black">
          <svg
            className="h-9 w-9 "
            aria-hidden="true"
            viewBox="0 0 512 512"
          >
            <g>
              <path
                d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                className="fill-black dark:fill-white"
              />
            </g>
          </svg>
        </div>
      </div>
      <div className="flex w-5/6 xl:w-1/2 xl:justify-center">
        <div className="flex flex-col pt-3">
          <div className="flex flex-wrap items-center">
            <div
              className="mb-2 mt-[9px] flex h-9 w-9 items-center justify-center rounded-full hover:bg-black"
              onClick={handelBackButton}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className=" h-5 w-5 text-x-light-gray"
              >
                <g>
                  <path
                    d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </div>
            <span className=" pl-4 text-xl font-semibold text-white">Post</span>
          </div>
          <div className="">
            {tweet.data.map((tweetItem) => (
              <Tweet data={tweetItem} />
            ))}
          </div>
          <div className="flex flex-wrap items-center">
            <img
              className=" h-[35px] w-[35px] rounded-full object-cover"
              src="public/X.svg"
              alt="profileImage"
            />
            <input
              className="h-[60px] w-9/12 pl-2 text-white
                focus:outline-0 dark:bg-pure-black"
              placeholder="Post your reply"
            />
            <button
              type="button"
              className="h-[30px] w-1/6 rounded-full bg-blue text-white"
            >
              Reply
            </button>
          </div>
        </div>
      </div>
      <div className="invisible flex w-0 xl:visible xl:w-1/4 xl:justify-start ">
        <SearchBar
          value={serachValue}
          setValue={setSerachValue}
        />
      </div>
    </div>
  );
}
export default TweetPage;
