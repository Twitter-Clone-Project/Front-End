/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid4 } from 'uuid';
import { Skeleton } from '@mui/material';

/**
 * Component for displaying media.
 * @Component
 * @returns {JSX.Element} - The rendered component.
 * @example
 * ```jsx
 *    <Media images={images} />
 * ```
 */
function Media({ images }) {
  const [isLoading, setIsLoading] = useState(true);
  if (images) {
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
          data-testid="24images"
          className={`media4 my-2 grid max-h-[512px] max-w-[512px] grid-cols-2
        grid-rows-${images.length / 2} gap-[2px] overflow-hidden rounded-xl`}
        >
          {images.map((image) => (
            <div key={uuid4()}>
              {isLoading && (
                <Skeleton
                  sx={{ bgcolor: 'grey.900' }}
                  animation="wave"
                  variant="rectangular"
                  width={500}
                  height={500}
                />
              )}
              <img
                src={image}
                onLoad={() => setIsLoading(false)}
                alt="media"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      );
    }
    const images3 = images.slice(1);
    return (
      <div
        data-testid="13images"
        className={`media4 my-2 grid max-h-[512px] max-w-[512px]
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
          <>
            {isLoading && (
              <Skeleton
                sx={{ bgcolor: 'grey.900' }}
                animation="wave"
                variant="rectangular"
                width={500}
                height={500}
              />
            )}

            <img
              src={images[0]}
              onLoad={() => setIsLoading(false)}
              alt="media"
              className={`aspect-square h-full  object-cover ${
                images.length === 1 ? 'rounded-xl' : ''
              }`}
            />
          </>
        )}
        <div className={`grid grid-rows-2  gap-[${images.length - 1}px]`}>
          {images3.map((image) => (
            <img
              key={image}
              src={image}
              alt="media"
              className="h-full w-full object-cover"
            />
          ))}
        </div>
      </div>
    );
  }
  return <div />;
}
/**
 * @Component
 * @param {Object} props - The component props.
 * @param {Array} props.images - The array of images.
 */
Media.propTypes = {
  /**
   * The array of images.
   */
  images: PropTypes.array,
};

Media.defaultProps = {
  images: [],
};
export default Media;
