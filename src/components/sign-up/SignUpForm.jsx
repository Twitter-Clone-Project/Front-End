import React, { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';
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

function SignUpForm() {
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
  const [captacha, setCapatcha] = useState('');
  const [next, setNext] = useState(false);
  const [user, setUser] = useState({});

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
    !dayCount;
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
  useEffect(() => {
    passwordCheck();
    passwordLengthCheck();
  });

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

  const handleSignUp = async () => {
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
        gRecaptchaResponse: captacha,
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
      setUser(data);
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
          data={user}
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
            {next && (
              <div className="popup-screen absolute bottom-0 left-0 top-0 z-20 flex w-full items-center justify-center  pb-6 pt-2 md:bg-dark-gray md:bg-opacity-50">
                <ReCAPTCHA
                  sitekey="6LeousYoAAAAACH0uCm7e4NKQkOWgrZWxmPPCMBZ"
                  onChange={(val) => {
                    setCapatcha(val);
                    setNext(false);
                    handleSignUp();
                  }}
                />
              </div>
            )}

            <BoxCard classes="py-6 overflow-auto mx-auto">
              <div className="mx-auto min-w-[300px]">
                <div className="mx-auto w-5/6 pt-2 text-center dark:text-white">
                  <h1 className="mt-5 w-full text-3xl font-bold">
                    <span>Create your account</span>
                  </h1>
                </div>
                <div className="mx-auto flex flex-col px-3 py-3">
                  <div className="w-full ">
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
                  <div className="py-2 pt-0">
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
                  <div className=" flex w-full justify-between dark:text-white">
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
                    <div className="w-3/12 ">
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
                  <div className="mt-7 flex w-full justify-center">
                    <Button
                      onClick={() => setNext(true)}
                      backGroundColor="white"
                      borderColor="gray"
                      disabled={totalError}
                      labelColor="black"
                      label="Next"
                      path=""
                    />
                  </div>
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

export default SignUpForm;
