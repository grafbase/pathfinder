import { KeyCode, KeyMod } from "monaco-editor/esm/vs/editor/editor.api";
// import { KeyCode, KeyMod } from "monaco-graphql/esm/monaco-editor";

import { executeOperation } from "../../schema-store";

import type { MonacoEditorIActionDescriptor } from "../monaco-editor-store.types";

export const runExecuteOperation: MonacoEditorIActionDescriptor = {
  id: "run-execute-operation",
  label: "Execute Operation",
  keybindings: [KeyMod.CtrlCmd | KeyCode.Enter],
  run: executeOperation,
};
