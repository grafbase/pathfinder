import { DOCUMENT_EDITOR_ID, RESPONSE_EDITOR_ID } from "@pathfinder-ide/shared";

import { getMonacoEditor } from "../../../../monaco-editor-store";

export const setEditorValues = ({
  newDocumentEditorValue,
  newResponseEditorValue,
}: {
  newDocumentEditorValue?: string;
  newResponseEditorValue?: string;
}): void => {
  if (newDocumentEditorValue) {
    const documentEditor = getMonacoEditor({ editorId: DOCUMENT_EDITOR_ID });
    documentEditor?.setValue(newDocumentEditorValue);
  }

  if (newResponseEditorValue) {
    const responseEditor = getMonacoEditor({ editorId: RESPONSE_EDITOR_ID });
    responseEditor?.setValue(newResponseEditorValue);
  }
};
