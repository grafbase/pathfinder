import { schemaStore } from "../schema-store";
import { pushMonacoEditorEdit } from "../../monaco-editor-store";
import { setMonacoGraphQLSchema } from "../../monaco-graphql-store";

import { DOCUMENT_EDITOR_ID } from "@pathfinder/shared";

import { setSchemaPollingTimer } from "./set-schema-polling-timer";
import { getSchemaViaIntrospection } from "./get-schema-via-introspection";

import { getMonacoEditor } from "../../monaco-editor-store";

import type { SchemaStoreActions } from "../schema-store.types";

const TIMEOUT = 10000;

export const doSchemaPolling: SchemaStoreActions["doSchemaPolling"] = ({
  endpoint,
  headers,
}) => {
  // if we have don't have a timer set, we can begin
  if (!schemaStore.getState().pollingTimer) {
    // get a reference to our editor so we can calculate the cursor position down below
    const documentEditor = getMonacoEditor({ editorId: DOCUMENT_EDITOR_ID });

    const fetchSchema = async () => {
      const previousSchema = JSON.stringify(schemaStore.getState().schema);

      const introspectionResult = await getSchemaViaIntrospection({
        endpoint,
        headers,
      });

      // there was some error with this poll, we bail and assume we'll get a different result for the next poll
      if (!introspectionResult) {
        // we won't reach our outer timeout (below, bottom) if we return here, so we set a fresh timer here before bailing
        setSchemaPollingTimer({
          pollingTimer: setTimeout(fetchSchema, TIMEOUT),
        });
        // bail
        return;
      }

      const incomingSchema = JSON.stringify(introspectionResult);

      // create our inner timeout and set the timer id into state
      setSchemaPollingTimer({
        pollingTimer: setTimeout(fetchSchema, TIMEOUT),
      });

      // if our previous schema and the new introspection result are the same, do nothing
      if (previousSchema === incomingSchema) return;

      // set our new schema in global state
      schemaStore.setState({
        schema: introspectionResult,
      });

      // set our new schema in monaco-graphql
      setMonacoGraphQLSchema({
        schema: introspectionResult,
      });

      // currently, monaco-graphql disposes of its worker and DOES NOT re-initialize after calling setSchemaConfig
      // 👇 this is a workaround for re-initializing the worker by rewriting the entire editor value, along with the current cursor position, back into the editor
      pushMonacoEditorEdit({
        edits: [
          {
            range: "REPLACE",
            text: documentEditor?.getValue() || null,
          },
        ],
        position: documentEditor?.getPosition() || {
          column: 1,
          lineNumber: 1,
        },
        targetEditorId: DOCUMENT_EDITOR_ID,
      });
    };

    // create our outer timeout and set the timer id into state
    setSchemaPollingTimer({
      pollingTimer: setTimeout(fetchSchema, TIMEOUT),
    });
  }
};
