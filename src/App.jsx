import * as React from 'react';
// import LandingPage from './landingPage/LandingPage';
import Tweet from './tweetPage/Tweet';

function App() {
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
          userName: 'Jane Smith',
          screenName: 'janesmith',
          profileImageURL:
            'https://images.pexels.com/photos/18758948/pexels-photo-18758948/free-photo-of-head-of-black-poodle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        isLiked: true,
        isRetweeted: true,
        likesCount: 10,
        retweetsCount: 5,
        repliesCount: 2,
      },
      {
        id: '12346',
        isRetweet: false,
        text: 'This is a sample tweet 2',
        createdAt: '2023-11-09T12:34:56Z',
        attachmentsURL: [
          'https://images.pexels.com/photos/18566272/pexels-photo-18566272/free-photo-of-journalists-and-visitors-of-borobudur-interviewed-the-bhante-who-walked-from-thailand-to-indonesia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/12106470/pexels-photo-12106470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        retweetedUser: {
          userId: '67890',
          userName: 'John Doe2',
          screenName: 'johndoe2',
          profileImageURL: 'https://example.com/profile-image.jpg',
        },
        user: {
          userId: '123457',
          userName: 'Jane Smith',
          screenName: 'janesmith',
          profileImageURL:
            'https://images.pexels.com/photos/17978168/pexels-photo-17978168/free-photo-of-close-up-of-labrador-retriever.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        isLiked: false,
        isRetweeted: true,
        likesCount: 20,
        retweetsCount: 15,
        repliesCount: 42,
      },
    ],
  };
  console.log(tweet.data[0]);
  return (
    <div>
      {tweet.data.map((tweetItem) => (
        <Tweet data={tweetItem} />
      ))}

      {/* <LandingPage /> */}
    </div>
  );
}

export default App;
