import React, { useState, useEffect } from 'react';
import Media from './Media';

function AddPost() {
  const [files, setFiles] = useState([]);
  const [text, setText] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  function handleChange(e) {
    const fileList = Array.from(e.target.files);
    if (fileList.length > 4) setFiles([]);
    else {
      const fileURLs = fileList.map((file) => URL.createObjectURL(file));
      setFiles(fileURLs);
    }
  }

  useEffect(() => {
    if (files.length === 0 && text === '') setIsDisabled(true);
    else setIsDisabled(false);
    console.log(isDisabled);
  }, [files, text]);
  return (
    <div className="tweet mt-[0.5px] flex w-[88%] flex-row   bg-white px-[16px] pt-[12px] dark:bg-pure-black dark:text-white dark:hover:bg-pure-black md:w-[598px]">
      <div className="leftColumn mr-[12px] h-[40px] w-[40px] ">
        <div className="profileImage leftColumn mr-[12px] h-[40px] w-[40px] ">
          <img
            src="https://images.pexels.com/photos/18758948/pexels-photo-18758948/free-photo-of-head-of-black-poodle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="profileImage"
            className=" h-[40px] w-[40px] rounded-full object-cover"
          />
        </div>
      </div>

      <div className="rightColumn h-auto min-h-[153px] w-[512px]">
        <textarea
          placeholder="What is happening?!"
          className="h-auto min-h-[70px] w-full resize-none  py-1 text-[20px] text-black outline-none placeholder:font-thin placeholder:text-light-thin"
          rows={1}
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <Media images={files} />

        <div className="media my-3 flex flex-row justify-between border-t-[0.5px] border-t-x-light-gray py-2">
          <label
            htmlFor="mediaUpload"
            className=" cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18.75px] w-[18.75px] "
            >
              <path
                d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"
                className=" fill-blue"
              />
            </svg>
          </label>
          <input
            type="file"
            id="mediaUpload"
            className="hidden"
            onChange={handleChange}
            multiple
          />
          <button
            type="submit"
            className="flex flex-col justify-start"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18.75px] w-[18.75px] "
            >
              <path
                d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"
                className=" fill-blue"
              />
            </svg>
          </button>
          <button
            type="submit"
            id="post"
            disabled={isDisabled}
            className="flex h-[36px] w-[66px] items-center justify-center rounded-3xl border-blue bg-blue font-bold  text-white disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
