/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * AddResultCard component renders a card displaying result details.
 * @component
 * @param {Function} setPerson - Function to set the person.
 * @param {object} result - Object containing result details like id, profile image URL, screen name, and username.
 * @param {object} deletePerson - Object representing the person to be deleted.
 * @returns {JSX.Element} JSX element representing the AddResultCard component.
 * ```jsx
 *  <AddResultCard setPerson={setPerson} deletePerson={deletePerson} result ={result}/>
 * ```
 */

function AddResultCard({ setPerson, result, deletePerson }) {
  const [isclicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (deletePerson && deletePerson.id === result.id) setIsClicked(false);
  }, [deletePerson]);

  return (
    <div
      data-testid={`${result.id}-card`}
      onClick={() => {
        setPerson(result);
        setIsClicked(!isclicked);
      }}
      className="dark:hover:bg-[#16171a flex h-[73px] w-full bg-white p-4 
    hover:bg-xx-light-gray   dark:bg-black 
    dark:hover:bg-[#16171a]"
    >
      <div className="mr-3 w-fit min-w-[40px]">
        <img
          src={result.profileImageURL}
          alt=""
          className="h-10 w-10 rounded-full"
        />
      </div>
      <div className="flex w-full flex-col overflow-clip">
        <div className="w-[90%] max-w-fit overflow-clip whitespace-nowrap text-base font-bold text-black dark:text-white">
          {result.screenName}
        </div>
        <div className="w-[90%]  max-w-fit overflow-clip whitespace-nowrap text-base text-[#71767B]">
          @{result.username}
        </div>
      </div>

      {isclicked && (
        <svg
          data-testid={`${result.id}-svg`}
          viewBox="0 0 24 24"
          className="h-[20px] w-[20px] fill-blue"
        >
          <path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z" />
        </svg>
      )}
    </div>
  );
}

export default AddResultCard;

AddResultCard.propTypes = {
  /**
   *  Function to set the person.
   */
  setPerson: PropTypes.func.isRequired,
  /**
   *  Object representing the person to be deleted.
   */
  deletePerson: PropTypes.object,
  /**
   * Object containing result details like id, profile image URL, screen name, and username.
   */
  result: PropTypes.object.isRequired,
};
