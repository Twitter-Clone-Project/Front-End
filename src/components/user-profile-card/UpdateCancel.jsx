/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import ConfirmPopUp from './ConfirmPopUp';
import Button from '../form-controls/Button';

/**
 * A component that displays a confirmation popup with options to discard changes or cancel.
 */
function UpdateCancel({ onDiscard, onCancel }) {
  return (
    <ConfirmPopUp>
      <div className="flex h-full w-full flex-col justify-between gap-5 px-8 py-3">
        <div>
          <p className="py-2 text-lg font-semibold dark:text-white">
            Discard Changes?
          </p>
          <p className="py-2 text-sm text-light-gray">
            This can’t be undone and you’ll lose your changes.{' '}
          </p>
        </div>
        <div className="flex h-full flex-1 flex-col items-end justify-end gap-5">
          <Button
            onClick={onDiscard}
            backGroundColor="warningRed"
            backGroundColorDark="warningRed"
            label="Discard"
            labelColor="white"
            labelColorDark="white"
            borderColor="none"
          />
          <Button
            onClick={onCancel}
            backGroundColor="white"
            backGroundColorDark="black"
            borderColor="white"
            label="Cancel"
            labelColor="black"
            labelColorDark="white"
          />
        </div>
      </div>
    </ConfirmPopUp>
  );
}

UpdateCancel.propTypes = {
  /**
   * Callback function to handle discarding changes.
   */
  onDiscard: PropTypes.func.isRequired,
  /**
   * Callback function to handle canceling the action.
   */
  onCancel: PropTypes.func.isRequired,
};

export default UpdateCancel;
