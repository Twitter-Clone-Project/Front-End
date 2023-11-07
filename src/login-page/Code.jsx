import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../form-controls/Button';
import BasicInput from '../form-controls/BasicInput';

function Code({ email = 'NA' }) {
  const [error, setError] = useState('');
  const [codeValue, setCodeValue] = useState('');

  return (
    <div className="popup-screen flex h-screen w-full items-center justify-center md:bg-black md:bg-opacity-50">
      <div className="popup-content relative flex h-full w-full flex-col items-center bg-white py-6 dark:bg-pure-black dark:text-white md:w-[50%] md:rounded-3xl lg:h-[600px] lg:w-[30%] ">
        <div className=" absolute top-0 flex h-[53px] w-full items-center">
          <button
            type="submit"
            className="absolute left-3 top-3 h-[20px] w-[20px]  text-sm"
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
        <div className=" mt-8 flex w-[80%] flex-col items-center justify-between">
          <div className=" flex flex-col items-center justify-between">
            <div className="flex w-[100%] flex-col justify-start">
              <h1 className=" my-3 text-[31px] font-bold ">
                We sent you a code via
              </h1>
              <em className="font-semibold">{email}</em>
              <p className="mb-3 text-[15px] text-dark-gray">
                Check your email to get your confirmation code. If you need to
                request a new code, go back and reselect a confirmation.
              </p>
              <BasicInput
                title="Code"
                value={codeValue}
                setValue={setCodeValue}
                error={error}
                setError={setError}
              />
            </div>

            <div className=" mt-6 flex w-full flex-col justify-start">
              <Button
                backGroundColor="black"
                backGroundColorDark="white"
                label="Next"
                borderColor="black"
                labelColor="white"
                labelColorDark="black"
                path=""
              />
              {/* onClick-->go to landing page */}
              <div className="my-3">
                <Button
                  backGroundColor="white"
                  backGroundColorDark="black"
                  label="Cancel"
                  borderColor="gray"
                  labelColor="black"
                  labelColorDark="white"
                  path=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Code.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Code;
