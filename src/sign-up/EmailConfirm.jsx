import React, { useState } from 'react';
import PropTypes from 'prop-types';

import BoxCard from './BoxCard';
import Button from '../form-controls/Button';
import NameInput from '../form-controls/nameInput';

function EmailConfirm({ email = 'NA' }) {
  const [code, setCode] = useState('');
  const [err, setError] = useState('');
  return (
    <div className="confirm flex h-screen w-full items-center justify-center text-lg text-black dark:bg-dark-layout dark:text-white">
      <BoxCard>
        <p className="text-start font-semibold">We sent you a code</p>
        <span className="mb-5 py-2 text-start text-sm text-dark-gray">
          Enter it below to confirm <em className="font-semibold">{email}</em>
        </span>
        <div className="mb-52 flex flex-col">
          <NameInput
            error={err}
            setError={setError}
            Name={code}
            setName={setCode}
          />
          <a
            href="/"
            className="mt-5 px-2 text-start text-xs"
          >
            Didn&#39;t receive email?
          </a>
        </div>
        <Button
          backGroundColor="blue"
          labelColor="white"
          disabled={code === ''}
          borderColor="none"
          label="Next"
        />
      </BoxCard>
    </div>
  );
}

EmailConfirm.propTypes = {
  email: PropTypes.string.isRequired,
};

export default EmailConfirm;
