import PropTypes from 'prop-types';
import React, { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import OutsideClickHandler from 'react-outside-click-handler';

/**
 * Component for adding emojis to a text.
 * @component
 * @returns {JSX.Element} The rendered component.
 * @example
 * ```jsx
  <AddEmoji text={text}
                setText={setText}
              />
 * ```
 */
function AddEmoji({ text, setText }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiSelect = (emoji) => {
    setText(text + emoji.native);
  };
  const handelEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShowEmojiPicker(false);
      }}
    >
      <button
        className="relative flex flex-col justify-start"
        type="button"
      >
        <div
          role="button"
          tabIndex={-6}
          data-testid="emojiBtn"
          onKeyDown={handelEmojiPicker}
          onClick={handelEmojiPicker}
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
        </div>
        <div className="absolute  top-5  z-[100] flex scale-75 flex-row justify-center sm:scale-90 md:scale-100">
          {showEmojiPicker && (
            <div
              data-testid="emojiPicker"
              className="absolute left-[-140px] right-[0px] "
            >
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
              />
            </div>
          )}
        </div>
      </button>
    </OutsideClickHandler>
  );
}
/**
 * @Component
 * @param {Object} props - The component props.
 * @param {string} props.text - The current text value.
 * @param {function} props.setText - The function to update the text value.
 */
AddEmoji.propTypes = {
  /**
   * The current text value.
   */
  text: PropTypes.string.isRequired,
  /**
   * The function to update the text value.
   * @param {string} updatedText - The updated text value.
   */
  setText: PropTypes.func.isRequired,
};

export default AddEmoji;
