import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import BackBtn from './BackBtn';

/**
 * Represents the header component for the settings page.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 * @example
 * ```jsx
 * <SettingsHeader title="Settings" />
 * ```
 */
function SettingsHeader({ title, backBtn, onBack }) {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.outerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div
      data-testid={`${title}-header`}
      className="flex h-[57px] w-full  items-center gap-6  border-b border-b-x-light-gray bg-white p-2 dark:border-b-border-gray dark:bg-pure-black dark:text-white"
    >
      {((windowWidth < 988 && window.location.pathname !== '/app/settings') ||
        backBtn) && <BackBtn onClick={onBack || (() => navigate(-1))} />}
      <span className="max-w-[250px] truncate pl-2 text-xl font-semibold sm:max-w-[400px]">
        {' '}
        {title}
      </span>
    </div>
  );
}

SettingsHeader.defaultProps = {
  backBtn: false,
  onBack: null,
};

/**
 * PropTypes for SettingsHeader component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the settings page.
 * @param {boolean} [props.backBtn=false] - Determines whether to display a back button.
 * @param {function} [props.onBack=navigate(-1)] - The callback function to be called when the back button is clicked.
 */
SettingsHeader.propTypes = {
  /**
   * The title of the settings page.
   */
  title: PropTypes.string.isRequired,
  /**
   * Determines whether to display a back button.
   */
  backBtn: PropTypes.bool,
  /**
   * The callback function to be called when the back button is clicked.
   */
  onBack: PropTypes.func,
};

export default SettingsHeader;
