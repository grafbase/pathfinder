import type monaco from "monaco-editor/esm/vs/editor/editor.api";

export type MonacoIPosition = monaco.IPosition;
export type MonacoIRange = monaco.IRange;

export type MonacoEditorIStandaloneCodeEditor =
  monaco.editor.IStandaloneCodeEditor;

type MonacoEditorIStandaloneEditorConstructionOptions =
  monaco.editor.IStandaloneEditorConstructionOptions;

export type MonacoEditorISingleEditOperation =
  monaco.editor.ISingleEditOperation;

export type MonacoEditorITextModel = monaco.editor.ITextModel;

export type MonacoEditorIActionDescriptor = monaco.editor.IActionDescriptor;

import type { AvailableThemes } from "@pathfinder/shared";

import {
  DOCUMENT_EDITOR_ID,
  RESPONSE_EDITOR_ID,
  VARIABLES_EDITOR_ID,
} from "@pathfinder/shared";

export type AvailableEditors =
  | typeof DOCUMENT_EDITOR_ID
  | typeof RESPONSE_EDITOR_ID
  | typeof VARIABLES_EDITOR_ID;

export type MonacoEditorStoreState = {
  /**
   * We maintain our own collection of unmanaged editors outside of the Monaco global instance
   */
  unmanagedEditors: Record<string, MonacoEditorIStandaloneCodeEditor | null>;
  /**
   * We maintain our own collection of managed editors outside of the Monaco global instance
   */
  managedEditors: {
    [DOCUMENT_EDITOR_ID]: MonacoEditorIStandaloneCodeEditor | null;
    [RESPONSE_EDITOR_ID]: MonacoEditorIStandaloneCodeEditor | null;
    [VARIABLES_EDITOR_ID]: MonacoEditorIStandaloneCodeEditor | null;
  };

  /**
   * A boolean indicating whether or not we have initialized monaco editor features
   */
  isInitialized: boolean;
};

export type CreateEditorParams = {
  /**
   * An optional default value for this editor
   */
  defaultValue?: string;
  /**
   * A unique ID denoting the placement of this editor
   */
  editorId: AvailableEditors | string;
  /**
   * Must be unique. Use the utility function `generateModelName` to generate this parameter
   */
  initialModelName: string;
  /**
   * Pass-through for all possible Monaco Editor options
   */
  monacoOptionOverrides?: MonacoEditorIStandaloneEditorConstructionOptions;
  ref: HTMLDivElement;
};

export type EditorEdit = {
  /**
   * A valid range or an explicit call for the model's full range.
   * Source docs indicate that this can be "empty", but the source _type_ doesn't allow it.
   * @see {@link https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ISingleEditOperation.html#range}
   */
  range: MonacoIRange | "END" | "REPLACE";
  text: string | null;
};

export type MonacoEditorStoreActions = {
  createMonacoEditor: ({
    defaultValue,
    editorId,
    initialModelName,
    monacoOptionOverrides,
    ref,
  }: CreateEditorParams) => Promise<MonacoEditorIStandaloneCodeEditor | null>;

  /**
   * Dispose of the editor via monaco's built-in method and filter from our editors array
   */
  disposeMonacoEditor: ({
    editorId,
  }: {
    editorId: AvailableEditors | string;
  }) => void;
  /**
   * Returns an active editor instance
   */
  getMonacoEditor: ({
    editorId,
  }: {
    editorId: AvailableEditors | string;
  }) => MonacoEditorIStandaloneCodeEditor | null;
  /**
   * Initialize monaco-editor features:
   *
   * - defineTheme
   */
  initializeMonacoEditor: () => void;
  pushMonacoEditorEdit: ({
    edits,
    position,
    targetEditorId,
  }: {
    edits: Array<EditorEdit>;
    position: MonacoIPosition;
    targetEditorId: AvailableEditors;
  }) => void;
  /**
   * To be used throughout the UI whenever we toggle the app theme
   */
  setMonacoEditorTheme: ({ theme }: { theme: AvailableThemes }) => void;
};
