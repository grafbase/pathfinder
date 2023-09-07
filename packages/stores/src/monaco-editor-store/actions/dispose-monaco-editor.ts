import { monacoEditorStore } from "../monaco-editor-store";

import type { MonacoEditorStoreActions } from "../monaco-editor-store.types";
import { getMonacoEditor } from "./get-monaco-editor";

export const disposeMonacoEditor: MonacoEditorStoreActions["disposeMonacoEditor"] =
  ({ editorId }) => {
    // do we have an editor with this id in our array?
    const editorToDispose = getMonacoEditor({ editorId });

    // if so, we call dispose() to remove it from monaco's global instance
    if (editorToDispose) {
      editorToDispose.dispose();

      // set this editor to null
      monacoEditorStore.setState({
        editors: {
          ...monacoEditorStore.getState().editors,
          [editorId]: null,
        },
      });
    }
  };
