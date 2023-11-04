import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from '../form-controls/Button';
import EmailInput from '../form-controls/emailInput';
import NameInput from '../form-controls/nameInput';
import DorpDownMenu from '../form-controls/DorpDownMenu';
import PasswordInput from '../form-controls/passwordInput';

function SignUpForm() {
  const [name, setName] = useState('');

  const [error, setError] = useState('');

  const [userName, setUserName] = useState('');

  const [password, setPassword] = useState('');

  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [email, setEmail] = useState('');

  function onChange(value) {
    console.log('Captcha value:', value);
  }

  // const [step, setStep] = useState(1);
  // const handleClick = () => {
  //   setStep(step++);
  // };
  return (
    <div className="">
      <div className="flex h-[auto] w-screen items-center justify-center">
        <div className="flex h-auto w-2/5 flex-wrap justify-center rounded-lg bg-pure-black">
          <div className="w-full">
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 inline-flex items-start rounded pl-3 pt-4 font-bold"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.28033 5.21967C5.98744 4.92678 5.51256 4.92678 5.21967 5.21967C4.92678 5.51256 4.92678 5.98744 5.21967 6.28033L8.93934 10L5.21967 13.7197C4.92678 14.0126 4.92678 14.4874 5.21967 14.7803C5.51256 15.0732 5.98744 15.0732 6.28033 14.7803L10 11.0607L13.7197 14.7803C14.0126 15.0732 14.4874 15.0732 14.7803 14.7803C15.0732 14.4874 15.0732 14.0126 14.7803 13.7197L11.0607 10L14.7803 6.28033C15.0732 5.98744 15.0732 5.51256 14.7803 5.21967C14.4874 4.92678 14.0126 4.92678 13.7197 5.21967L10 8.93934L6.28033 5.21967Z"
                  fill="white"
                />
              </svg>
              {/* <p className=" px-4 pb-4 text-2xl font-bold text-white">
                Step {step} of 5
              </p> */}
            </button>
          </div>
          <div className="w-5/6 pl-0 pt-4 text-white">
            <h1 className="w-full text-3xl font-bold">
              <span>Create your account</span>
            </h1>
          </div>
          <div className="flex w-5/6 flex-wrap p-8 pl-0">
            <div className="w-full ">
              <div className="mb-6 w-full">
                <NameInput
                  error=""
                  setError=""
                  Name={name}
                  setName={setName}
                  label="Name"
                  maxLength="50"
                />
              </div>
              <div className="mb-6 w-full">
                <NameInput
                  error=""
                  setError=""
                  Name={userName}
                  setName={setUserName}
                  label="Username"
                  maxLength="20"
                />
              </div>
              <div className="mb-6 w-full">
                <PasswordInput
                  password={password}
                  setPassword={setPassword}
                  title="Password"
                />
              </div>
              <div className="mb-6 w-full">
                <PasswordInput
                  password={passwordConfirm}
                  setPassword={setPasswordConfirm}
                  title="Confirm Password"
                />
              </div>
              <div className="mb-4 w-full">
                <EmailInput
                  error={error}
                  setError={setError}
                  email={email}
                  setEmail={setEmail}
                />
              </div>
            </div>
            <div className="py-4">
              <div className="w-full font-bold text-white">
                <span>Date of birth</span>
              </div>
              <div className="text-1xl w-full text-light-thin">
                <p>
                  <small className="form-text text-muted">
                    This will not be shown publicly, Confirm your own age, even
                    if this
                    <br /> account is for a business, a pet, or something else
                  </small>
                </p>
              </div>
            </div>
            <div className=" flex w-full justify-between text-white">
              <div className="w-5/12">
                <DorpDownMenu
                  header="Month"
                  items={[
                    '',
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ]}
                />
              </div>
              <div className="w-3/12 ">
                {' '}
                <DorpDownMenu
                  header="Day"
                  items={[
                    '',
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    23,
                    24,
                    25,
                    26,
                    27,
                    28,
                    29,
                    30,
                    31,
                  ]}
                />
              </div>
              <div className="w-3/12">
                <DorpDownMenu
                  header="Year"
                  items={[
                    '',
                    2023,
                    2022,
                    2021,
                    2020,
                    2019,
                    2018,
                    2017,
                    2016,
                    2015,
                    2014,
                    2013,
                    2012,
                    2011,
                    2010,
                    2009,
                    2008,
                    2007,
                    2006,
                    2005,
                    2004,
                    2003,
                    2002,
                    2001,
                    2000,
                    1999,
                    1998,
                    1997,
                    1996,
                    1995,
                    1994,
                    1993,
                    1992,
                    1991,
                    1990,
                    1989,
                    1988,
                    1987,
                    1986,
                    1985,
                    1984,
                    1983,
                    1982,
                    1981,
                    1980,
                    1979,
                    1978,
                    1977,
                    1976,
                    1975,
                    1974,
                    1973,
                    1972,
                    1971,
                    1970,
                    1969,
                    1968,
                    1967,
                    1966,
                    1965,
                    1964,
                    1963,
                    1962,
                    1961,
                    1960,
                    1959,
                    1958,
                    1957,
                    1956,
                    1955,
                    1954,
                    1953,
                    1952,
                    1951,
                    1950,
                    1949,
                    1948,
                    1947,
                    1946,
                    1945,
                    1944,
                    1943,
                    1942,
                    1941,
                    1940,
                    1939,
                    1938,
                    1937,
                    1936,
                    1935,
                    1934,
                    1933,
                    1932,
                    1931,
                    1930,
                    1929,
                    1928,
                    1927,
                    1926,
                    1925,
                    1924,
                    1923,
                    1922,
                    1921,
                    1920,
                    1919,
                    1918,
                    1917,
                    1916,
                    1915,
                    1914,
                    1913,
                    1912,
                    1911,
                    1910,
                    1909,
                    1908,
                    1907,
                    1906,
                    1905,
                    1904,
                    1903,
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-wrap justify-center pb-6">
            <div className="flex justify-center pb-6">
              <ReCAPTCHA
                sitekey="6LfYH-koAAAAANSm9Cz5hmubDirSAQIQZFI7koxP"
                onChange={onChange}
              />
            </div>
            <Button
              backGroundColor="white"
              borderColor="white"
              labelColor="pure-black"
              label="Next"
              path=""
              width="w-5/6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
