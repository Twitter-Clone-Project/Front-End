/* eslint-disable react/prop-types */
import React from 'react';
import TweetList from './TweetList';

function TimeLine({ tweets }) {
  return <TweetList data={tweets} />;
}

export default TimeLine;
