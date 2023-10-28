
import React, { useState } from 'react';
import Button from '../form-controls/Button';
import EmailInput from '../form-controls/emailInput';
import PasswordInput from '../form-controls/passwordInput';
import GoogleSignInBtn from '../form-controls/GoogleSignIn';
import ForgotPassword from './ForgotPassword';
function Login({ isOpen, onClose}) {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const togglePopup = () => {
    setIsPasswordOpen(!isPasswordOpen);
  };
  const handleClick = () => {
    setIsPasswordOpen(true)
  };
  if (!isOpen ) {
    return null; 
  }
  if (isPasswordOpen) {
    return(<ForgotPassword isOpen={isPasswordOpen} onClose={togglePopup} />); 
  }

  return (
    <div className="popup-screen flex h-screen w-full items-center justify-center md:bg-black  md:bg-opacity-50">
      <div className="popup-content relative flex h-full w-full md:h-[650px] md:w-[600px] flex-col items-center justify-center rounded-2xl bg-white ">
        <div className=" absolute top-0 h-[53px] w-[600px]  mt-3 ">
          
            <button
              className="fixed top-3 left-3 md:absolute md:top-0  md:left-3  h-[20px] w-[20px] text-sm"
              onClick={onClose}
            >
              <svg viewBox="0 0 48 48" fill="#5F6368"><path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"></path><path d="M0 0h48v48H0z" fill="none"></path></svg>
            </button>
          
          <svg
            width="30px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className=' mx-auto absolute top-0 left-0 right-0'
            
          >
            {' '}
            <path
              d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
              className="fill-black dark:fill-white"
            />
          </svg>
        </div>
        <div className=" flex h-[536px] w-[300px] flex-col items-center justify-around">
          <div className='w-[300px] flex flex-row justify-start'>
          <h1 className=" my-3 text-[31px] font-bold ">Sign in to X</h1>
          </div>
          <div className=" w-[300px] ">
            <GoogleSignInBtn />
          </div>
          <div className="flex flex-row">
            <hr className=" m-4 w-[125px] text-dark-gray" />
            <h1 className=" text-[20px]">or</h1>
            <hr className=" m-4 w-[125px] text-dark-gray" />
          </div>
          <EmailInput />
          <PasswordInput />
          <Button
            backGroundColor="black"
            label="Log in"
            borderColor="black"
            labelColor="white"
            path=""
          />
          <Button
            backGroundColor="white"
            label="Forgot password?"
            borderColor="black"
            labelColor="black"
            path=""
          />
          <button onClick={handleClick}>Show Component</button>
          

<div className='w-[300px] flex flex-row justify-start'>
          <h1 className="text-[15px] text-dark-gray">
            Don't have an account?
            <span>
              <a
                href="#"
                className="text-blue"
              >
                {' '}
                Sign up{' '}
              </a>
            </span>
          </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
