import { Editor } from './editor';

import {
  VARIABLES_EDITOR_DEFAULT_VALUE,
  VARIABLES_EDITOR_ID,
} from '@pathfinder-ide/shared';

export const JSONEditorWithDefaultValue = () => {
  return (
    <Editor
      defaultValue={VARIABLES_EDITOR_DEFAULT_VALUE}
      editorId={VARIABLES_EDITOR_ID}
      modelDetails={{
        fileName: 'basic-json-example',
        language: 'json',
      }}
    />
  );
};
