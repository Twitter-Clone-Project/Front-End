/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
// import Media from './Media';
import { useNavigate, Link } from 'react-router-dom';
import AddEmoji from './AddEmoji';
import TextField from './TextField';
import { useAuth } from '../hooks/AuthContext';
import MediaRemove from './MediaRemove';

function AddPost({ setTweets }) {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [filesURLs, setFilesURLs] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [hashtagsString, setHashtagsString] = useState('');
  const [text, setText] = useState('');
  const [postDisabled, setPostDisabled] = useState(true);
  const [isWhitespace, setIsWhitespace] = useState(true);
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
    if (isWhitespace) formData.append('tweetText', '');
    else formData.append('tweetText', text);
    if (hashtags) {
      for (let i = 0; i < hashtags.length; i += 1) {
        formData.append('trends', hashtags[i]);
      }
    }
    if (files) {
      for (let i = 0; i < files.length; i += 1) {
        formData.append('media', files[i]);
      }
    }

    resetAll();

    const postData = async () => {
      try {
        const response = await fetch(
          `http://${import.meta.env.VITE_API_DOMAIN}tweets/add`,
          {
            method: 'POST',
            origin: true,
            credentials: 'include',
            withCredentials: true,
            body: formData,
          },
        );
        const data = await response.json();
        if (data.status) setTweets((prev) => [data.data, ...prev]);
      } catch (error) {
        toast(error.message);
      }
    };

    postData();
  };

  const handleImageChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
    const fileType = fileList[0].type.split('/');
    if (fileList.length > 4) {
      setFiles([]);
      setFilesURLs([]);
    } else if (fileList.length > 1 && fileType[0] === 'video') {
      setFiles([fileList[0]]);
      setFilesURLs([URL.createObjectURL(fileList[0])]);
    } else {
      setFilesURLs(fileList.map((file) => URL.createObjectURL(file)));
    }
    if (fileList.length !== 0) {
      setPostDisabled(false);
    }
  };

  useEffect(() => {
    const checks = text.split('');
    setPostDisabled(true);
    setIsWhitespace(true);
    for (let i = 0; i < checks.length; i += 1) {
      if (!(checks[i] === ' ' || checks[i] === '\n')) {
        setPostDisabled(false);
        setIsWhitespace(false);
        break;
      }
    }
    if (files.length !== 0) {
      setPostDisabled(false);
    }

    setHashtags(text.match(/#\w+/g));
    if (hashtags !== null && hashtags.length !== 0)
      setHashtagsString(hashtags.join(','));
  }, [files, text]);
  return (
    <div className="flex items-center justify-center border-y-[0.5px] border-y-border-gray">
      <div className="tweet mt-[0.5px] flex w-[88%] flex-row   bg-white px-[16px] pt-[12px] dark:bg-pure-black dark:text-white dark:hover:bg-pure-black md:w-[598px]">
        <div className="leftColumn mr-[12px] h-[40px] w-[40px] ">
          <div className="profileImage leftColumn mr-[12px] h-[40px] w-[40px] ">
            <Link to={`/app/${user.username}`}>
              <img
                src={
                  user.profileImageURL || import.meta.env.VITE_DEFAULT_AVATAR
                }
                alt="profileImage"
                className=" h-[40px] w-[40px] rounded-full object-cover"
              />
            </Link>
          </div>
        </div>

        <div className="rightColumn h-auto w-full">
          <div className="peer w-[500px] placeholder:text-light-thin">
            <TextField
              text={text}
              setText={setText}
            />
          </div>
          {/* <Media images={filesURLs} /> */}
          <MediaRemove
            filesURLs={filesURLs}
            setFilesURLs={setFilesURLs}
            files={files}
            setFiles={setFiles}
          />
          <div className="mt-2 flex w-full items-center justify-between border-t-border-gray peer-focus-within:border-t-[0.5px]">
            <div className="media my-4 flex w-[18%] flex-row justify-between">
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
                accept="image/*, video/*"
                id="mediaUpload"
                className="hidden"
                onChange={handleImageChange}
                multiple
              />
              <AddEmoji
                text={text}
                setText={setText}
              />
            </div>

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
    </div>
  );
}

export default AddPost;
