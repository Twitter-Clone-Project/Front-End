/* eslint-disable max-len */
import { Toaster } from 'react-hot-toast';
import React from 'react';

/**
 * OwnToaster component displays a customized toaster using the Toaster component from a library.
 *
 * @component
 * @example
 * ```jsx
 * return (
 *   <OwnToaster />
 * )
 * ```
 */
function OwnToaster() {
  return (
    <Toaster
      reverseOrder
      position="bottom-center"
      gutter={5}
      toastOptions={{
        // Define default options
        className: '',
        duration: 2000,
        style: {
          background: '#1DA1F2',
          color: '#fff',
        },
      }}
    />
  );
}

export default OwnToaster;
