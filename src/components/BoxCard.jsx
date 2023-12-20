/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function BoxCard({ children, classes, minHeight, onClose, header, compose }) {
  const navigate = useNavigate();
  return (
    <div
      data-testid="box-card"
      className={`relative mx-auto flex h-full w-full flex-col 
      justify-between overflow-hidden
      border-[1px] border-light-gray bg-white  text-lg text-black 
      dark:border-none dark:bg-pure-black dark:text-white md:h-auto 
      ${header ? 'md:max-h-[600px]' : 'md:max-h-[750px]'} ${
        minHeight || 'md:min-h-[650px]'
      } md:w-[615px] md:rounded-2xl ${classes}`}
    >
      <div
        className={`flex h-full w-full flex-1 flex-col justify-between 
        overflow-auto pt-8 ${compose ? 'pb-0' : 'pb-4'}`}
      >
        <div className="absolute left-0 top-0 flex h-[53px] w-full min-w-[300px] items-center ">
          {header ? (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>{header}</>
          ) : (
            <>
              <button
                type="submit"
                data-testid="close-btn"
                onClick={onClose || (() => navigate('/'))}
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
              <div className="mx-auto">
                <svg
                  width="30px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="mx-auto min-w-[24px]"
                >
                  {' '}
                  <path
                    d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                    className="fill-black dark:fill-white"
                  />
                </svg>
              </div>
            </>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

export default BoxCard;
