/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Media from './Media';
import AddEmoji from './AddEmoji';
import TextField from './TextField';

function AddPost({ tweet, setTweet }) {
  const [files, setFiles] = useState([]);
  const [filesURLs, setFilesURLs] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [hashtagsString, setHashtagsString] = useState('');
  const [text, setText] = useState('');
  const [postDisabled, setPostDisabled] = useState(true);

  const resetAll = () => {
    setText('');
    setFilesURLs([]);
    setHashtags([]);
    setFiles([]);
    setHashtagsString('');
    setPostDisabled(true);
  };
  const handlePost = () => {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('hashtags', hashtagsString);
    for (let index = 0; index < 4; index += 1) {
      formData.append(`files[${index}]`, {});
    }

    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    // const data = Object.fromEntries(formData);
    // console.log(data);
    resetAll();
    const postData = async () => {
      try {
        const response = await fetch(
          'https://2f29bfea-6dd0-4327-b865-9a8db1f872e9.mock.pstmn.io/tweets/add',
          {
            method: 'POST',
            body: formData, // Convert the data to JSON format
          },
        );
        const data = await response.json();
        setTweet(data.data);
        console.log(data.data);
      } catch (error) {
        console.log('Error fetching timeline:', error);
      }
    };

    postData();
    // console.log(files, text, hashtags, hashtagsString, isTweeted);
  };

  const handleImageChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
    if (fileList.length > 4) setFiles([]);
    else {
      setFilesURLs(fileList.map((file) => URL.createObjectURL(file)));
    }

    if (fileList.length === 0 && text === '') setPostDisabled(true);
    else setPostDisabled(false);
  };

  useEffect(() => {
    if (files.length === 0 && text === '') setPostDisabled(true);
    else {
      setHashtags(text.match(/#\w+/g));
      if (hashtags !== null && hashtags.length !== 0)
        setHashtagsString(hashtags.join(','));
      setPostDisabled(false);
    }
  }, [files, text]);
  return (
    <div className="flex items-center justify-center border-y-[0.5px] border-y-border-gray">
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

        <div className="rightColumn h-auto w-full">
          <div className="  placeholder:text-light-thin">
            <TextField
              text={text}
              setText={setText}
            />
          </div>
          <Media images={filesURLs} />

          <div className="media my-3 flex flex-row items-center justify-between border-t-[0.5px] border-t-border-gray py-2">
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
              onChange={handleImageChange}
              multiple
            />
            <AddEmoji
              text={text}
              setText={setText}
            />

            <button
              onClick={handlePost}
              type="submit"
              id="post"
              disabled={postDisabled}
              className="flex h-[36px] w-[66px] items-center justify-center rounded-3xl border-blue bg-blue font-bold  text-white disabled:opacity-50"
            >
              Post
            </button>
          </div>
        </div>
      </div>
      {/* {isTweeted && <Tweet data={tweet} />} */}
    </div>
  );
}

export default AddPost;
