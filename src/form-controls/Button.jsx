/* eslint-disable react/prop-types */
import * as React from 'react';

<<<<<<< Updated upstream
function Button({ backGroundColor, borderColor, labelColor, label, path }) {
  return (
    <div className="relative h-[38.5px] w-full">
=======
function Button({
  backGroundColor,
  backGroundColorDark,
  borderColor,
  labelColor,
  labelColorDark,
  label,
  textSize,
  path,
  width,
  hight,
  children,
}) {
  return (
    <div className={`relative ${hight || 'h-[38.5px]'} ${width || 'w-full'}`}>
>>>>>>> Stashed changes
      <button
        type="submit"
        className={` absolute rounded-3xl ${
          backGroundColor === 'blue' ? 'bg-blue hover:bg-[#1a8cd8]' : ''
        }  ${
          backGroundColor === 'white' ? 'bg-white hover:bg-[#e6e6e6]' : ''
        }  ${
<<<<<<< Updated upstream
          backGroundColor === 'black' ? 'bg-black hover:bg-[#031018]' : ''
        } h-full w-full border ${
          borderColor === 'blue' ? 'border-blue' : ''
        }  ${borderColor === 'white' ? 'border-white' : ''}  ${
          borderColor === 'black' ? 'border-black' : ''
        }`}
=======
          backGroundColor === 'black' ? 'bg-pure-black hover:bg-[#031018]' : ''
        }  ${backGroundColor === 'red' ? 'bg-[#f7e1e3] ' : ''} ${
          backGroundColorDark === 'blue'
            ? 'dark:bg-blue dark:hover:bg-[#1a8cd8]'
            : ''
        }  ${
          backGroundColorDark === 'white'
            ? 'dark:bg-white dark:hover:bg-[#e6e6e6]'
            : ''
        }  ${
          backGroundColorDark === 'black'
            ? 'dark:bg-pure-black dark:hover:bg-[#031018]'
            : ''
        }  ${backGroundColorDark === 'red' ? 'dark:bg-[#200a0c] ' : ''}
        h-full w-full border ${borderColor === 'blue' ? 'border-blue' : ''}  ${
          borderColor === 'white' ? 'border-white' : ''
        }  ${borderColor === 'black' ? 'border-black' : ''} ${
          borderColor === 'gray' ? 'border-light-gray' : ''
        } ${
          borderColor === 'red' ? 'border-[#fdc9ce] dark:border-[#67070f]' : ''
        }
        ${borderColor === 'none' ? 'border-none' : ''}`}
>>>>>>> Stashed changes
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
