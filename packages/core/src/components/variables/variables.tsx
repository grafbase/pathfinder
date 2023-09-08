import {
  VARIABLES_EDITOR_DEFAULT_VALUE,
  VARIABLES_EDITOR_ID,
  VARIABLES_MODEL_NAME,
} from "@pathfinder/shared";

import { graphQLDocumentStore, runExecuteOperation } from "@pathfinder/stores";

import { Editor } from "../editor";

import { variablesClass, variablesEditorWrapClass } from "./variables.css";

export const Variables = () => {
  const variablesString = graphQLDocumentStore.getState().variablesString;
  return (
    <div className={variablesClass}>
      <div className={variablesEditorWrapClass}>
        <Editor
          actions={[runExecuteOperation]}
          defaultValue={
            variablesString.length > 0
              ? variablesString
              : VARIABLES_EDITOR_DEFAULT_VALUE
          }
          editorId={VARIABLES_EDITOR_ID}
          modelDetails={{
            fileName: VARIABLES_MODEL_NAME,
            language: "json",
          }}
          onDidChangeCursorPositionCallback={({ editorValue }) => {
            graphQLDocumentStore.setState({
              variablesString: editorValue,
            });
          }}
        />
      </div>
    </div>
  );
};
