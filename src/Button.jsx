import * as React from 'react';


const Button = (props) => {

    return (
        <div className='relative w-full h-[38.5px]'>
            <button className={` absolute rounded-3xl ${props.backGroundColor == "blue" ? 'bg-blue' : ''}  ${props.backGroundColor == "white" ? 'bg-white' : ''}  ${props.backGroundColor == "black" ? 'bg-black' : ''} w-full h-full border ${props.borderColor == "blue" ? 'border-blue' : ''}  ${props.borderColor == "white" ? 'border-white' : ''}  ${props.borderColor == "black" ? 'border-black' : ''}`}></button>
            <div className='flex absolute pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full justify-center'>
                {props.path &&
                    <svg className='w-5 h-5' viewBox='0 0 24 24'><g ><path d={`${props.path}`}></path></g> </svg>
                }
                <label className={`flex text-base font-bold ${props.labelColor == "blue" ? 'text-blue' : ''}  ${props.labelColor == "white" ? 'text-white ' : ''}  ${props.labelColor == "black" ? 'text-black' : ''}  items-start`}>{props.label}</label>
            </div>
        </div>
    );




};


export default Button;
