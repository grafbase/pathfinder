import { monacoEditorStore } from '../monaco-editor-store';
import { MonacoEditorStoreActions } from '../monaco-editor-store.types';

export const setMonacoEditorTheme: MonacoEditorStoreActions['setMonacoEditorTheme'] =
  async ({ theme }) => {
    const { editor } = await import('monaco-graphql/esm/monaco-editor');
    const isInitialized = monacoEditorStore.getState().isInitialized;

    if (!isInitialized) {
      // bail if we haven't initialized monaco editor
      // we'll get here when the app loads due to calling setTheme in initializeTheme, and setTheme calls this function
      return;
    }

    editor.setTheme(`pathfinder-editor-${theme}`);

    return monacoEditorStore.setState({ isReady: true });
  };
