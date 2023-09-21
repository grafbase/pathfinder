import { OperationDefinitionNode, print } from "graphql";

import { VARIABLES_EDITOR_ID } from "@pathfinder/shared";

import { getMonacoEditor } from "../../monaco-editor-store";

import { useSessionStore } from "../../session-store";

import {
  graphQLDocumentStore,
  updateDocumentEntryResponse,
} from "../../graphql-document-store";

import { httpFetcher } from "./http-fetcher";
import { schemaStore } from "../schema-store";

import type {
  ExecutionResponse,
  SchemaStoreActions,
} from "../schema-store.types";

// this function is called from the execute button _and_ when using CMD + ENTER
export const executeOperation: SchemaStoreActions["executeOperation"] =
  async () => {
    schemaStore.setState({ isExecuting: true });

    const endpoint = useSessionStore.getState().endpoint as string;

    const headers = useSessionStore.getState().headers;

    // get our activeDocumentEntry
    const activeDocumentEntry =
      graphQLDocumentStore.getState().activeDocumentEntry;

    // pull out the activeOperation and operationName
    const activeOperation = print(
      activeDocumentEntry?.node as OperationDefinitionNode,
    );
    const operationName = activeDocumentEntry?.node.name?.value as string;

    // get our ui-defined variables
    const uiVariables = getMonacoEditor({
      editorId: VARIABLES_EDITOR_ID,
    })?.getValue();

    // and parse them
    const variables = uiVariables ? JSON.parse(uiVariables) : null;

    if (endpoint && headers) {
      performance.clearResourceTimings();

      const t0 = performance.now();

      const graphQLParams = {
        operationName: operationName || undefined,
        query: activeOperation,
        variables,
      };

      const fetchResponse = await httpFetcher({
        fetchOptions: {
          endpoint,
          headers,
        },
        graphQLParams,
      });

      const t1 = performance.now();

      if (!fetchResponse) {
        // TODO: how do we get here?
        return schemaStore.setState({ isExecuting: false });
      }

      const executionResponse: ExecutionResponse = {
        duration: t1 - t0,
        request: {
          endpoint,
          headers: headers.map((header) => [header.key, header.value]),
          graphQLOperationParams: graphQLParams,
        },
        response: {
          data: await fetchResponse.json(),
          status: fetchResponse.status,
        },
        timestamp: new Date(),
      };

      updateDocumentEntryResponse({
        executionResponse,
      });

      return schemaStore.setState({
        isExecuting: false,
        latestResponse: executionResponse,
      });
    }
  };
