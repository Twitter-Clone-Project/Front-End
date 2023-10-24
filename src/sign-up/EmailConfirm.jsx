/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import BoxCard from './BoxCard';
import TextField from '@mui/material/TextField';
import Button from '../form-controls/Button';
import NameInput from '../form-controls/nameInput';

function EmailConfirm({ email = 'NA' }) {
  const [code, setCode] = useState('');
  const [err, setError] = useState('');
  return (
    <div className="confirm flex h-screen w-full items-center justify-center text-black dark:bg-dark-gray dark:text-white">
      <BoxCard>
        <p className="text-start font-semibold">We sent you a code</p>
        <span className="mb-5 py-2 text-start text-sm text-dark-gray">
          Enter it below to confirm {email}
        </span>
        <div className="mb-52 flex flex-col">
          <NameInput
            error={err}
            setError={setError}
          />
          <a
            href="/"
            className="mt-5 px-2 text-xs"
          >
            Didn&#39;t receive email?
          </a>
        </div>
        <Button
          backGroundColor="black"
          labelColor="white"
          // disabled={code === ''}
          borderColor="none"
          label="Next"
        />
      </BoxCard>
    </div>
  );
}

export default EmailConfirm;
