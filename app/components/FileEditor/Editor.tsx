"use client"
import React from 'react';

import { Editor as ReactEditor } from '@monaco-editor/react';

export default function Editor() {
  // function handleEditorChange(value, event) {
  //   // here is the current value
  // }

  // function handleEditorDidMount(editor, monaco) {
  //   console.log('onMount: the editor instance:', editor);
  //   console.log('onMount: the monaco instance:', monaco);
  // }

  // function handleEditorWillMount(monaco) {
  //   console.log('beforeMount: the monaco instance:', monaco);
  // }

  // function handleEditorValidation(markers) {
  //   // model markers
  //   // markers.forEach(marker => console.log('onValidate:', marker.message));
  // }

  return (
    <ReactEditor
      height="40vh"
      width="30vw"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      // onChange={handleEditorChange}
      // onMount={handleEditorDidMount}
      // beforeMount={handleEditorWillMount}
      // onValidate={handleEditorValidation}
    />
  );
}