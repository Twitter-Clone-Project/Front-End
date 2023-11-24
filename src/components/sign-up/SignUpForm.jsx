import React, { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';
import validator from 'validator';
import PropTypes from 'prop-types';
import Button from '../form-controls/Button';
import EmailInput from '../form-controls/emailInput';
import NameInput from '../form-controls/nameInput';
import DorpDownMenu from '../form-controls/DorpDownMenu';
import PasswordInput from '../form-controls/passwordInput';
import EmailConfirm from './EmailConfirm';
import Spinner from '../Spinner';
import OwnToaster from '../OwnToaster';
import BoxCard from '../BoxCard';

function getMonthFromString(mon) {
  const d = Date.parse(`${mon}1, 2012`);
  if (!Number.isNaN(d)) {
    return new Date(d).getMonth() + 1;
  }
}

function SignUpForm({ test }) {
  const daysOfMonth = {
    none: `31`,
    January: `31`,
    February: `28`,
    March: `31`,
    April: `30`,
    May: `31`,
    June: `30`,
    July: `31`,
    August: `31`,
    September: `30`,
    October: `31`,
    November: `30`,
    December: `31`,
  };
  const [isCode, setIsCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [dateYear, setDateYear] = useState('');
  const [dateMonth, setDateMonth] = useState('');
  const [dateDay, setDateDay] = useState('');
  const [dayCount, setDayCount] = useState([]);
  const [next, setNext] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);

  const totalError =
    nameError ||
    usernameError ||
    emailError ||
    passwordConfirmError ||
    passwordError ||
    !name ||
    !userName ||
    !email ||
    !password ||
    !passwordConfirm ||
    !dateMonth ||
    !dateDay ||
    !dateYear ||
    !dayCount ||
    emailLoading ||
    usernameLoading;

  const passwordLengthCheck = () => {
    if (passwordConfirm.length < 7 && passwordConfirm !== '') {
      setPasswordConfirmError(
        'Your password needs to be at least 8 characters.',
      );
    }
    if (password.length < 7 && password !== '') {
      setPasswordError('Your password needs to be at least 8 characters.');
    }
  };
  const passwordCheck = () => {
    if (
      passwordConfirm !== password &&
      password !== '' &&
      passwordConfirm !== ''
    ) {
      setPasswordConfirmError('Passwords do not match');
    } else setPasswordConfirmError('');
  };

  const handleMonthYearChange = () => {
    let count;
    let days = [];
    if (dateMonth === '') {
      count = daysOfMonth.none;
    } else if (dateMonth === 'February' && dateYear % 4 === 0) {
      count = 29;
    } else {
      count = daysOfMonth[`${dateMonth}`];
    }
    for (let index = 0; index < count; index += 1) {
      // eslint-disable-next-line no-unused-expressions
      days = days.concat(index + 1);
    }
    setDayCount(days);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleMonthYearChange, [dateMonth, dateYear]);
  useEffect(() => {
    if (!name) return;
    if (validator.isAlpha(name))
      if (name.length < 2)
        setNameError('Name must contain atleast 2 character');
      else setNameError('');
    else setNameError('Name can only contain letters.');
  }, [name]);
  useEffect(() => {
    if (!userName || usernameError) return;
    setUsernameLoading(true);
    const controller = new AbortController();

    const timeId = setTimeout(() => {
      const usernameCheck = async () => {
        try {
          const res = await fetch(
            `http://${
              import.meta.env.VITE_API_DOMAIN
            }users/${userName}/isUsernameFound`,
            {
              signal: controller.signal,
            },
          );
          const data = await res.json();
          if (data.status === false) throw new Error(data.message);
          if (data.data.isFound) setUsernameError('Username is already taken');
          else
            setUsernameError((e) => {
              if (e === 'Username is already taken') return '';
              return e;
            });
        } catch (err) {
          if (err.name !== 'AbortError') toast(err.message);
        } finally {
          setUsernameLoading(false);
        }
      };
      usernameCheck();
    }, 0);
    return () => {
      clearTimeout(timeId);
      controller.abort();
    };
  }, [userName, usernameError]);

  useEffect(() => {
    if (!email || emailError) return;
    setEmailLoading(true);
    const controller = new AbortController();

    const timeId = setTimeout(() => {
      const emailCheck = async () => {
        try {
          const res = await fetch(
            `http://${
              import.meta.env.VITE_API_DOMAIN
            }users/${email}/isEmailFound`,
            {
              signal: controller.signal,
            },
          );
          const data = await res.json();
          if (data.status === false) throw new Error(data.message);
          if (data.data.isFound) setEmailError('Email is already taken');
          else
            setEmailError((e) => {
              if (e === 'Email is already taken') return '';
              return e;
            });
        } catch (err) {
          if (err.name !== 'AbortError') toast(err.message);
        } finally {
          setEmailLoading(false);
        }
      };
      emailCheck();
    }, 0);
    return () => {
      clearTimeout(timeId);
      controller.abort();
    };
  }, [email, emailError]);

  useEffect(() => {
    passwordCheck();
    passwordLengthCheck();
  });

  const handleSignUp = async (cap) => {
    try {
      setIsLoading(true);
      const info = {
        email,
        password,
        passwordConfirm,
        name,
        username: userName,
        dateOfBirth: `${dateYear}-${
          getMonthFromString(dateMonth) < 10
            ? `0${getMonthFromString(dateMonth)}`
            : `${getMonthFromString(dateMonth)}`
        }-${dateDay < 10 ? `0${dateDay}` : `${dateDay}`}`,
        gRecaptchaResponse: cap,
      };
      const res = await fetch(
        `http://${import.meta.env.VITE_API_DOMAIN}auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          origin: true,
          credentials: 'include',
          withCredentials: true,
          body: JSON.stringify(info),
        },
      );
      const data = await res.json();
      if (data.status === false) {
        throw new Error(data.message);
      }
      setIsCode(true);
    } catch (err) {
      toast(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isCode)
    return (
      <div className="popup-screen absolute bottom-0 left-0 top-0 z-20 flex w-full items-center justify-center md:bg-dark-gray md:bg-opacity-50">
        <EmailConfirm
          email={email}
          type="signup"
        />
      </div>
    );
  return (
    <>
      <div className="popup-screen relative bottom-0 left-0 top-0 z-20 flex w-full items-center justify-center md:bg-dark-gray md:bg-opacity-50">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {next && !test && (
              <div className="popup-screen absolute bottom-0 left-0 top-0 z-20 flex w-full items-center justify-center  pb-6 pt-2 md:bg-dark-gray md:bg-opacity-50">
                <ReCAPTCHA
                  sitekey="6LeousYoAAAAACH0uCm7e4NKQkOWgrZWxmPPCMBZ"
                  data-testid="google-recaptcha"
                  onChange={(val) => {
                    setNext(false);
                    handleSignUp(val);
                  }}
                />
              </div>
            )}
            <BoxCard classes="py-6 px-12 mx-auto">
              <div className="px-5w-full mx-auto flex min-w-[300px] flex-1 flex-col justify-between overflow-auto ">
                <div className="mx-auto flex pt-2 text-center dark:text-white">
                  <h1 className="mx-auto mt-5 flex-1 text-3xl font-bold">
                    <span>Create your account</span>
                  </h1>
                </div>
                <div className="mx-auto flex w-full flex-col p-3 ">
                  <div className="mx-auto w-full">
                    <div className="mb-6 w-full">
                      <NameInput
                        title="Name"
                        error={nameError}
                        setError={setNameError}
                        Name={name}
                        setName={setName}
                        maxLength="50"
                      />
                    </div>
                    <div className="mb-6 w-full">
                      <NameInput
                        Name={userName}
                        error={usernameError}
                        setError={setUsernameError}
                        setName={setUserName}
                        maxLength="25"
                        title="Username"
                      />
                    </div>
                    <div className="mb-6 w-full">
                      <PasswordInput
                        error={passwordError}
                        setError={setPasswordError}
                        password={password}
                        setPassword={setPassword}
                        title="Password"
                      />
                    </div>
                    <div className="mb-6 w-full">
                      <PasswordInput
                        error={passwordConfirmError}
                        setError={setPasswordConfirmError}
                        password={passwordConfirm}
                        setPassword={setPasswordConfirm}
                        title="Confirm Password"
                      />
                    </div>
                    <div className="mb-6 w-full">
                      <EmailInput
                        error={emailError}
                        setError={setEmailError}
                        email={email}
                        setEmail={setEmail}
                        valid={validEmail}
                        setValid={setValidEmail}
                      />
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="w-full font-bold dark:text-white">
                      <span>Date of birth</span>
                    </div>
                    <div className="w-full text-sm dark:text-light-thin">
                      <p>
                        <small className="form-text">
                          This will not be shown publicly, Confirm your own age,
                          even if this
                          <br /> account is for a business, a pet, or something
                          else
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="mx-auto flex w-full justify-between dark:text-white">
                    <div className="w-5/12">
                      <span>
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
                          state={dateMonth}
                          setState={setDateMonth}
                        />
                      </span>
                    </div>
                    <div className="w-3/12">
                      <DorpDownMenu
                        header="Day"
                        items={['', ...dayCount]}
                        state={dateDay}
                        setState={setDateDay}
                      />
                    </div>
                    <div className="w-3/12">
                      <DorpDownMenu
                        header="Year"
                        items={[
                          '',
                          ...Array.from(
                            {
                              length: new Date().getFullYear() - 1902,
                            },
                            (v, _i) => 1903 + _i,
                          ).reverse(),
                        ]}
                        state={dateYear}
                        setState={setDateYear}
                      />
                    </div>
                  </div>
                </div>

                <div className="mx-auto mt-3 flex w-full flex-col">
                  <Button
                    onClick={() => (test ? handleSignUp() : setNext(true))}
                    backGroundColor="black"
                    backGroundColorDark="white"
                    labelColor="white"
                    labelColorDark="black"
                    disabled={totalError}
                    label="Next"
                    path=""
                  />
                </div>
              </div>
            </BoxCard>
          </>
        )}
      </div>
      <OwnToaster />
    </>
  );
}

SignUpForm.defaultProps = {
  test: false,
};

SignUpForm.propTypes = {
  test: PropTypes.bool,
};

export default SignUpForm;
