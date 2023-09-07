import { monacoEditorStore } from "../monaco-editor-store";
import { MonacoEditorStoreActions } from "../monaco-editor-store.types";

export const setMonacoEditorTheme: MonacoEditorStoreActions["setMonacoEditorTheme"] =
  async ({ theme }) => {
    // async import for monaco-editor to avoid issues with navigator access in nextjs
    // const { editor } = await import("monaco-graphql/esm/monaco-editor");
    const { editor } = await import("monaco-editor/esm/vs/editor/editor.api");
    const isInitialized = monacoEditorStore.getState().isInitialized;

    if (!isInitialized) {
      // bail if we haven't initialized monaco editor
      // we'll get here when the app loads due to calling setTheme in initializeTheme, and setTheme calls this function
      return;
    }

    editor.setTheme(`pathfinder-editor-${theme}`);
  };
