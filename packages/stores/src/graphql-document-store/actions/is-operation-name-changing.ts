import { graphQLDocumentStore } from '../graphql-document-store';

import type { GraphQLDocumentStoreActions } from '../graphql-document-store.types';

export const isOperationNameChanging: GraphQLDocumentStoreActions['isOperationNameChanging'] =
  ({ definition }) => {
    const foundEntryAtLocation = graphQLDocumentStore
      .getState()
      .documentEntries.find((d) => d.node.loc?.start === definition.loc?.start);

    if (foundEntryAtLocation) {
      const stringifiedFoundEntry = JSON.stringify({
        start: foundEntryAtLocation.node.name?.loc?.start,
        end: foundEntryAtLocation.node.name?.loc?.end,
      });
      const stringifiedDefinition = JSON.stringify({
        start: definition.name?.loc?.start,
        end: definition.name?.loc?.end,
      });

      if (stringifiedFoundEntry === stringifiedDefinition) {
        return false;
      }
      return true;
    }
  };
