import React from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import Button from '../form-controls/Button';
import { useAuth } from '../../hooks/AuthContext';
import OwnToaster from '../OwnToaster';
import ConfirmPopUp from '../user-profile-card/ConfirmPopUp';

function LogoutConfirm() {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}auth/signout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          origin: true,
          credentials: 'include',
          withCredentials: true,
        },
      );

      const data = await res.json();
      if (data.status === false || data.status === 'error')
        throw new Error(data.message);
      else dispatch({ type: 'LOGOUT' });
    } catch (err) {
      toast(err.message);
    }
  };
  return (
    <ConfirmPopUp classes="h-[356px] pt-8">
      <div className="mx-auto">
        <svg
          width="40px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="mx-auto min-w-[24px]"
        >
          {' '}
          <path
            d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
            className="fill-black dark:fill-white"
          />
        </svg>
      </div>
      <div className="flex h-full w-full flex-col justify-start gap-5 px-8 py-3">
        <span className="text-xl font-bold">Log out of X?</span>
        <p className="text-sm text-light-thin">
          You can always log back in at any time.
          <br />
          Are you sure to Log Out?
        </p>
        <div className="flex h-full flex-col justify-end gap-4">
          <Button
            label="Log Out"
            labelColor="white"
            labelColorDark="black"
            backGroundColor="black"
            backGroundColorDark="white"
            borderColor="none"
            onClick={handleLogout}
          />

          <Button
            label="Cancel"
            labelColor="black"
            labelColorDark="white"
            backGroundColor="white"
            backGroundColorDark="black"
            borderColor="gray"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </ConfirmPopUp>
  );
}

export default LogoutConfirm;
