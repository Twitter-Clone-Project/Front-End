import React from 'react';
import PropTypes from 'prop-types';
import Button from '../form-controls/Button';

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
  handleChange: PropTypes.func.isRequired,
  totalError: PropTypes.bool.isRequired,
};

export default SaveBtn;
