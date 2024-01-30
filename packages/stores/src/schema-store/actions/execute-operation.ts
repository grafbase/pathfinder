import {
  DirectiveNode,
  Kind,
  OperationDefinitionNode,
  SelectionSetNode,
  print,
} from 'graphql';

import update from 'lodash.update';

import merge from 'lodash.merge';

import { createClient, ExecutionResult } from 'graphql-sse';

import { VARIABLES_EDITOR_ID } from '@pathfinder-ide/shared';

import { getMonacoEditor } from '../../monaco-editor-store';

import { getEnabledHTTPHeaderValueRecord, useSessionStore } from '../../session-store';

import {
  graphQLDocumentStore,
  updateDocumentEntryResponse,
} from '../../graphql-document-store';

import { httpFetcher } from './http-fetcher';
import { schemaStore } from '../schema-store';

import type { ExecutionResponse, SchemaStoreActions } from '../schema-store.types';
import { Z_FIXED } from 'zlib';

enum Directive {
  Defer = 'defer',
}

const usingDefer = (set: SelectionSetNode | undefined): boolean =>
  set?.selections.some((selection) => {
    // add Kind.FRAGMENT_SPREAD once we support named fragments
    const inlineFragment = selection.kind == Kind.INLINE_FRAGMENT;
    const usingDeferOnCurrentSelection =
      inlineFragment &&
      (selection.directives?.some((node) => node.name.value === Directive.Defer) ??
        false);
    const hasSelectionSet = 'selectionSet' in selection;
    return (
      usingDeferOnCurrentSelection ||
      (hasSelectionSet && usingDefer(selection.selectionSet))
    );
  }) ?? false;

const mergeResults = (
  result: ExecutionResult<Record<string, unknown>, unknown>,
  lastResult?: ExecutionResult<Record<string, unknown>, unknown>,
) => {
  // bit of weird typing here, result should probably be returned as ExecutionResult | ExecutionPatchResult from graphql-sse
  // but that isn't the case
  if (!('path' in result) || lastResult === undefined) {
    return result;
  }

  const path = result.path as string[];

  const combined = update(lastResult, ['data', ...path], (value) =>
    merge(value, result.data),
  );

  const errors = [...(lastResult?.errors ?? []), ...(result.errors ?? [])];

  return { ...combined, ...(errors.length > 0 ? { errors } : undefined) };
};

// this function is called from the execute button _and_ when using CMD + ENTER
export const executeOperation: SchemaStoreActions['executeOperation'] = async () => {
  schemaStore.setState({ isExecuting: true });

  const endpoint = useSessionStore.getState().endpoint as string;

  const headers = useSessionStore.getState().headers;

  // get our activeDocumentEntry
  const activeDocumentEntry = graphQLDocumentStore.getState().activeDocumentEntry;

  // pull out the activeOperation and operationName
  const activeOperation = print(activeDocumentEntry?.node as OperationDefinitionNode);
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

    const isSubscription = activeDocumentEntry?.node.operation === 'subscription';

    const useSse = usingDefer(activeDocumentEntry?.node.selectionSet) || isSubscription;

    if (useSse) {
      const client = createClient({
        url: endpoint,
        headers: headers ? getEnabledHTTPHeaderValueRecord({ headers }) : undefined,
        credentials: 'same-origin',
      });

      const results = client.iterate<Record<string, unknown>, unknown>({
        query: graphQLParams.query,
        operationName: graphQLParams.operationName,
        variables: graphQLParams.variables,
      });

      let lastResponse: ExecutionResponse | undefined;

      for await (const result of results) {
        const t1 = performance.now();
        const combinedResult = mergeResults(result, lastResponse?.response.data);

        lastResponse = {
          duration: t1 - t0,
          request: {
            endpoint,
            headers: headers.map((header) => [header.key, header.value]) as HeadersInit,
            graphQLOperationParams: graphQLParams,
          },
          response: {
            data: combinedResult,
            status: 200,
          },
          timestamp: new Date(),
        };
        schemaStore.setState({
          isExecuting: true,
          latestResponse: lastResponse,
        });

        // TODO this displays all history entries with the same body
        updateDocumentEntryResponse({
          executionResponse: lastResponse,
        });
      }

      if (!lastResponse) {
        return schemaStore.setState({ isExecuting: false });
      }

      return schemaStore.setState({
        isExecuting: false,
        latestResponse: lastResponse,
      });
    }

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
        headers: headers.map((header) => [header.key, header.value]) as HeadersInit,
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
