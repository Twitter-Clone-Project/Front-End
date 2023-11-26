import React from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import PropTypes from 'prop-types';

function ListNav({ items }) {
  return (
    <div className="flex w-full items-center justify-center text-sm font-bold dark:bg-pure-black dark:text-white">
      <div className="flex h-[53px] w-full items-center justify-between text-center">
        {items.map((item) => (
          <NavLink
            key={uuid4()}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? 'list-nav-active flex-1 text-black hover:no-underline dark:text-white'
                : 'flex-1 text-light-thin hover:no-underline'
            }
          >
            <p className="relative flex-auto p-4 hover:cursor-pointer hover:bg-hover-layout hover:bg-opacity-10">
              <span>{item.label}</span>
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
ListNav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
export default ListNav;
