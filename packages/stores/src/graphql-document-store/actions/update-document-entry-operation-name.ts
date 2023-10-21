import { OperationDefinitionNode } from 'graphql';

import { graphQLDocumentStore } from '../graphql-document-store';

import type {
  GraphQLDocumentStoreActions,
  OperationEntry,
} from '../graphql-document-store.types';

export const updateDocumentEntryOperationName: GraphQLDocumentStoreActions['updateDocumentEntryOperationName'] =
  ({ definition }) => {
    const documentEntries = graphQLDocumentStore.getState().documentEntries;
    const targetEntry = documentEntries.find(
      (d) => d.node.loc?.start === definition.loc?.start,
    );

    if (!targetEntry) {
      return null;
    }

    const replacementEntry: OperationEntry = {
      ...(targetEntry as OperationEntry),
      node: {
        ...(targetEntry.node as OperationDefinitionNode),
        name: definition.name,
      },
    };

    const newDocumentEntries = documentEntries.map((entry) => {
      const isTargetEntry = entry.node.loc?.start === definition.loc?.start;
      if (isTargetEntry) {
        return replacementEntry;
      } else {
        // this is not our target entry, just return it without modification
        return entry;
      }
    });

    return graphQLDocumentStore.setState({
      documentEntries: newDocumentEntries,
      activeDocumentEntry: replacementEntry,
    });
  };
