/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
// import Media from './Media';
import { useNavigate, Link } from 'react-router-dom';
import AddEmoji from './AddEmoji';
import TextField from './TextField';
import { useAuth } from '../hooks/AuthContext';
import MediaRemove from './MediaRemove';
import OwnToaster from '../components/OwnToaster';

function AddPost({ setTweets }) {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [filesURLs, setFilesURLs] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [hashtagsString, setHashtagsString] = useState('');
  const [text, setText] = useState('');
  const [postDisabled, setPostDisabled] = useState(true);
  const [isWhitespace, setIsWhitespace] = useState(true);
  const [addFileDisabled, setAddFileDisabled] = useState(false);
  const [acceptVideo, setAcceptVideo] = useState(true);
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
          `${import.meta.env.VITE_API_DOMAIN}tweets/add`,
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

  useEffect(() => {
    if (files.length > 4) {
      setFiles([]);
      setFilesURLs([]);
      toast('Please choose either 1 video or up to 4 photos');
    }
    if (files.length === 0) {
      setAddFileDisabled(false);
      setAcceptVideo(true);
    } else setAddFileDisabled(false);
    if (files.length === 4) {
      setAddFileDisabled(true);
    }
    if (files[0]) {
      const fileType = files[0].type.split('/');
      if (files.length === 1 && fileType[0] === 'video') {
        setAddFileDisabled(true);
      }
    }
  }, [files]);
  const handleImageChange = (e) => {
    const fileList = Array.from(e.target.files);
    if (files.length > 4) {
      setFiles([]);
      setFilesURLs([]);
      toast('Please choose either 1 video or up to 4 photos');
    } else {
      let flag = true;
      // 2,3,4 files if one video-->flag=true
      if (fileList.length <= 4 && fileList.length > 1) {
        for (let i = 0; i < fileList.length; i += 1) {
          const fileType = fileList[i].type.split('/');
          if (fileType[0] === 'video') {
            toast('Please choose either 1 video or up to 4 photos');
            flag = false;
            break;
          }
        }
      }
      // 1 video or 1,2,3,4 images
      if (flag) {
        const fileType = fileList[0].type.split('/');
        if (fileList.length === 1 && fileType[0] === 'video') {
          setAddFileDisabled(true);
          setFiles([fileList[0]]);
          setFilesURLs([URL.createObjectURL(fileList[0])]);
        } else {
          setFiles((prev) => [...prev, ...fileList]);
          const urls = fileList.map((file) => URL.createObjectURL(file));
          setFilesURLs((prev) => [...prev, ...urls]);
          setAcceptVideo(false);
        }
      }
    }
    if (files.length > 2) {
      setAddFileDisabled(true);
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
    <div className="flex w-full items-center border-y-[0.5px] border-y-border-gray">
      <div className="tweet mt-[0.5px] grid w-full grid-cols-[auto_1fr] bg-white px-[16px] pt-[12px] dark:bg-pure-black dark:text-white dark:hover:bg-pure-black md:w-[598px]">
        <div className="leftColumn mr-[12px] h-[40px] w-[40px] ">
          <div className="profileImage leftColumn mr-[12px] h-[40px] w-[40px] ">
            <Link to={`/app/${user.username}`}>
              <img
                src={user.imageUrl || import.meta.env.VITE_DEFAULT_AVATAR}
                alt="profileImage"
                className=" h-[40px] w-[40px] rounded-full object-cover"
              />
            </Link>
          </div>
        </div>

        <div className="rightColumn h-auto">
          <div className="peer max-w-full placeholder:text-light-thin">
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
            <div className="media my-4 flex w-[18%] flex-row justify-between ">
              <label
                htmlFor="mediaUpload"
                className=" cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`h-[18.75px] w-[18.75px]  ${
                    addFileDisabled ? 'opacity-50' : ''
                  }`}
                >
                  <path
                    d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"
                    className=" fill-blue "
                  />
                </svg>
              </label>
              <input
                className="hidden"
                disabled={addFileDisabled}
                type="file"
                accept={`image/*, ${acceptVideo ? 'video/*' : ''}`}
                id="mediaUpload"
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
      <OwnToaster />
    </div>
  );
}

export default AddPost;
