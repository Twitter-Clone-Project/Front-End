/* eslint-disable react/prop-types */

import * as React from 'react';
import { v4 as uuid4 } from 'uuid';

function DorpDownMenu({ header, items }) {
  return (
    <div className="relative h-14 w-full rounded outline outline-light-gray focus-within:outline-2 focus-within:outline-blue ">
      <select
        name={header}
        id="selector1"
        className="peer absolute mb-2 mt-4 w-full cursor-pointer  appearance-none bg-white px-2 pt-2 text-base outline-none dark:bg-pure-black "
      >
        <option
          label=""
          disabled
          selected
          className="hidden"
        />
        {items.map((item) => (
          <option key={uuid4()}>{item}</option>
        ))}
      </select>
      <label
        htmlFor="selector1"
        className="pointer-events-none absolute left-0 pl-2 pr-2 pt-2 text-[13px] leading-4 text-pure-black peer-focus:text-blue dark:text-white"
      >
        {header}
      </label>
      <svg
        className="pointer-events-none absolute right-3 top-7 mt-[-11.25px] h-[22.5px] w-[22.5px]  fill-light-gray peer-focus:fill-blue"
        viewBox="0 0 24 24"
      >
        <path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z" />
      </svg>
    </div>
  );
}

export default DorpDownMenu;
