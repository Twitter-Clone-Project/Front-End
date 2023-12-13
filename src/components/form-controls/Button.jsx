/* eslint-disable react/prop-types */
import * as React from 'react';
import { Link } from 'react-router-dom';

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
  to,
  disabled,
  onClick,
  children,
}) {
  return (
    <div className={`relative ${hight || 'h-[38.5px]'} ${width || 'w-full'}`}>
      {to ? (
        <Link to={to}>
          <button
            type="submit"
            data-testid="signInBtn"
            disabled={disabled || false}
            // eslint-disable-next-line max-len
            className={`absolute cursor-pointer rounded-full  disabled:cursor-not-allowed ${
              backGroundColor === 'blue' ? 'bg-blue hover:bg-[#1a8cd8]' : ''
            }  ${
              backGroundColor === 'white' ? 'bg-white hover:bg-[#e6e6e6]' : ''
            }  ${
              backGroundColor === 'black'
                ? 'bg-pure-black hover:bg-[#031018]'
                : ''
            }  ${backGroundColor === 'red' ? 'bg-[#f4212e] ' : ''} ${
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
            }  ${backGroundColorDark === 'red' ? 'dark:bg-[#f4212e] ' : ''}
        h-full w-full border ${borderColor === 'blue' ? 'border-blue' : ''}  ${
          borderColor === 'white' ? 'border-white dark:border-border-gray' : ''
        }  ${borderColor === 'black' ? 'border-black' : ''} ${
          borderColor === 'gray' ? 'border-light-gray' : ''
        } ${
          borderColor === 'red' ? 'border-[#fdc9ce] dark:border-[#67070f]' : ''
        }
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
        </Link>
      ) : (
        <>
          <button
            type="submit"
            disabled={disabled || false}
            data-testid={label}
            onClick={onClick || null}
            // eslint-disable-next-line max-len
            className={`absolute cursor-pointer rounded-full disabled:cursor-not-allowed ${
              backGroundColor === 'blue' ? 'bg-blue hover:bg-[#1a8cd8]' : ''
            }  ${
              backGroundColor === 'white' ? 'bg-white hover:bg-[#e6e6e6]' : ''
            }  ${
              backGroundColor === 'black'
                ? 'bg-pure-black hover:bg-[#031018]'
                : ''
            }  ${backGroundColor === 'red' ? 'bg-[#f7e1e3] ' : ''}   ${
              backGroundColor === 'warningRed'
                ? 'bg-warning hover:bg-[#dc1e29] '
                : ''
            } ${
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
          borderColor === 'white' ? 'border-border-gray dark:border-white' : ''
        }  ${borderColor === 'black' ? 'border-black' : ''} ${
          borderColor === 'gray' ? 'border-light-gray' : ''
        } ${
          borderColor === 'red' ? 'border-[#fdc9ce] dark:border-[#67070f]' : ''
        }
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
        </>
      )}
    </div>
  );
}

export default Button;
