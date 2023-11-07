import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BoxCard from '../BoxCard';
import Button from '../form-controls/Button';
import BasicInput from '../form-controls/BasicInput';

function EmailConfirm({ email }) {
  const [code, setCode] = useState('');
  const [err, setError] = useState('');

  return (
    <div className="confirm flex h-screen w-full items-center justify-center text-lg text-black dark:bg-border-gray dark:text-white">
      <BoxCard>
        <div>
          <p className="mt-5 text-start text-2xl font-semibold">
            We sent you a code
          </p>
          <span className="mb-5 py-2 text-start text-sm text-dark-gray">
            Enter it below to confirm{' '}
            <em className="font-semibold">{email || null}</em>
          </span>
          <div className="mb-52 mt-6 flex flex-col">
            <BasicInput
              title="Code"
              value={code}
              setValue={setCode}
              error={err}
              setError={setError}
            />
            <a
              href="/"
              className="mt-5 px-2 text-start text-xs"
            >
              Didn&#39;t receive email?
            </a>
          </div>
        </div>
        <div className="justify-self-end">
          <Button
            backGroundColor="white"
            labelColor="black"
            disabled={err !== '' || !code}
            borderColor="none"
            label="Next"
          />
        </div>
      </BoxCard>
    </div>
  );
}

EmailConfirm.propTypes = {
  email: PropTypes.string.isRequired,
};
export default EmailConfirm;
