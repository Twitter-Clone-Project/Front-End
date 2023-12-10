/* eslint-disable react/prop-types */
import React from 'react';

function AddCard({ person, setDeletePerson }) {
  return (
    <div className="flex w-fit items-center gap-2 rounded-3xl border border-dark-gray p-1 dark:border-[#252829] dark:bg-black">
      <img
        src={person.image}
        alt=""
        className="h-5 w-5 rounded-full"
      />
      <div className="w-[90%] max-w-fit overflow-clip whitespace-nowrap text-base font-bold text-black dark:text-white">
        {person.name}
      </div>
      <button
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

export default AddCard;
