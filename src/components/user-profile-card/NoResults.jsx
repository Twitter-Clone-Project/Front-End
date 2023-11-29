import React from 'react';
import PropTypes from 'prop-types';

function NoResults({ title }) {
  return (
    <div className="flex w-full max-w-[600px] items-center justify-center  break-words p-12 text-3xl font-extrabold dark:text-white">
      {title}
    </div>
  );
}
NoResults.propTypes = {
  title: PropTypes.string.isRequired,
};
export default NoResults;
