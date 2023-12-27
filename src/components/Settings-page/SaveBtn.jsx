import React from 'react';
import PropTypes from 'prop-types';
import Button from '../form-controls/Button';

/**
 * A button component used for saving changes.
 *
 * @component
 * @example
 * ```jsx
 * return (
 *   <SaveBtn
 *     handleChange={handleSave}
 *     totalError={hasErrors}
 *   />
 * )
 * ```
 */
function SaveBtn({ handleChange, totalError }) {
  return (
    <div className="flex w-full items-center justify-end p-3">
      <div className="flex w-20">
        <Button
          label="save"
          labelColor="white"
          backGroundColor="blue"
          backGroundColorDark="blue"
          borderColor="none"
          onClick={handleChange}
          disabled={totalError}
        />
      </div>
    </div>
  );
}

SaveBtn.propTypes = {
  /**
   * Function to handle the save button click event.
   */
  handleChange: PropTypes.func.isRequired,
  /**
   * Boolean indicating whether there are any errors.
   */
  totalError: PropTypes.bool.isRequired,
};

export default SaveBtn;
