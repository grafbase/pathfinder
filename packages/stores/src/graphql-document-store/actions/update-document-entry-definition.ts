import { graphQLDocumentStore } from '../graphql-document-store';

import type {
  GraphQLDocumentStoreActions,
  OperationEntry,
} from '../graphql-document-store.types';

export const updateDocumentEntryDefinition: GraphQLDocumentStoreActions['updateDocumentEntryDefinition'] =
  ({ definition }) => {
    const operationName = definition.name?.value;
    const documentEntries = graphQLDocumentStore.getState().documentEntries;

    const targetEntry = documentEntries.find((d) => d.node.name?.value === operationName);

    if (!targetEntry) {
      // we shouldn't get here because we wouldn't be calling updateDocumentEntryDefinition unless the entry exists, but...typescript
      return null;
    }

    const replacementEntry: OperationEntry = {
      ...(targetEntry as OperationEntry),
      node: definition,
    };

    return replacementEntry;
  };
