import { graphQLDocumentStore } from '../graphql-document-store';

import { updateActiveEditorTab } from '../../session-store';

import type {
  GraphQLDocumentStoreActions,
  OperationEntry,
} from '../graphql-document-store.types';

export const updateDocumentEntryResponse: GraphQLDocumentStoreActions['updateDocumentEntryResponse'] =
  ({ executionResponse }) => {
    const operationName = executionResponse.request.graphQLOperationParams.operationName;
    const documentEntries = graphQLDocumentStore.getState().documentEntries;

    const targetEntry = documentEntries.find((d) => d.node.name?.value === operationName);

    if (!targetEntry) {
      return undefined;
    }

    const replacementEntry: OperationEntry = {
      ...(targetEntry as OperationEntry),
      latestResponse: executionResponse,
    };

    const newDocumentEntries = documentEntries.map((entry) => {
      const isTargetEntry = entry.node.name?.value === operationName;
      if (isTargetEntry) {
        return replacementEntry;
      } else {
        // this is not our target entry, just return it without modification
        return entry;
      }
    });

    updateActiveEditorTab({
      partialTab: {
        latestResponse: executionResponse,
      },
    });

    return graphQLDocumentStore.setState({
      documentEntries: newDocumentEntries,
      activeDocumentEntry: replacementEntry,
    });
  };
