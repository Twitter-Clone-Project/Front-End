/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import Editor from '@draft-js-plugins/editor';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import '@draft-js-plugins/hashtag/lib/plugin.css';
import { EditorState, ContentState } from 'draft-js';
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
        className="h-auto min-h-[70px] w-full resize-none  py-1 text-[20px] outline-none placeholder:font-thin placeholder:text-light-thin"
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
