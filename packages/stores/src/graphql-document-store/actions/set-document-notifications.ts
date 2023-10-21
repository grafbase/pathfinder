import { ExecutableDefinitionNode } from 'graphql';

import { graphQLDocumentStore } from '../graphql-document-store';

import type {
  DocumentNotificationType,
  GraphQLDocumentStoreActions,
} from '../graphql-document-store.types';

export const setDocumentNotifications: GraphQLDocumentStoreActions['setDocumentNotifications'] =
  ({ definitions }) => {
    const operationNames = definitions.map(
      (d) => (d as ExecutableDefinitionNode).name?.value,
    );

    // this check is for ANY anonymous operations
    if (definitions.length > 1 && operationNames.some((dW) => dW === undefined)) {
      graphQLDocumentStore.setState({
        documentNotifications: [
          ...new Set([
            ...graphQLDocumentStore.getState().documentNotifications,
            'ANONYMOUS_MUST_BE_ONLY_DEFINED',
          ]),
        ] as DocumentNotificationType[],
      });
    } else {
      graphQLDocumentStore.setState({
        documentNotifications: graphQLDocumentStore
          .getState()
          .documentNotifications.filter((dW) => dW !== 'ANONYMOUS_MUST_BE_ONLY_DEFINED'),
      });
    }

    // this check is for duplicate operation names
    if (new Set(operationNames).size !== operationNames.length) {
      graphQLDocumentStore.setState({
        documentNotifications: [
          ...new Set([
            ...graphQLDocumentStore.getState().documentNotifications,
            'DUPLICATE_OPERATION_NAME',
          ]),
        ] as DocumentNotificationType[],
      });
    } else {
      graphQLDocumentStore.setState({
        documentNotifications: graphQLDocumentStore
          .getState()
          .documentNotifications.filter((dW) => dW !== 'DUPLICATE_OPERATION_NAME'),
      });
    }
  };
