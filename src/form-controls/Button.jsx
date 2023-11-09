/* eslint-disable react/prop-types */
import * as React from 'react';

function Button({
  backGroundColor,
  backGroundColorDark,
  borderColor,
  labelColor,
  labelColorDark,
  label,
  textSize,
  path,
  disabled,
  width,
  hight,
  children,
}) {
  return (
    <div className={`relative ${hight || 'h-[38.5px]'} ${width || 'w-full'}`}>
      <button
        type="submit"
        disabled={disabled}
        className={` absolute rounded-3xl ${
          backGroundColor === 'blue' ? 'bg-blue hover:bg-[#1a8cd8]' : ''
        }  ${
          backGroundColor === 'white' ? 'bg-white hover:bg-[#e6e6e6]' : ''
        }  ${
          backGroundColor === 'black' ? 'bg-black hover:bg-[#031018]' : ''
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
          className={`flex ${textSize || 'text-base'}  font-bold ${
            labelColor === 'blue' ? 'text-blue' : ''
          }  ${labelColor === 'white' ? 'text-white ' : ''}  ${
            labelColor === 'black' ? 'text-black' : ''
          }  ${labelColor === 'red' ? 'text-warning' : ''}
            ${labelColorDark === 'blue' ? 'dark:text-blue' : ''}  ${
              labelColorDark === 'white' ? 'dark:text-white ' : ''
            }  ${labelColorDark === 'black' ? 'dark:text-black' : ''}
            ${labelColorDark === 'red' ? 'text-warning' : ''}
          items-start`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default Button;
