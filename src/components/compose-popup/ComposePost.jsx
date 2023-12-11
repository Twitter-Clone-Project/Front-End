import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ComposeLayout from './ComposeLayout';
import TextField from '../../tweetPage/TextField';
import { useAuth } from '../../hooks/AuthContext';
import 'draft-js/dist/Draft.css';
import Button from '../form-controls/Button';
import AddEmoji from '../../tweetPage/AddEmoji';
import MediaRemove from '../../tweetPage/MediaRemove';
import toast from 'react-hot-toast';
import OwnToaster from '../OwnToaster';
import PopupCardHeader from '../user-profile-card/PopupCardHeader';

function ComposePost() {
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);
  const [filesURLs, setFilesURLs] = useState([]);
  const [postDisabled, setPostDisabled] = useState(true);
  const [hashtags, setHashtags] = useState([]);
  const [hashtagsString, setHashtagsString] = useState('');
  const [isWhitespace, setIsWhitespace] = useState(true);
  const [addFileDisabled, setAddFileDisabled] = useState(false);
  const [acceptVideo, setAcceptVideo] = useState(true);
  const { user } = useAuth();

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
    <ComposeLayout>
      <OwnToaster />
      <div className="mt-5 flex h-full flex-1 flex-col justify-between px-4 py-2">
        <div className="flex h-full w-full ">
          <div className="profileImage leftColumn mr-[12px] h-[40px] w-[40px] pt-1">
            <Link to={`/app/${user.username}`}>
              <img
                src={user.imageUrl || import.meta.env.VITE_DEFAULT_AVATAR}
                alt="profileImage"
                className=" h-[40px] w-[40px] rounded-full object-cover"
              />
            </Link>
          </div>
          <div className="mb-12 max-w-[90%] flex-1">
            <TextField
              text={text}
              setText={setText}
            />
            <MediaRemove
              filesURLs={filesURLs}
              setFilesURLs={setFilesURLs}
              files={files}
              setFiles={setFiles}
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 flex h-[53px] w-full min-w-[300px] items-center rounded">
          <PopupCardHeader footer>
            <div className="flex w-full items-center justify-between border-t-[1px] border-t-light-gray py-2 dark:border-t-border-gray">
              <div className="media flex w-[18%] flex-row gap-5 px-3">
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
                      className=" fill-blue"
                    />
                  </svg>
                </label>
                <input
                  type="file"
                  disabled={addFileDisabled}
                  accept={`image/*, ${acceptVideo ? 'video/*' : ''}`}
                  id="mediaUpload"
                  onChange={handleImageChange}
                  className="hidden"
                  multiple
                />
                <AddEmoji
                  text={text}
                  setText={setText}
                />
              </div>
              <Button
                label="Post"
                disabled={postDisabled}
                backGroundColor="blue"
                backGroundColorDark="blue"
                labelColor="white"
                labelColorDark="white"
                borderColor="none"
                width="w-16"
              />
            </div>
          </PopupCardHeader>
        </div>
      </div>
    </ComposeLayout>
  );
}

export default ComposePost;
