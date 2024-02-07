import { OperationDefinitionNode } from 'graphql';

import type { GraphQLDocumentStoreActions } from '../graphql-document-store.types';

export const isOperationNameChanging: GraphQLDocumentStoreActions['isOperationNameChanging'] =
  ({ definition, definitions }) => {
    const foundEntryAtLocation = definitions.find(
      (d) => d.loc?.start === definition.loc?.start,
    );

    if (foundEntryAtLocation) {
      const stringifiedFoundEntry = JSON.stringify({
        start: (foundEntryAtLocation as OperationDefinitionNode).name?.loc?.start,
        end: (foundEntryAtLocation as OperationDefinitionNode).name?.loc?.end,
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
