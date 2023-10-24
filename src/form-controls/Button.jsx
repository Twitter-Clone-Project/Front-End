/* eslint-disable react/prop-types */
import * as React from 'react';

function Button({
  backGroundColor,
  borderColor,
  labelColor,
  label,
  path,
  width,
  children,
}) {
  return (
    <div className={`relative h-[38.5px] ${width || 'w-full'}`}>
      <button
        type="submit"
        className={`absolute flex items-center rounded-3xl p-5 align-middle ${
          backGroundColor === 'blue' ? 'bg-blue' : ''
        }  ${backGroundColor === 'white' ? 'bg-white' : ''}  ${
          backGroundColor === 'black' ? 'bg-black' : ''
        } h-full w-full border ${
          borderColor === 'blue' ? 'border-blue' : ''
        }  ${borderColor === 'white' ? 'border-white' : ''}  ${
          borderColor === 'black' ? 'border-black' : ''
        } ${borderColor === 'gray' ? 'border-light-gray' : ''}
        ${borderColor === 'none' ? 'border-none' : ''}`}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-center">
        {path && (
          <svg
            className="mx-2 my-auto h-5 w-5 align-middle"
            viewBox="0 0 48 48"
          >
            <g>{children}</g>{' '}
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
