/* eslint-disable react/prop-types */
import * as React from 'react';

function Button({
  backGroundColor,
  borderColor,
  labelColor,
  label,
  path,
  disabled,
}) {
  return (
    <div className="relative flex h-[38.5px] w-full">
      <button
        type="submit"
        disabled={disabled}
        className={` absolute rounded-3xl ${
          backGroundColor === 'blue' ? 'bg-blue' : ''
        }  ${backGroundColor === 'white' ? 'bg-white' : ''}  ${
          backGroundColor === 'black' ? 'bg-black' : ''
        } h-full w-full border ${
          borderColor === 'blue' ? 'border-blue' : ''
        }  ${borderColor === 'white' ? 'border-white' : ''}  ${
          borderColor === 'black' ? 'border-black' : ''
        }`}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-center">
        {path && (
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
          >
            <g>
              <path d={`${path}`} />
            </g>{' '}
          </svg>
        )}
        <span
          className={`flex text-base font-bold ${
            labelColor === 'blue' ? 'text-blue' : ''
          }  ${labelColor === 'white' ? 'text-white ' : ''}  ${
            labelColor === 'black' ? 'text-black' : ''
          }  items-start`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default Button;
