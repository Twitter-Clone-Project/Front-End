import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import Logo from '../landingPage/Logo';

/**
 * Renders the NotFound component.
 * This component is used to display a 404 page when a user navigates to a non-existent URL.
 */
function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      className="mx-auto flex min-h-full flex-col dark:text-white"
      data-testid="404-page"
    >
      <div className="flex w-full flex-col items-center justify-center py-6">
        <div className="max-w-[200px]">
          <Logo type="bold" />
        </div>
      </div>
      <div className="mx-auto w-full rounded-xl bg-blue-light p-8 dark:bg-border-gray">
        <div className="flex h-full w-full max-w-[350px] flex-col gap-4">
          <p className="text-xl font-bold">⛔ Page Not Found</p>
          <p className=" pl-4 text-dark-gray dark:text-x-light-gray">
            Looks like you've followed a broken link or entered a URL that
            doesn't exist on this site.
          </p>

          <div
            role="button"
            tabIndex={-6}
            onKeyDown={() => navigate('/')}
            onClick={() => navigate('/')}
            className="flex w-48 cursor-pointer pt-3 "
          >
            <p className="flex items-center text-blue ">
              <span className="rotate-180 transform pl-1 font-semibold">
                &#10140;
              </span>{' '}
              <span className="hover:underline">Go back to home</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

NotFound.propTypes = {
  // No props required for this component
};

export default NotFound;
