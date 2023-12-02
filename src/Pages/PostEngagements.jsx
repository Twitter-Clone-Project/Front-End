/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import ListNav from '../components/navigation-bars/ListNav';
import BoxCard from '../components/BoxCard';

function PostEngagements({ setVisibility }) {
  const ListNavItems = [
    {
      label: 'Likes',
      path: `/app/home/tweet/likes`,
    },
    {
      label: 'Reposts',
      path: `/app/home/tweet/reposts`,
    },
  ];
  return (
    <div className="popup-screen absolute bottom-0 left-0 top-0 z-20 flex h-full w-full items-center justify-center p-2 md:bg-dark-gray md:bg-opacity-50">
      <BoxCard classes="overflow-auto">
        <div className="mx-auto mt-4 flex items-center px-10">
          <ListNav
            items={ListNavItems}
            pastPath=""
          />
        </div>
      </BoxCard>
    </div>
  );
}
PostEngagements.propTypes = {
  setVisibility: PropTypes.func.isRequired,
};
export default PostEngagements;
