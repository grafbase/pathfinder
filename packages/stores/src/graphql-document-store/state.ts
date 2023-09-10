import type { GraphQLDocumentStoreState } from "./graphql-document-store.types";

export const INITIAL_GRAPHQL_DOCUMENT_STATE: GraphQLDocumentStoreState = {
  activeDocumentEntry: null,
  documentEntries: [],
  documentNotifications: [],
  isParseable: true,
};

export const graphQLDocumentState = {
  ...INITIAL_GRAPHQL_DOCUMENT_STATE,
};
