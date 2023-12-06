import React, { useReducer, useRef, useState, useEffect, useMemo } from 'react';
import moment from 'moment/moment';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import BoxCard from '../BoxCard';
import Button from '../form-controls/Button';
import NameInput from '../form-controls/nameInput';
import { useAuth } from '../../hooks/AuthContext';
import BasicInput from '../form-controls/BasicInput';
import DorpDownMenu from '../form-controls/DorpDownMenu';
import TextArea from '../form-controls/TextArea';
import ImageButton from './ImageButton';
import OwnToaster from '../OwnToaster';
import UpdateCancel from './UpdateCancel';

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
  const { user, dispatch } = useAuth();
  const DOBInitialState = useMemo(
    () => ({
      month: moment(new Date(user.birthDate)).format('MMMM'),
      day: moment(new Date(user.birthDate)).format('D'),
      year: moment(new Date(user.birthDate)).year(),
      daysCnt: 31,
      yearsCnt: 120,
    }),
    [user],
  );
  const bannerInput = useRef(null);
  const picInput = useRef(null);
  const [updated, setUpdated] = useState(false);
  const [confrimCancel, setConfirmCancel] = useState(false);
  const [curBanner, setCurBanner] = useState(
    user.bannerUrl || import.meta.env.VITE_DEFAULT_BANNER,
  );
  const [banner, setBanner] = useState(null);
  const [pic, setPic] = useState(null);
  const [name, setName] = useState(user.name);
  const [nameErr, setNameErr] = useState('');
  const [bio, setBio] = useState(user.bio || '');
  const [bioErr, setBioErr] = useState('');
  const [location, setLocation] = useState(user.location || '');
  const [locationErr, setLocationErr] = useState('');
  const [website, setWebsite] = useState(user.website || '');
  const [websiteErr, setWebsiteErr] = useState('');
  const [DOBEdit, setDOBEdit] = useState(false);
  const [DOB, dispacth] = useReducer(DOBReducer, DOBInitialState);

  const totalError = nameErr || bioErr || locationErr || websiteErr || !name;

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('location', location);
    formData.append('website', website);
    formData.append(
      'birthDate',
      `${DOB.year}-${moment().month(DOB.month).format('MM')}-${DOB.day}`,
    );
    formData.append('profilePhoto', pic);
    if (banner || curBanner === import.meta.env.VITE_DEFAULT_BANNER) {
      formData.append('isUpdated', 'TRUE');
      formData.append('bannerPhoto', banner);
    } else {
      formData.append('isUpdated', 'FALSE');
      formData.append('bannerPhoto', banner);
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}profile/updateProfile`,
        {
          method: 'PATCH',
          origin: true,
          credentials: 'include',
          withCredentials: true,
          body: formData,
        },
      );
      const data = await res.json();
      if (data.status === false) throw new Error(data.message);
      dispatch({ type: 'LOGIN', payload: data.data });
      toast('Your data has been updated successfully!');
      setUpdateFormOpen(false);
    } catch (err) {
      toast(err.message);
    }
  };
  useEffect(() => {
    if (
      !banner &&
      curBanner === user.bannerUrl &&
      !pic &&
      name === user.name &&
      bio === (user.bio || '') &&
      location === (user.location || '') &&
      website === (user.website || '') &&
      JSON.stringify(DOB) === JSON.stringify(DOBInitialState)
    )
      setUpdated(false);
    else setUpdated(true);
  }, [
    banner,
    pic,
    name,
    bio,
    location,
    website,
    DOB,
    user,
    DOBInitialState,
    curBanner,
  ]);
  return (
    <div
      data-testid="update-profile-form"
      className="fixed bottom-0 left-0 top-0 z-[2000] flex h-screen w-full items-center justify-center bg-dark-gray bg-opacity-30"
    >
      {confrimCancel && updated && (
        <UpdateCancel
          onCancel={() => setConfirmCancel(false)}
          onDiscard={() => {
            setUpdateFormOpen(false);
          }}
        />
      )}
      <BoxCard
        header={
          <div className="flex h-full w-full items-center">
            <div className="fixed z-[100] flex w-[calc(100%-1rem-1px)] flex-1 items-center justify-between bg-white bg-opacity-70 px-4 py-2 dark:bg-pure-black md:w-[598px] md:rounded-tl-2xl">
              <p className="flex items-center justify-between gap-6 text-xl font-bold">
                <button
                  type="button"
                  onClick={() =>
                    updated ? setConfirmCancel(true) : setUpdateFormOpen(false)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full align-middle hover:bg-light-hover-layout dark:hover:bg-hover-layout"
                >
                  <span className="text-base">&#10005;</span>
                </button>
                Edit profile
              </p>

              <Button
                label="Save"
                width="w-20"
                disabled={totalError}
                onClick={handleUpdate}
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
            <div className="profile-cover max-h-[500px]">
              <div className="relative object-fill">
                <img
                  className="m-auto aspect-[3/1] max-h-full w-full cursor-pointer bg-pure-black object-fill opacity-70"
                  src={banner ? URL.createObjectURL(banner) : curBanner}
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
                      data-testid="cover-input"
                      onChange={(e) => {
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
                  {(curBanner !== import.meta.env.VITE_DEFAULT_BANNER ||
                    banner) && (
                    <ImageButton
                      onclick={() => {
                        if (!banner)
                          setCurBanner(import.meta.env.VITE_DEFAULT_BANNER);
                        else setCurBanner(user.bannerUrl);
                        setBanner(null);
                      }}
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
                <div className="relative flex w-full justify-between">
                  <img
                    id="popoverImg"
                    src={
                      pic
                        ? URL.createObjectURL(pic)
                        : user.imageUrl || import.meta.env.VITE_DEFAULT_AVATAR
                    }
                    alt=""
                    className="relative h-auto w-full cursor-pointer rounded-full border-4 border-white dark:border-pure-black"
                  />
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-5">
                    <ImageButton
                      onclick={() => picInput.current.click()}
                      label="Add photo"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        data-testid="photo-input"
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
          <form className="flex flex-col gap-7 p-4">
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
              maxLength={160}
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
                className={`pb-2 pt-3 text-sm  ${
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
              {!DOBEdit && (
                <p className="text-xl">
                  {moment(new Date(user.birthDate)).format('MMMM D, YYYY')}
                </p>
              )}
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
      <OwnToaster />
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
