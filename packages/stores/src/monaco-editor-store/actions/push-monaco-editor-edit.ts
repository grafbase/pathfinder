import { DOCUMENT_EDITOR_ID } from "@pathfinder/shared";

import { setDocumentState } from "../../graphql-document-store";

import { getMonacoEditor } from "./get-monaco-editor";

import type {
  MonacoEditorISingleEditOperation,
  MonacoEditorStoreActions,
  MonacoEditorITextModel,
  MonacoIRange,
} from "../monaco-editor-store.types";

export const pushMonacoEditorEdit: MonacoEditorStoreActions["pushMonacoEditorEdit"] =
  ({ edits, position, targetEditorId }) => {
    // edits via editor
    const editor = getMonacoEditor({ editorId: targetEditorId });

    if (!editor) {
      // if we don't have an editor here, we should return early
      return;
    }

    const model = editor.getModel() as MonacoEditorITextModel;

    // if we're not passed a range we'll use the full model range
    const editsWithRange: MonacoEditorISingleEditOperation[] = edits.map(
      (edit) => {
        let range: MonacoIRange = {
          endColumn: 1,
          endLineNumber: 1,
          startColumn: 1,
          startLineNumber: 1,
        };
        if (edit.range === "END") {
          const fullModelRange = model.getFullModelRange();

          range = {
            startLineNumber: fullModelRange.endLineNumber + 1,
            startColumn: 0,
            endLineNumber: fullModelRange.endLineNumber + 1,
            endColumn: 0,
          };
        } else if (edit.range === "REPLACE") {
          range = model.getFullModelRange();
        } else {
          range = edit.range;
        }
        return {
          range,
          text: edit.text,
          forceMoveMarkers: true,
        };
      },
    );

    if (targetEditorId === DOCUMENT_EDITOR_ID) {
      editor.executeEdits("edit", editsWithRange);
      editor.setPosition(position);
      // we're modifying the document editor here (👆) so we need to ensure that we're setting the document state _after_ we've made those changes
      // setting the document state will update the activeDefinition, which will trigger a rerender of the visual operation builder
      setDocumentState();
    } else {
      // results editor is read-only
      model.pushEditOperations([], editsWithRange, () => null);
    }
  };
