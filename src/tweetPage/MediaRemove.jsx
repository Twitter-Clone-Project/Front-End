/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';

/**
 * Component for removing media during adding post.
*  @Component
 * @example
 * ```jsx
 *  <MediaRemove
            filesURLs={filesURLs}
            setFilesURLs={setFilesURLs}
            files={files}
            setFiles={setFiles}
          />
 * `
 * @returns {JSX.Element} - The rendered component.
 */
function MediaRemove({ filesURLs, setFilesURLs, files, setFiles }) {
  const [isVideo, setIsVideo] = useState(false);
  useEffect(() => {
    if (files[0]) {
      const fileType = files[0].type.split('/');
      if (fileType[0] === 'video') {
        setIsVideo(true);
      } else setIsVideo(false);
    }
  }, [files[0]]);

  const handleImageRemove = (i) => {
    const newFiles = [...files];
    newFiles.splice(i, 1);
    setFiles(newFiles);
    const newFilesURLs = [...filesURLs];
    newFilesURLs.splice(i, 1);
    setFilesURLs(newFilesURLs);
  };
  if (filesURLs.length % 2 === 0) {
    return (
      <div
        data-testid="media"
        className={`media4 grid max-h-[512px] max-w-[512px] grid-cols-2
            grid-rows-${
              filesURLs.length / 2
            } gap-[2px] overflow-hidden rounded-xl`}
      >
        {filesURLs.map((image, i) => (
          <div
            key={uuid4()}
            className="popup-content relative flex h-full w-full flex-col items-center  bg-white dark:bg-pure-black dark:text-white"
          >
            <img
              src={image}
              alt="media"
              className="h-full w-full rounded-2xl object-cover p-1"
            />
            <button
              type="submit"
              data-testid={`remove2${i}`}
              onClick={() => handleImageRemove(i)}
              className="absolute right-3 top-3 h-[20px] w-[20px]  rounded-3xl bg-black text-sm"
            >
              <svg
                viewBox="0 0 48 48"
                fill="white"
              >
                <path
                  className="fill-gray"
                  d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"
                />
                <path
                  d="M0 0h48v48H0z"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    );
  }
  const images3 = filesURLs.slice(1);
  return (
    <div
      data-testid="media"
      className={`media grid max-h-[512px] max-w-[512px]
           grid-cols-${filesURLs.length / 2 + 0.5} grid-rows-1 gap-[${
             filesURLs.length - 1
           }px]  overflow-hidden rounded-xl `}
    >
      <div
        key={uuid4()}
        className="popup-content relative flex h-full w-full flex-col items-center  bg-white dark:bg-pure-black dark:text-white"
      >
        {isVideo && (
          <video
            controls
            className="h-full w-full rounded-2xl object-cover p-1"
            width="100px"
            muted
            autoPlay
            src={filesURLs[0]}
            poster={filesURLs[0]}
            type="video/*"
          />
        )}
        {!isVideo && (
          <img
            src={filesURLs[0]}
            alt="media"
            className="h-full w-full rounded-2xl object-cover p-1"
          />
        )}
        <button
          type="submit"
          data-testid="remove"
          onClick={() => handleImageRemove(0)}
          className="absolute right-3 top-3 h-[20px] w-[20px]  rounded-3xl bg-black text-sm"
        >
          <svg
            viewBox="0 0 48 48"
            fill="white"
          >
            <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
            <path
              d="M0 0h48v48H0z"
              fill="none"
            />
          </svg>
        </button>
      </div>
      <div className={`grid grid-rows-2  gap-[${filesURLs.length - 1}px]`}>
        {images3.map((image, i) => (
          <div
            key={uuid4()}
            className="popup-content relative flex h-full w-full flex-col items-center  bg-white dark:bg-pure-black dark:text-white"
          >
            <img
              src={image}
              alt="media"
              className="h-full w-full rounded-2xl object-cover p-1"
            />
            <button
              type="submit"
              data-testid={`remove3${i}`}
              onClick={() => handleImageRemove(i + 1)}
              className="absolute right-3 top-3 h-[20px] w-[20px]  rounded-3xl bg-black text-sm"
            >
              <svg
                viewBox="0 0 48 48"
                fill="white"
              >
                <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
                <path
                  d="M0 0h48v48H0z"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * @Component
 * @param {Object} props - The component props.
 * @param {Array} props.filesURLs - The array of files URLs.
 * @param {function} props.setFilesURLs - The function to update the files URLs.
 * @param {Array} props.files - The array of files.
 * @param {function} props.setFiles - The function to update the files.
 */
MediaRemove.propTypes = {
  /**
   * The array of files URLs.
   */
  filesURLs: PropTypes.array,
  /**
   * The function to update the files URLs.
   * @param {Array} updatedFilesURLs - The updated array of files URLs.
   */
  setFilesURLs: PropTypes.func,
  /**
   * The array of files.
   */
  files: PropTypes.array,
  /**
   * The function to update the files.
   * @param {Array} updatedFiles - The updated array of files.
   */
  setFiles: PropTypes.func,
};

MediaRemove.defaultProps = {
  filesURLs: [],
  files: [],
  setFilesURLs: () => {},
  setFiles: () => {},
};

const MediaMemorized = React.memo(MediaRemove);
export default MediaMemorized;
