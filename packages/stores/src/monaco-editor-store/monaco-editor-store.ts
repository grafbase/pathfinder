import { createStore } from 'zustand';

import type { MonacoEditorStoreState } from './monaco-editor-store.types';

import { monacoEditorStoreState } from './state';

export const monacoEditorStore = createStore<MonacoEditorStoreState>()(() => ({
  ...monacoEditorStoreState,
}));
