import React from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import PropTypes from 'prop-types';

/**
 * ListNav Component
 *
 * A navigation component that renders a list of items as navigation links.
 *
 * @component
 * @example
 * ```jsx
 * return (
 *   <ListNav
 *     items={[
 *       { label: 'Home', path: '/' },
 *       { label: 'About', path: '/about' },
 *       { label: 'Contact', path: '/contact' },
 *     ]}
 *     pastPath="/"
 *   />
 * );
 * ```
 */
function ListNav({ items, pastPath }) {
  return (
    <div className="flex w-full items-center justify-center text-sm font-bold dark:bg-pure-black dark:text-white">
      <div className="flex h-[53px] w-full items-center justify-between text-center">
        {items.map((item) => (
          <NavLink
            key={uuid4()}
            to={item.path}
            replace
            state={pastPath}
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

ListNav.defaultProps = {
  pastPath: null,
};

ListNav.propTypes = {
  /**
   * An array of objects representing the navigation items.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The label of the navigation item.
       */
      label: PropTypes.string.isRequired,
      /**
       * The path of the navigation item.
       */
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
  /**
   * The past path to be passed as state to the navigation links.
   */
  pastPath: PropTypes.string,
};

export default ListNav;
