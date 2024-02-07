import { Kind, OperationDefinitionNode } from 'graphql';

import { graphQLDocumentStore } from '../graphql-document-store';

import type {
  GraphQLDocumentStoreActions,
  OperationEntry,
} from '../graphql-document-store.types';
import { getParsedDocument } from './get-parsed-document';

export const updateDocumentEntryOperationName: GraphQLDocumentStoreActions['updateDocumentEntryOperationName'] =
  ({ definition }) => {
    const definitions = getParsedDocument()?.definitions.filter(
      (d) => d.kind === Kind.OPERATION_DEFINITION,
    ) as OperationDefinitionNode[];

    const targetEntry = definitions?.find((d) => d.loc?.start === definition.loc?.start);

    if (!targetEntry) {
      return null;
    }

    const replacementEntry: OperationEntry = {
      node: {
        ...targetEntry,
        name: definition.name,
      },
    };

    return graphQLDocumentStore.setState({
      activeDocumentEntry: replacementEntry,
    });
  };
