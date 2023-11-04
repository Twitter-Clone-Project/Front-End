import React, { useState } from 'react';
import PropTypes from 'prop-types';

import BoxCard from './BoxCard';
import Button from '../form-controls/Button';
import NameInput from '../form-controls/nameInput';
import Logo from '../landingPage/Logo';

function EmailConfirm({ email = 'NA' }) {
  const [code, setCode] = useState('');
  const [err, setError] = useState('');
  return (
    <div className="confirm dark:bg-dark-layout flex h-screen w-full items-center justify-center text-lg text-black dark:text-white ">
      <BoxCard>
        <div className="mx-auto flex max-w-[10%] items-center justify-center align-middle">
          <span className="absolute left-3 top-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full hover:bg-light-gray hover:bg-opacity-25">
            &#10005;
          </span>
          <Logo type="thin" />
        </div>
        <div className="mx-12">
          <p className="text-start text-3xl font-semibold">
            We sent you a code
          </p>
          <span className="mb-6 inline-block py-1 text-start text-sm text-dark-gray">
            Enter it below to confirm <em className="font-semibold">{email}</em>
          </span>
          <div className="mb-72 flex flex-col">
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
          <div className="mx-16 my-4">
            <Button
              backGroundColor="blue"
              labelColor="white"
              disabled={code === ''}
              borderColor="none"
              label="Next"
            />
          </div>
        </div>
      </BoxCard>
    </div>
  );
}

EmailConfirm.propTypes = {
  email: PropTypes.string.isRequired,
};

export default EmailConfirm;
