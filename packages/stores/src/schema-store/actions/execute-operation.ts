import { Kind, OperationDefinitionNode, SelectionSetNode, print } from 'graphql';

import update from 'lodash.update';

import merge from 'lodash.merge';

import { createClient, ExecutionResult } from 'graphql-sse';

import { VARIABLES_EDITOR_ID } from '@pathfinder-ide/shared';

import { httpFetcher } from './http-fetcher';

// stores
import { graphQLDocumentStore } from '../../graphql-document-store';

import { getMonacoEditor } from '../../monaco-editor-store';

import {
  getEnabledHTTPHeaderValueRecord,
  updateEditorTab,
  useSessionStore,
  sessionStore,
} from '../../session-store';

import type {
  ExecutionResponse,
  SchemaStoreActions,
  WatchHeadersResponse,
} from '../schema-store.types';

import { schemaStore } from '../schema-store';

import { uiStore } from '../../ui-store';

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
  const endpoint = useSessionStore.getState().endpoint as string;

  const headers = useSessionStore.getState().headers;

  // get our activeDocumentEntry
  const activeDocumentEntry = graphQLDocumentStore.getState().activeDocumentEntry;

  // pull out the activeOperation and operationName
  const activeOperation = print(activeDocumentEntry?.node as OperationDefinitionNode);
  const operationName = activeDocumentEntry?.node.name?.value as string;

  const targetTabId = sessionStore.getState().activeTab?.tabId as string;

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

    const isDefer = usingDefer(activeDocumentEntry?.node.selectionSet);

    const useSse = isDefer || isSubscription;

    if (useSse) {
      const client = createClient({
        url: endpoint,
        headers: headers ? getEnabledHTTPHeaderValueRecord({ headers }) : undefined,
        credentials: 'same-origin',
      });

      let lastResponse: ExecutionResponse | undefined;

      let i = 0;

      let unsubscribe = () => {
        client.dispose();
      };

      const onNext = (data: Record<string, unknown>) => {
        const t1 = performance.now();

        const combinedResults = mergeResults(data, lastResponse?.response.data);

        const updatedData = isDefer ? combinedResults : data;

        if (isSubscription && i === 0) {
          uiStore.setState({
            activeSubscriptions: [
              ...uiStore.getState().activeSubscriptions,
              {
                dispose: unsubscribe,
                operationName: graphQLParams.operationName || '',
                tabId: sessionStore.getState().activeTab?.tabId as string,
              },
            ],
          });
        }

        lastResponse = {
          duration: isSubscription ? null : t1 - t0,
          request: {
            endpoint,
            headers: headers.map((header) => [header.key, header.value]) as HeadersInit,
            graphQLOperationParams: graphQLParams,
          },
          response: {
            data: updatedData,
            status: 200,
          },
          timestamp: new Date(),
        };

        schemaStore.setState({
          latestResponse: lastResponse,
        });

        updateEditorTab({
          partialTab: {
            latestResponse: lastResponse,
          },
          targetTabId,
        });
        i++;
      };

      await new Promise((resolve, reject) => {
        unsubscribe = client.subscribe(
          {
            query: graphQLParams.query,
            operationName: graphQLParams.operationName,
            variables: graphQLParams.variables,
          },
          {
            next: onNext,
            error: reject,
            complete: () => resolve,
          },
        );
      });

      return schemaStore.setState({
        isExecuting: false,
      });
    }

    schemaStore.setState({ isExecuting: true });

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

    const data = await fetchResponse.json();

    const watchHeaders = schemaStore.getState().watchHeaders;

    const caughtHeaders: WatchHeadersResponse[] = [];

    if (watchHeaders) {
      watchHeaders.forEach((watchHeader) => {
        const caughtHeader = fetchResponse.headers.get(watchHeader.headerName);
        if (caughtHeader) {
          caughtHeaders.push(watchHeader.responseMap[`${caughtHeader}`]);
        }
      });
    }

    const executionResponse: ExecutionResponse = {
      duration: t1 - t0,
      request: {
        endpoint,
        headers: headers.map((header) => [header.key, header.value]) as HeadersInit,
        graphQLOperationParams: graphQLParams,
      },
      response: {
        data,
        status: fetchResponse.status,
      },
      timestamp: new Date(),
      watchHeaders: caughtHeaders.length > 0 ? caughtHeaders : undefined,
    };

    updateEditorTab({
      partialTab: {
        latestResponse: executionResponse,
      },
      targetTabId,
    });

    return schemaStore.setState({
      isExecuting: false,
      latestResponse: executionResponse,
    });
  }
};
