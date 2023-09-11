import { OperationDefinitionNode, print } from "graphql";

import { VARIABLES_EDITOR_ID } from "@pathfinder/shared";

import { HTTPHeadersStore } from "../../http-headers-store";
import { getMonacoEditor } from "../../monaco-editor-store";

import {
  graphQLDocumentStore,
  updateDocumentEntryResponse,
} from "../../graphql-document-store";

import { schemaStore } from "../schema-store";

import { httpFetcher } from "./http-fetcher";

import type {
  AcceptableHeaders,
  ExecutionResponse,
  SchemaStoreActions,
} from "../schema-store.types";

// this function is called from the execute button _and_ when using CMD + ENTER
export const executeOperation: SchemaStoreActions["executeOperation"] =
  async () => {
    schemaStore.setState({ isExecuting: true });

    // get our endpoint
    const endpoint = schemaStore.getState().fetcherOptions?.endpoint;

    // get our headers, filtering out those that are not enabled
    const headers: AcceptableHeaders = HTTPHeadersStore.getState()
      .headers.filter((header) => header.enabled)
      .map((header) => [header.key, header.value]);

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
        endpoint,
        graphQLParams,
        headers,
      });

      const t1 = performance.now();

      if (!fetchResponse) {
        // TODO: how do we get here?
        return schemaStore.setState({ isExecuting: false });
      }

      console.log("execute", { fetchResponse });

      const executionResponse: ExecutionResponse = {
        duration: t1 - t0,
        request: {
          endpoint,
          headers,
          graphQLOperationParams: graphQLParams,
        },
        response: {
          data: await fetchResponse.json(),
          status: fetchResponse.status,
        },
        timestamp: new Date(),
      };

      // const xGrafbaseCache = fetchResponse.headers.get("x-grafbase-cache");

      updateDocumentEntryResponse({
        executionResponse,
      });

      return schemaStore.setState({
        isExecuting: false,
        latestResponse: executionResponse,
      });
    }
  };
