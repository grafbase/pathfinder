import type monaco from "monaco-graphql/esm/monaco-editor";

type MonacoEditorStandaloneEditorConstructionOptions =
  monaco.editor.IStandaloneEditorConstructionOptions;

export const editorOptions: MonacoEditorStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  fixedOverflowWidgets: true,
  fontWeight: "400",
  fontFamily:
    // 👇 https://systemfontstack.com/
    "Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace",
  fontSize: 13, // default is 12
  lineNumbersMinChars: 2,
  minimap: {
    enabled: false, // disable the minimap
  },
  overviewRulerLanes: 0, // remove unnecessary cruft on right side of editors
  scrollbar: {
    // hide the scrollbars
    horizontal: "hidden",
    verticalScrollbarSize: 4,
  },
  scrollBeyondLastLine: false, // cleans up unnecessary "padding" on the bottom of each editor
  tabSize: 2,
  wordWrap: "on",
  wrappingStrategy: "advanced",
  // bracketPairColorization is meant to be disabled by default
  // see https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IStandaloneEditorConstructionOptions.html#bracketPairColorization
  // but there is a bug and it's actually enabled by default, so we need to disable it
  // 👇 this is how the docs describe you should control the feature, with an object style
  // bracketPairColorization: {
  //   enabled: false
  // },
  // but there's a bug and this object style doesn't work, so we use this dot notation style
  // unfortunately, there's _also_ a bug in the typings (doesn't include dot notation style), so we need to ignore it
  // see https://github.com/microsoft/monaco-editor/issues/3829
  // @ts-ignore
  "bracketPairColorization.enabled": false,
};
