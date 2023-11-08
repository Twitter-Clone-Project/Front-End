import { Toaster } from 'react-hot-toast';
import React from 'react';

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
