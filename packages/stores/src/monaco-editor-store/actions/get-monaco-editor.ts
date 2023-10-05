import {
  DOCUMENT_EDITOR_ID,
  RESPONSE_EDITOR_ID,
  VARIABLES_EDITOR_ID,
} from "@pathfinder-ide/shared";

import { monacoEditorStore } from "../monaco-editor-store";

import {
  MonacoEditorIStandaloneCodeEditor,
  MonacoEditorStoreActions,
} from "../monaco-editor-store.types";

export const getMonacoEditor: MonacoEditorStoreActions["getMonacoEditor"] = ({
  editorId,
}) => {
  let editor: MonacoEditorIStandaloneCodeEditor | null = null;

  if (
    editorId === DOCUMENT_EDITOR_ID ||
    editorId === RESPONSE_EDITOR_ID ||
    editorId === VARIABLES_EDITOR_ID
  ) {
    editor = monacoEditorStore.getState().managedEditors[editorId];
  } else {
    editor = monacoEditorStore.getState().unmanagedEditors[editorId];
  }
  return editor;
};
