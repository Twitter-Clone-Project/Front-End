import React from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import BoxCard from '../BoxCard';
import PopupCardHeader from '../user-profile-card/PopupCardHeader';

function ComposeLayout({ children }) {
  const navigate = useNavigate();
  return (
    <div
      data-testid="compose-layout"
      className="fixed bottom-0 left-0 top-0 z-[2000] flex h-screen w-full items-start justify-center bg-dark-gray bg-opacity-30"
    >
      <div className="absolute h-full w-full md:top-1/4 md:h-auto md:-translate-y-1/4">
        <BoxCard
          minHeight="min-h-[300px]"
          compose
          header={
            <PopupCardHeader>
              <button
                type="button"
                data-testid="close-compose-form"
                onClick={() => navigate(-1)}
                className="flex h-8 w-8 items-center justify-center rounded-full align-middle hover:bg-light-hover-layout dark:hover:bg-hover-layout"
              >
                <span className="text-base">&#10005;</span>
              </button>
            </PopupCardHeader>
          }
        >
          {children}
        </BoxCard>
      </div>
    </div>
  );
}
ComposeLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ComposeLayout;
