import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid4 } from 'uuid';

function Media({ images }) {
  // console.log(images);
  const [isVideo, setIsVideo] = useState(false);
  useEffect(() => {
    if (images[0]) {
      if (
        images[0].endsWith('.jpg') ||
        images[0].endsWith('.jpeg') ||
        images[0].endsWith('.png') ||
        images[0].endsWith('.gif')
      ) {
        setIsVideo(false);
      } else setIsVideo(true);
    }
  }, [images]);
  if (images.length % 2 === 0) {
    return (
      <div
        className={`media4 grid max-h-[512px] max-w-[512px] grid-cols-2
        grid-rows-${images.length / 2} gap-[2px] overflow-hidden rounded-xl`}
      >
        {images.map((image) => (
          <img
            key={uuid4()}
            src={image}
            alt="media"
            className="h-full w-full object-cover"
          />
        ))}
      </div>
    );
  }
  const images3 = images.slice(1);
  return (
    <div
      className={`media4 grid max-h-[512px] max-w-[512px]
       grid-cols-${images.length / 2 + 0.5} grid-rows-1 gap-[${
         images.length - 1
       }px]  overflow-hidden rounded-xl `}
    >
      {isVideo && (
        <video
          controls
          className="h-full w-full rounded-2xl object-cover p-1"
          width="100px"
          muted
          autoPlay
          src={images[0]}
          poster={images[0]}
          type="video/*"
        />
      )}
      {!isVideo && (
        <img
          src={images[0]}
          alt="media"
          className={`h-full  object-cover ${
            images.length === 1 ? 'rounded-xl' : ''
          }`}
        />
      )}
      <div className={`grid grid-rows-2  gap-[${images.length - 1}px]`}>
        {images3.map((image) => (
          <img
            key={uuid4()}
            src={image}
            alt="media"
            className="h-full w-full object-cover"
          />
        ))}
      </div>
    </div>
  );
}
Media.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  images: PropTypes.array,
};

Media.defaultProps = {
  images: [],
};
export default Media;
