/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
/**
 * AddCard component renders a card with person details and a delete button.
 * @component
 * @param {object} person - Object containing person details like id, profile image URL, and screen name.
 * @param {Function} setDeletePerson - Function to set the person to be deleted.
 * @returns {JSX.Element} JSX element representing the AddCard component.
 * @example
 * ```jsx
 *  <AddCard person={person} setDeletePerson={setDeletePerson}/>
 * ```
 */
function AddCard({ person, setDeletePerson }) {
  return (
    <div
      data-testid={`${person.id}-addCard-person`}
      className="flex w-fit items-center gap-2 rounded-3xl border border-dark-gray p-1 dark:border-[#252829] dark:bg-black"
    >
      <img
        src={person.profileImageURL}
        alt=""
        className="h-5 w-5 rounded-full"
      />
      <div className="w-[90%] max-w-fit overflow-clip whitespace-nowrap text-base font-bold text-black dark:text-white">
        {person.screenName}
      </div>
      <button
        data-testid={`${person.id}-addCard-person-button`}
        type="submit"
        onClick={() => setDeletePerson(person)}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[20px] w-[20px] fill-dark-gray"
        >
          <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" />
        </svg>
      </button>
    </div>
  );
}

AddCard.propTypes = {
  /**
   *  Object containing person details like id, profile image URL, and screen name.
   */
  person: PropTypes.object.isRequired,
  /**
   *  Function to set the person to be deleted.
   */
  setDeletePerson: PropTypes.func.isRequired,
};

export default AddCard;
