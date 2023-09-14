import { DOCUMENT_EDITOR_ID, RESPONSE_EDITOR_ID } from "@pathfinder/shared";

import { getMonacoEditor } from "../../../../monaco-editor-store";

export const setEditorValues = ({
  newDocumentEditorValue,
  newResponseEditorValue,
}: {
  newDocumentEditorValue: string;
  newResponseEditorValue: string;
}): void => {
  const documentEditor = getMonacoEditor({ editorId: DOCUMENT_EDITOR_ID });
  const responseEditor = getMonacoEditor({ editorId: RESPONSE_EDITOR_ID });

  documentEditor?.setValue(newDocumentEditorValue);
  responseEditor?.setValue(newResponseEditorValue);
};
