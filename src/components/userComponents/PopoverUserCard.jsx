/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../form-controls/Button';

function PopoverUserCard({
  popoverIsFollowed,
  popoverUserPicture,
  popoverUserName,
  popoverUserID,
  popoverDiscription,
  popoverFollowing,
  popoverFollowers,
  popoverTestID,
}) {
  const [isPopoverButtonHovered, setPopoverButtonHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-[300px] cursor-auto rounded-2xl bg-white bg-opacity-100 p-4 text-black shadow shadow-light-gray dark:bg-pure-black dark:text-white">
      <div className="flex w-full flex-row justify-between">
        <img
          id="popoverImg"
          src={popoverUserPicture}
          alt=""
          className=" h-16 w-16 rounded-full"
        />
        <div
          className=" h-9 w-28"
          onMouseEnter={() => {
            setPopoverButtonHovered(true);
          }}
          onMouseLeave={() => {
            setPopoverButtonHovered(false);
          }}
          data-testid={`PopoverUserCard_${popoverTestID}_1`}
        >
          <Button
            backGroundColor={
              popoverIsFollowed
                ? isPopoverButtonHovered
                  ? 'red'
                  : 'white'
                : 'white'
            }
            backGroundColorDark={
              popoverIsFollowed
                ? isPopoverButtonHovered
                  ? 'red'
                  : 'black'
                : 'black'
            }
            borderColor={
              popoverIsFollowed
                ? isPopoverButtonHovered
                  ? 'red'
                  : 'gray'
                : 'gray'
            }
            label={
              popoverIsFollowed
                ? isPopoverButtonHovered
                  ? 'Unfollow'
                  : 'Following'
                : 'Follow'
            }
            labelColor={
              popoverIsFollowed
                ? isPopoverButtonHovered
                  ? 'red'
                  : 'black'
                : 'black'
            }
            labelColorDark={
              popoverIsFollowed
                ? isPopoverButtonHovered
                  ? 'red'
                  : 'white'
                : 'white'
            }
            hight="h-9"
          />
        </div>
      </div>
      <div className=" mt-2">
        <div className="flex h-[41.5px] flex-col">
          <label
            htmlFor="popoverImg"
            className="cursor-pointer text-[15px] font-bold text-pure-black hover:underline dark:text-white"
          >
            {popoverUserName}
          </label>
          <div className="flex h-5 flex-row items-center">
            <span className=" w-min cursor-pointer text-light-thin">
              @{popoverUserID}
            </span>
            {popoverIsFollowed && (
              <div
                className=" ml-1 h-4 items-center rounded bg-x-light-gray px-1 py-0.5 dark:bg-border-gray"
                data-testid={`PopoverUserCard_${popoverTestID}_2`}
              >
                <p className=" h-3 text-[11px] leading-3 text-light-thin">
                  Follows you
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" mt-3">
        <p className=" text-[15px] text-pure-black dark:text-white">
          {popoverDiscription}
        </p>
      </div>
      <div className="mt-3 flex flex-row">
        <div
          onClick={() => navigate('/following')}
          data-testid={`PopoverUserCard_${popoverTestID}_3`}
        >
          <span className="mr-5 cursor-pointer text-pure-black hover:underline dark:text-white">
            {popoverFollowing}
            <span className="text-light-thin"> Following</span>
          </span>
        </div>
        <div
          onClick={() => navigate('/follower')}
          data-testid={`PopoverUserCard_${popoverTestID}_4`}
        >
          <span className="mr-5  cursor-pointer text-pure-black hover:underline dark:text-white">
            {popoverFollowers}
            <span className="text-light-thin"> Followers</span>
          </span>
        </div>
      </div>
    </div>
  );
}

PopoverUserCard.propTypes = {
  popoverIsFollowed: PropTypes.bool.isRequired,
  popoverUserPicture: PropTypes.string.isRequired,
  popoverUserName: PropTypes.string.isRequired,
  popoverUserID: PropTypes.string.isRequired,
  popoverDiscription: PropTypes.string.isRequired,
  popoverFollowing: PropTypes.number.isRequired,
  popoverFollowers: PropTypes.number.isRequired,
  popoverTestID: PropTypes.number.isRequired,
};

export default PopoverUserCard;
