import {
  VARIABLES_EDITOR_DEFAULT_VALUE,
  VARIABLES_EDITOR_ID,
  VARIABLES_MODEL_NAME,
} from '@pathfinder-ide/shared';

import { runExecuteOperation, useSessionStore } from '@pathfinder-ide/stores';

import { Editor } from '../editor';

import { variablesWrapClass, variablesEditorWrapClass } from './variables.css';

export const Variables = () => {
  const variablesString = useSessionStore.getState().variablesString;

  return (
    <div className={variablesWrapClass}>
      <div className={variablesEditorWrapClass}>
        <Editor
          actions={[runExecuteOperation]}
          defaultValue={
            variablesString.length > 0 ? variablesString : VARIABLES_EDITOR_DEFAULT_VALUE
          }
          editorId={VARIABLES_EDITOR_ID}
          modelDetails={{
            fileName: VARIABLES_MODEL_NAME,
            language: 'json',
          }}
          onDidChangeCursorPositionCallback={({ editorValue }) => {
            useSessionStore.setState({
              variablesString: editorValue,
            });
          }}
        />
      </div>
    </div>
  );
};
