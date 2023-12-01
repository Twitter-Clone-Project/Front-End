import React, { useReducer, useState } from 'react';
import moment from 'moment/moment';
import BoxCard from '../BoxCard';
import Button from '../form-controls/Button';
import NameInput from '../form-controls/nameInput';
import { useAuth } from '../../hooks/AuthContext';
import BasicInput from '../form-controls/BasicInput';
import DorpDownMenu from '../form-controls/DorpDownMenu';
import TextArea from '../form-controls/TextArea';

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

function UpdateProfileForm() {
  const { user } = useAuth();

  const DOBInitialState = {
    month: '',
    day: '',
    year: '',
    monthItems: [],
    daysCnt: 31,
    yearsCnt: 120,
  };

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
        classes="overflow-auto"
        header={
          <div className="flex w-full items-center justify-between p-4">
            <p className="flex items-center justify-between gap-6 text-xl font-bold">
              <button
                type="button"
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
        }
      >
        <div className="mt-6">
          <div className="mb-6">
            <div className="profile-cover max-h-[500px] border-y-[0.5px] border-y-light-gray">
              <div className="object-fill">
                <img
                  className="m-auto aspect-[3/1] max-h-full w-full cursor-pointer object-fill"
                  src={import.meta.env.VITE_DEFAULT_BANNER}
                  alt="cover"
                />
              </div>
            </div>
            <div className="relative cursor-auto bg-white bg-opacity-100 p-4 text-black dark:bg-pure-black dark:text-white">
              <div className="absolute -top-0 z-10 flex aspect-square w-1/5 min-w-[3rem] -translate-y-1/2 justify-between">
                <img
                  id="popoverImg"
                  src={import.meta.env.VITE_DEFAULT_AVATAR}
                  alt=""
                  className="h-auto cursor-pointer rounded-full border-4 border-pure-black"
                />
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
                  DOBEdit ? 'font-semibold text-white' : 'text-light-thin'
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

export default UpdateProfileForm;
