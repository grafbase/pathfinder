import { themeStore } from "../../theme-store";
import { editorTheme } from "../helpers/editor-theme";
import { monacoEditorStore } from "../monaco-editor-store";
import { MonacoEditorStoreActions } from "../monaco-editor-store.types";
import { setMonacoEditorTheme } from "./set-monaco-editor-theme";

export const initializeMonacoEditor: MonacoEditorStoreActions["initializeMonacoEditor"] =
  async () => {
    // async import for monaco-editor to avoid issues with navigator access in nextjs
    const { editor } = await import("monaco-editor/esm/vs/editor/editor.api");
    // const { editor } = await import("monaco-graphql/esm/monaco-editor");

    const activeTheme = themeStore.getState().activeTheme;

    // define the themes that we're making available to monaco editor
    editor.defineTheme(
      "pathfinder-editor-dark",
      editorTheme({ variant: "dark" }),
    );
    editor.defineTheme(
      "pathfinder-editor-light",
      editorTheme({ variant: "light" }),
    );

    if (activeTheme) {
      setMonacoEditorTheme({ theme: activeTheme });
    }

    monacoEditorStore.setState({
      isInitialized: true,
    });
  };
