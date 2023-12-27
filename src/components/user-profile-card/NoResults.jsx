import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a component to display a message when there are no results.
 *
 * @component
 * @param {string} title - The title to be displayed in the component.
 * @returns {JSX.Element} - The rendered NoResults component.
 */
function NoResults({ title }) {
  return (
    <div
      data-testid={title}
      className="flex w-full max-w-[600px] items-center justify-center  break-words p-12 text-3xl font-extrabold dark:text-white"
    >
      {title}
    </div>
  );
}

NoResults.propTypes = {
  /**
   * The title to be displayed in the component.
   */
  title: PropTypes.string.isRequired,
};

export default NoResults;
