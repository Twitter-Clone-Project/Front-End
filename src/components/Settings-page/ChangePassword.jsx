import React from 'react';

function ChangePassword({ visible = true }) {
  if (visible) {
    return (
      <div>
        <div className="text-white">Change Password</div>
      </div>
    );
  }
}

export default ChangePassword;
