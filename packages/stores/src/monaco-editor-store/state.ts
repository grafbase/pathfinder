import {
  DOCUMENT_EDITOR_ID,
  RESPONSE_EDITOR_ID,
  VARIABLES_EDITOR_ID,
} from '@pathfinder-ide/shared';

import type { MonacoEditorStoreState } from './monaco-editor-store.types';

const INITIAL_MONACO_EDITOR_STORE_STATE: MonacoEditorStoreState = {
  managedEditors: {
    [DOCUMENT_EDITOR_ID]: null,
    [RESPONSE_EDITOR_ID]: null,
    [VARIABLES_EDITOR_ID]: null,
  },
  unmanagedEditors: {},
  isInitialized: false,
  isReady: false,
};

export const monacoEditorStoreState = {
  ...INITIAL_MONACO_EDITOR_STORE_STATE,
};
