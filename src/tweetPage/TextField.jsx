import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import Editor from '@draft-js-plugins/editor';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import '@draft-js-plugins/hashtag/lib/plugin.css';
import { EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const hashtagPlugin = createHashtagPlugin();
const plugins = [hashtagPlugin];

/**
 * @Component for rendering a text field.
 * @example
 * ```jsx
 *   <TextField
              text={text}
              setText={setText}
            />
 * `
 * @returns {JSX.Element} - The rendered component.
 */
function TextField({ text, setText }) {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(text)),
  );
  const editorRef = useRef(null);

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
    if (newEditorState.getCurrentContent().getPlainText().length < 60) {
      setText(newEditorState.getCurrentContent().getPlainText());
    }
  };

  useEffect(() => {
    const currentText = editorState.getCurrentContent().getPlainText();
    if (text !== currentText) {
      setEditorState(
        EditorState.createWithContent(ContentState.createFromText(text)),
      );
    }
  }, [text, editorState]);

  const focus = () => {
    editorRef.current.focus();
  };

  return (
    <div
      data-testid="textField"
      className="w-full max-w-full"
    >
      <Editor
        placeholder="What is happening?!"
        onClick={focus}
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        ref={editorRef}
      />
    </div>
  );
}
/**
 * @Component
 * @param {Object} props - The component props.
 * @param {string} props.text - The current text value.
 * @param {function} props.setText - The function to update the text value.
 */

TextField.propTypes = {
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
export default TextField;
