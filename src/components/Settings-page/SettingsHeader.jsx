import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import BackBtn from './BackBtn';

function SettingsHeader({ title, backBtn, onBack }) {
  const navigate = useNavigate();

  return (
    <div
      data-testid={`${title}-header`}
      className="flex w-full items-center gap-6 border-b border-b-light-gray p-2 dark:border-b-border-gray dark:text-white"
    >
      {backBtn && <BackBtn onClick={onBack || (() => navigate(-1))} />}
      <span className="text-xl font-semibold"> {title}</span>
    </div>
  );
}
SettingsHeader.defaultProps = {
  backBtn: true,
  onBack: null,
};
SettingsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  backBtn: PropTypes.bool,
  onBack: PropTypes.func,
};
export default SettingsHeader;
