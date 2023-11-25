import React, { useState, useEffect } from 'react';
import Media from './Media';
import AddEmoji from './AddEmoji';

function AddPost() {
  const [files, setFiles] = useState([]);
  const [text, setText] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (e) => {
    const fileList = Array.from(e.target.files);
    console.log(fileList);
    if (fileList.length > 4) setFiles([]);
    else {
      const fileURLs = fileList.map((file) => URL.createObjectURL(file));
      setFiles(fileURLs);
    }
  };

  useEffect(() => {
    if (files.length === 0 && text === '') setIsDisabled(true);
    else setIsDisabled(false);
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
          value={text}
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
            accept="image/*"
            id="mediaUpload"
            className="hidden"
            onChange={handleChange}
            multiple
          />
          <AddEmoji
            text={text}
            setText={setText}
          />
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
