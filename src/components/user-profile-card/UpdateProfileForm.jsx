import React, { useReducer, useRef, useState } from 'react';
import moment from 'moment/moment';
import PropTypes from 'prop-types';
import BoxCard from '../BoxCard';
import Button from '../form-controls/Button';
import NameInput from '../form-controls/nameInput';
import { useAuth } from '../../hooks/AuthContext';
import BasicInput from '../form-controls/BasicInput';
import DorpDownMenu from '../form-controls/DorpDownMenu';
import TextArea from '../form-controls/TextArea';
import ImageButton from './ImageButton';

function DOBReducer(state, action) {
  switch (action.type) {
    case 'month': {
      let cnt = moment(
        moment().month(action.payload).format('MM'),
        'MM',
      ).daysInMonth();

      if (state.year)
        cnt = moment(
          `${state.year}-${moment().month(action.payload).format('MM')}`,
          'YYYY-MM',
        ).daysInMonth();
      else if (action.payload === 'February') cnt = 29;

      return {
        ...state,
        month: action.payload,
        day: state.day <= cnt ? state.day : '',
        daysCnt: cnt,
      };
    }
    case 'day':
      return { ...state, day: action.payload };
    case 'year': {
      const cnt = moment(
        `${action.payload}-${moment().month(state.month).format('MM')}`,
        'YYYY-MM',
      ).daysInMonth();
      return {
        ...state,
        year: action.payload,
        day: state.day <= cnt ? state.day : '',
        daysCnt: cnt,
      };
    }
    default:
      return state;
  }
}

function UpdateProfileForm({ setUpdateFormOpen }) {
  const { user } = useAuth();

  const DOBInitialState = {
    month: '',
    day: '',
    year: '',
    monthItems: [],
    daysCnt: 31,
    yearsCnt: 120,
  };
  const bannerInput = useRef(null);
  const picInput = useRef(null);
  const [banner, setBanner] = useState(null);
  const [pic, setPic] = useState(null);
  const [name, setName] = useState(user.name);
  const [nameErr, setNameErr] = useState('');
  const [bio, setBio] = useState(user.bio || '');
  const [bioErr, setBioErr] = useState(user.bio || '');
  const [location, setLocation] = useState(user.location || '');
  const [locationErr, setLocationErr] = useState('');
  const [website, setWebsite] = useState(user.location || '');
  const [websiteErr, setWebsiteErr] = useState('');
  const [DOBEdit, setDOBEdit] = useState(false);
  const [DOB, dispacth] = useReducer(DOBReducer, DOBInitialState);

  return (
    <div className="fixed bottom-0 left-0 top-0 z-[2000] flex h-screen w-full items-center justify-center bg-dark-gray bg-opacity-30">
      <BoxCard
        header={
          <div className="flex h-full w-full items-center">
            <div className="fixed z-[100] flex w-[calc(100%-1rem-1px)] flex-1 items-center justify-between bg-white bg-opacity-70 px-4 py-2 dark:bg-pure-black md:w-[598px] md:rounded-tl-2xl">
              <p className="flex items-center justify-between gap-6 text-xl font-bold">
                <button
                  type="button"
                  onClick={() => setUpdateFormOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full align-middle hover:bg-light-hover-layout dark:hover:bg-hover-layout"
                >
                  <span className="text-base">&#10005;</span>
                </button>
                Edit profile
              </p>

              <Button
                label="Save"
                width="w-20"
                backGroundColorDark="white"
                labelColorDark="black"
                borderColor="none"
                backGroundColor="black"
                labelColor="white"
              />
            </div>
          </div>
        }
      >
        <div className="mt-6">
          <div className="mb-6">
            <div className="profile-cover max-h-[500px] border-y-[0.5px] border-y-light-gray">
              <div className="relative object-fill">
                <img
                  className="m-auto aspect-[3/1] max-h-full w-full cursor-pointer object-fill"
                  src={
                    banner
                      ? URL.createObjectURL(banner)
                      : import.meta.env.VITE_DEFAULT_BANNER
                  }
                  alt="cover"
                />
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-5">
                  <ImageButton
                    onclick={() => bannerInput.current.click()}
                    label="Add photo"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        console.log(e.target.files[0]);
                        setBanner(e.target.files[0]);
                      }}
                      ref={bannerInput}
                    />
                    <svg
                      viewBox="0 0 24 24"
                      className="flex h-6 w-6"
                    >
                      <g>
                        <path
                          className="fill-white"
                          d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"
                        />
                      </g>
                    </svg>
                  </ImageButton>
                  {banner && (
                    <ImageButton
                      onclick={() => setBanner(null)}
                      label="Remove photo"
                    >
                      <span className="text-white">&#10005;</span>
                    </ImageButton>
                  )}
                </div>
              </div>
            </div>
            <div className="relative cursor-auto bg-white bg-opacity-100 p-4 text-black dark:bg-pure-black dark:text-white">
              <div className="absolute -top-0 z-10 flex aspect-square w-1/5 min-w-[3rem] -translate-y-1/2 justify-between">
                <div className="relative flex justify-between">
                  <img
                    id="popoverImg"
                    src={
                      pic
                        ? URL.createObjectURL(pic)
                        : import.meta.env.VITE_DEFAULT_AVATAR
                    }
                    alt=""
                    className="relative h-auto cursor-pointer rounded-full border-4 border-white dark:border-pure-black"
                  />
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-5">
                    <ImageButton
                      onclick={() => picInput.current.click()}
                      label="Add photo"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setPic(e.target.files[0])}
                        ref={picInput}
                      />
                      <svg
                        viewBox="0 0 24 24"
                        className="flex h-6 w-6"
                      >
                        <g>
                          <path
                            className="fill-white"
                            d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"
                          />
                        </g>
                      </svg>
                    </ImageButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form className="flex flex-col gap-4 p-4">
            <NameInput
              title="Name"
              Name={name}
              setName={setName}
              maxLength={50}
              error={nameErr}
              setError={setNameErr}
            />
            <TextArea
              title="Bio"
              multiline
              value={bio}
              setValue={setBio}
              error={bioErr}
              setError={setBioErr}
            />
            <BasicInput
              title="Location"
              value={location}
              setValue={setLocation}
              error={locationErr}
              setError={setLocationErr}
            />
            <BasicInput
              title="Website"
              value={website}
              setValue={setWebsite}
              error={websiteErr}
              setError={setWebsiteErr}
            />

            <div className="flex flex-col">
              <p
                className={`py-3 text-sm  ${
                  DOBEdit
                    ? 'font-semibold text-pure-black dark:text-white'
                    : 'text-light-thin'
                }`}
              >
                Birth Date{' '}
                <button
                  type="button"
                  className="font-normal"
                  onClick={() => setDOBEdit((prev) => !prev)}
                >
                  <span className="text-light-thin"> &bull; </span>
                  <span className="text-blue hover:underline">
                    {DOBEdit ? 'Cancel' : 'Edit'}
                  </span>
                </button>
              </p>
              {DOBEdit && (
                <div className="DOB grid grid-cols-[6fr_2fr_3fr] gap-4">
                  <DorpDownMenu
                    header="Month"
                    items={['', ...moment.months()]}
                    state={DOB.month}
                    setState={(month) =>
                      dispacth({ type: 'month', payload: month })
                    }
                  />
                  <DorpDownMenu
                    header="Day"
                    items={[
                      '',
                      ...Array.from({ length: DOB.daysCnt }, (i, _i) => _i + 1),
                    ]}
                    state={DOB.day}
                    setState={(day) => dispacth({ type: 'day', payload: day })}
                  />
                  <DorpDownMenu
                    header="Year"
                    items={[
                      '',
                      ...Array.from(
                        { length: DOB.yearsCnt },
                        (i, _i) => new Date().getFullYear() - _i,
                      ),
                    ]}
                    state={DOB.year}
                    setState={(year) =>
                      dispacth({ type: 'year', payload: year })
                    }
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </BoxCard>
    </div>
  );
}

UpdateProfileForm.defaultProps = {
  setUpdateFormOpen: () => {},
};
UpdateProfileForm.propTypes = {
  setUpdateFormOpen: PropTypes.func,
};
export default UpdateProfileForm;
