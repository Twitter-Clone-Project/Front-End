import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BoxCard from './BoxCard';
import Button from '../form-controls/Button';
import BasicInput from '../form-controls/BasicInput';

function EmailConfirm({ email }) {
  const [code, setCode] = useState('');
  const [err, setError] = useState('');
  return (
    <div className="confirm flex h-screen w-full items-center justify-center text-lg text-black dark:bg-border-gray dark:text-white">
      <BoxCard>
        <div>
          <div className="absolute left-3 top-0 flex h-[53px] w-full items-center">
            <button
              type="submit"
              className="absolute left-0 top-3 h-[20px] w-[20px]  text-sm"
            >
              <svg
                viewBox="0 0 48 48"
                fill="#5F6368"
              >
                <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
                <path
                  d="M0 0h48v48H0z"
                  fill="none"
                />
              </svg>
            </button>

            <svg
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="mx-auto"
            >
              {' '}
              <path
                d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                className="fill-black dark:fill-white"
              />
            </svg>
          </div>
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
