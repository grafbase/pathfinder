import { themeStore } from '../../theme-store';
import { editorTheme } from '../helpers/editor-theme';
import { monacoEditorStore } from '../monaco-editor-store';
import { MonacoEditorStoreActions } from '../monaco-editor-store.types';
import { importMonaco } from './monaco-import';
import { setMonacoEditorTheme } from './set-monaco-editor-theme';

export const initializeMonacoEditor: MonacoEditorStoreActions['initializeMonacoEditor'] =
  async () => {
    const { editor } = await importMonaco();

    const activeTheme = themeStore.getState().activeTheme;

    // define the themes that we're making available to monaco editor
    editor.defineTheme('pathfinder-editor-dark', editorTheme({ variant: 'dark' }));
    editor.defineTheme('pathfinder-editor-light', editorTheme({ variant: 'light' }));

    if (activeTheme) {
      setMonacoEditorTheme({ theme: activeTheme });
    }

    monacoEditorStore.setState({
      isInitialized: true,
    });
  };
