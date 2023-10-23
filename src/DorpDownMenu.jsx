import * as React from 'react';


const DorpDownMenu = (props) => {


  return (
    <div className='relative h-14 w-full outline outline-light-gray rounded focus-within:outline-blue focus-within:outline-2 '>
      <select name={props.header} id="selector1" className='absolute w-full mt-4 px-2 pt-2 mb-2  text-base peer outline-none appearance-none cursor-pointer bg-white dark:bg-black ' >
        <option label="" disabled selected className='hidden'></option>
        {props.items.map((item) => (
          <option >{item}</option>)
        )}

      </select>
      <label htmlFor="selector1" className='absolute left-0 leading-4 text-[13px] pl-2 pr-2 pt-2 peer-focus:text-blue pointer-events-none text-black dark:text-white'>{props.header}</label>
      <svg className='absolute top-7 mt-[-11.25px] right-3 w-[22.5px] h-[22.5px] fill-light-gray  peer-focus:fill-blue pointer-events-none' viewBox="0 0 24 24"><path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"></path></svg>
    </div>
  );
};


export default DorpDownMenu;
