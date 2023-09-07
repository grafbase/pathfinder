import { createStore } from "zustand/vanilla";

import type { MonacoEditorStoreState } from "./monaco-editor-store.types";

import { monacoEditorStoreState } from "./state";

export const monacoEditorStore = createStore<MonacoEditorStoreState>()(() => ({
  ...monacoEditorStoreState,
}));
