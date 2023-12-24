import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import BackBtn from './BackBtn';

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
      className="flex h-[57px] w-full items-center gap-6  border-b border-b-x-light-gray bg-white p-2 dark:border-b-border-gray dark:bg-pure-black dark:text-white"
    >
      {((windowWidth < 988 && window.location.pathname != '/app/settings') ||
        backBtn) && <BackBtn onClick={onBack || (() => navigate(-1))} />}
      <span className="pl-2 text-xl font-semibold"> {title}</span>
    </div>
  );
}

SettingsHeader.defaultProps = {
  backBtn: false,
  onBack: null,
};
SettingsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  backBtn: PropTypes.bool,
  onBack: PropTypes.func,
};

export default SettingsHeader;
