/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import Editor from '@draft-js-plugins/editor';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import '@draft-js-plugins/hashtag/lib/plugin.css';
import { EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const hashtagPlugin = createHashtagPlugin();
const plugins = [hashtagPlugin];

function TextField({ text, setText }) {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(text)),
  );
  const editorRef = useRef(null);

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
    setText(newEditorState.getCurrentContent().getPlainText());
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
    <div className="">
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

export default TextField;
