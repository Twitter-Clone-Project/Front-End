import React from 'react';

/**
 * DotLoader Component
 *
 * A loading spinner component that displays a dot carousel animation.
 */
function DotLoader() {
  return (
    <div
      className="snippet mb-4"
      data-title="dot-carousel"
    >
      <div className="stage">
        <div className="dot-carousel" />
      </div>
    </div>
  );
}

DotLoader.propTypes = {
  // No props required for this component
};

export default DotLoader;
