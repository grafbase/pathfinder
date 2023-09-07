import { useEffect } from "react";

import {
  RESPONSE_EDITOR_ID,
  RESPONSE_MODEL_NAME,
} from "@graphql-pathfinder/shared";
import {
  getMonacoEditor,
  pushMonacoEditorEdit,
  useGraphQLDocumentStore,
  useSchemaStore,
} from "@graphql-pathfinder/stores";

import { Editor } from "../editor";

import { KBD } from "../kbd";

import {
  analyzeClass,
  responseEditorClass,
  responseNullStateClass,
} from "./analyze.css";

export const Analyze = () => {
  const isExecuting = useSchemaStore.use.isExecuting();

  const activeDocumentEntry = useGraphQLDocumentStore.use.activeDocumentEntry();

  useEffect(() => {
    const latestResponse = activeDocumentEntry?.latestResponse;

    if (latestResponse) {
      const value = JSON.stringify(latestResponse.response.data, null, 2);

      const responseEditor = getMonacoEditor({
        editorId: RESPONSE_EDITOR_ID,
      });

      // this check prevents the push edit if the latest execution response is the same value as what's already in the response editor
      // this is critical because, otherwise, we'd be overwriting the editor value every time the cursor position changes in the document editor
      if (
        responseEditor &&
        value !== (responseEditor && responseEditor.getValue())
      ) {
        pushMonacoEditorEdit({
          edits: [
            {
              range: "REPLACE",
              text: value,
            },
          ],
          position: { column: 0, lineNumber: 0 },
          targetEditorId: RESPONSE_EDITOR_ID,
        });
      }
    }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDocumentEntry]);

  return (
    <div className={analyzeClass}>
      {!activeDocumentEntry && (
        <div
          className={responseNullStateClass}
          data-testid="response-editor-null-state"
        >
          awaiting executable operation
        </div>
      )}

      {activeDocumentEntry && !activeDocumentEntry.latestResponse && (
        <div className={responseNullStateClass}>
          <span>Execute operation</span>
          <KBD shortcut="COMMAND_CONTROL" />+
          <KBD shortcut="RETURN" />
        </div>
      )}

      <div
        className={responseEditorClass({
          isExecuting,
          hideResponseEditor:
            !activeDocumentEntry || !activeDocumentEntry.latestResponse,
        })}
      >
        <Editor
          editorId={RESPONSE_EDITOR_ID}
          defaultValue={JSON.stringify(
            activeDocumentEntry?.latestResponse?.response.data,
            null,
            2,
          )}
          modelDetails={{
            fileName: RESPONSE_MODEL_NAME,
            language: "json",
          }}
          monacoOptionOverrides={{
            lineNumbers: "off",
            readOnly: true,
          }}
        />
      </div>
    </div>
  );
};
