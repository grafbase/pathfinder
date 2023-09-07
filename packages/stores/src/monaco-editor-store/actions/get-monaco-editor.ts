import { monacoEditorStore } from "../monaco-editor-store";
import { MonacoEditorStoreActions } from "../monaco-editor-store.types";

export const getMonacoEditor: MonacoEditorStoreActions["getMonacoEditor"] = ({
  editorId,
}) => {
  const editor = monacoEditorStore.getState().editors[editorId];
  return editor;
};
