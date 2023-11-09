import React from 'react';
import PropTypes from 'prop-types';

function Media({ images }) {
  if (images.length % 2 === 0) {
    return (
      <div
        className={`media4 grid max-h-[512px] max-w-[512px] grid-cols-2
         grid-rows-${images.length / 2} gap-[2px] overflow-hidden rounded-xl`}
      >
        {images.map((image) => (
          <img
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
      <img
        src={images[0]}
        alt="media"
        className={`h-full  object-cover ${
          images.length === 1 ? 'rounded-xl' : ''
        }`}
      />
      <div className={`grid grid-rows-2  gap-[${images.length - 1}px]`}>
        {images3.map((image) => (
          <img
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
  images: PropTypes.array.isRequired,
};
export default Media;
