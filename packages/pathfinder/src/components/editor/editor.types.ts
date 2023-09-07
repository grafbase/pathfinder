import type { AvailableEditors } from "@graphql-pathfinder/stores";

// import type monaco from "monaco-graphql/esm/monaco-editor";
import type monaco from "monaco-editor/esm/vs/editor/editor.api";

type MonacoEditorIActionDescriptor = monaco.editor.IActionDescriptor;
type MonacoEditorIStandaloneEditorConstructionOptions =
  monaco.editor.IStandaloneEditorConstructionOptions;
type MonacoEditorIPosition = monaco.IPosition;

export type EditorProps = {
  /**
   * Actions to add to this editor
   */
  actions?: Array<MonacoEditorIActionDescriptor>;
  /**
   * An optional default value for this editor
   */
  defaultValue?: string;
  /**
   * A unique ID denoting the placement of this editor
   */
  editorId: AvailableEditors;
  /**
   * the initial cursor position for this editor
   */
  initialCursorPosition?: MonacoEditorIPosition;
  modelDetails: {
    fileName: string;
    language: "json" | "graphql";
  };
  /**
   * Pass-through for all possible Monaco Editor options
   */
  monacoOptionOverrides?: MonacoEditorIStandaloneEditorConstructionOptions;
  /**
   * An optional function to run for this editors onDidChangeCursorPosition callback
   */
  onDidChangeCursorPositionCallback?: ({
    editorValue,
    position,
  }: {
    editorValue: string;
    position: MonacoEditorIPosition;
  }) => void;
};
