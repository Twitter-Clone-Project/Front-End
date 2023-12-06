import React from 'react';

function MutedUsers({ visible = true }) {
  if (visible) {
    return (
      <div>
        <div className="text-white">MutedUsers</div>
      </div>
    );
  }
}

export default MutedUsers;
