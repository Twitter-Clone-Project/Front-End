import React, { useState } from 'react';

function ActionsMenu() {
  const [show, toggleShow] = useState('hidden');
  const showMenu = () => {
    if (show === 'hidden') toggleShow('');
    else if (show === '') toggleShow('hidden');
  };
  return (
    <div className="dropdown relative inline-block scale-75 ">
      <button
        type="submit"
        onClick={() => showMenu()}
        className="dropbtn group rounded-2xl hover:bg-blue-light"
      >
        <svg
          viewBox="0 0 25 25"
          className="h-[30px] w-[30px]  "
        >
          <path
            className="fill-dark-gray group-hover:fill-blue "
            d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
          />
        </svg>
      </button>
      <div
        id="myDropdown"
        className={`dropdown-content absolute ${show} 
          right-[-10px]  flex h-[200px] w-[480px]
           flex-col rounded-2xl bg-white drop-shadow-xl`}
      >
        <div className="flex flex-row hover:bg-xx-light-gray">
          <div className="py-5 pl-4">
            <svg
              viewBox="0 0 25 25"
              className="h-[25px] w-[25px]  "
            >
              <path
                className=""
                d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm13 4v3h2v-3h3V8h-3V5h-2v3h-3v2h3zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"
              />
            </svg>
          </div>
          <button
            type="submit"
            className="h-[60px]  px-[14px] py-[16px] text-[22px] font-semibold"
          >
            Follow {}
          </button>
        </div>
        <div className="flex flex-row hover:bg-xx-light-gray">
          <div className="py-5 pl-4">
            <svg
              viewBox="0 0 25 25"
              className="h-[25px] w-[25px]  "
            >
              <path
                className=""
                d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm13 4v3h2v-3h3V8h-3V5h-2v3h-3v2h3zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"
              />
            </svg>
          </div>
          <button
            type="submit"
            className="h-[60px]  px-[14px] py-[16px] text-[22px] font-semibold"
          >
            Follow {}
          </button>
        </div>
        <div className="flex flex-row hover:bg-xx-light-gray">
          <div className="py-5 pl-4">
            <svg
              viewBox="0 0 25 25"
              className="h-[25px] w-[25px]  "
            >
              <path
                className=""
                d="M12 3.75c-4.55 0-8.25 3.69-8.25 8.25 0 1.92.66 3.68 1.75 5.08L17.09 5.5C15.68 4.4 13.92 3.75 12 3.75zm6.5 3.17L6.92 18.5c1.4 1.1 3.16 1.75 5.08 1.75 4.56 0 8.25-3.69 8.25-8.25 0-1.92-.65-3.68-1.75-5.08zM1.75 12C1.75 6.34 6.34 1.75 12 1.75S22.25 6.34 22.25 12 17.66 22.25 12 22.25 1.75 17.66 1.75 12z"
              />
            </svg>
          </div>
          <button
            type="submit"
            className="h-[60px]  px-[14px] py-[16px] text-[22px] font-semibold"
          >
            Follow {}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActionsMenu;
