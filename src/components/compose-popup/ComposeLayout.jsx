import React from 'react';
import PropTypes from 'prop-types';
import BoxCard from '../BoxCard';
import PopupCardHeader from '../user-profile-card/PopupCardHeader';

function ComposeLayout({ children, setComposeOpen }) {
  return (
    <div
      data-testid="compose-layout"
      className="fixed bottom-0 left-0 top-0 z-[2000] flex h-screen w-full items-start justify-center bg-dark-gray bg-opacity-30"
    >
      <div className="absolute h-full w-full md:top-[5%] md:h-auto md:-translate-y-[5%]">
        <BoxCard
          minHeight="min-h-[300px]"
          compose
          header={
            <PopupCardHeader>
              <button
                type="button"
                data-testid="close-compose-form"
                onClick={() => setComposeOpen(false)}
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
  setComposeOpen: PropTypes.func.isRequired,
};
export default ComposeLayout;
