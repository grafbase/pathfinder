import {
  DOCUMENT_EDITOR_ID,
  RESPONSE_EDITOR_ID,
  VARIABLES_EDITOR_ID,
} from '@pathfinder-ide/shared';

import { getMonacoEditor } from './get-monaco-editor';

import { monacoEditorStore } from '../monaco-editor-store';

import type { MonacoEditorStoreActions } from '../monaco-editor-store.types';

export const disposeMonacoEditor: MonacoEditorStoreActions['disposeMonacoEditor'] = ({
  editorId,
}) => {
  // do we have an editor with this id in our array?
  const editorToDispose = getMonacoEditor({ editorId });

  // if so, we call dispose() to remove it from monaco's global instance
  if (editorToDispose) {
    editorToDispose.dispose();

    if (
      editorId === DOCUMENT_EDITOR_ID ||
      editorId === RESPONSE_EDITOR_ID ||
      editorId === VARIABLES_EDITOR_ID
    ) {
      // set this editor to null
      monacoEditorStore.setState({
        managedEditors: {
          ...monacoEditorStore.getState().managedEditors,
          [editorId]: null,
        },
      });
    } else {
      // set this editor to null
      monacoEditorStore.setState({
        unmanagedEditors: {
          ...monacoEditorStore.getState().unmanagedEditors,
          [editorId]: null,
        },
      });
    }
  }
};
