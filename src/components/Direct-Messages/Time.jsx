/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import PropTypes from 'prop-types';

/**
 * Displays the time difference between the provided 'sendedTime' and the current time.
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.sendedTime - The time to compare against the current time.
 * @returns {JSX.Element} JSX representing the time difference.
 * @example
 * ```jsx
 *  <Time sendedTime={sendedTime} />
 * ```
 */

export default function Time({ sendedTime }) {
  const [currentTime, setCurrentTime] = useState(dayjs());
  dayjs.extend(utc);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const givenTimestamp = dayjs(sendedTime);
  const differenceInSeconds = currentTime.diff(givenTimestamp, 'second');
  const differenceInMinutes = currentTime.diff(givenTimestamp, 'minute');
  const differenceInHours = currentTime.diff(givenTimestamp, 'hour');
  const differenceInDays = currentTime.diff(givenTimestamp, 'day');
  const differenceInMonths = currentTime.diff(givenTimestamp, 'month');
  const differenceInYears = currentTime.diff(givenTimestamp, 'year');

  let timeTemp = 0;
  let sign = '';

  if (differenceInYears !== 0) {
    timeTemp = differenceInYears;
    sign = 'y';
  } else if (differenceInMonths !== 0) {
    timeTemp = differenceInMonths;
    sign = 'm';
  } else if (differenceInDays !== 0) {
    timeTemp = differenceInDays;
    sign = 'd';
  } else if (differenceInHours !== 0) {
    timeTemp = differenceInHours;
    sign = 'h';
  } else if (differenceInMinutes !== 0) {
    timeTemp = differenceInMinutes;
    sign = 'min';
  } else {
    timeTemp = differenceInSeconds;
    sign = 's';
  }

  return (
    <div>
      {timeTemp < 0 ? '0' : timeTemp}
      {sign}
    </div>
  );
}
Time.propTypes = {
  /**
   *  The time to compare against the current time
   */
  sendedTime: PropTypes.string.isRequired,
};
