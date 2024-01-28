import { createStore } from 'zustand';

import { graphQLDocumentState } from './state';

import { GraphQLDocumentStoreState } from './graphql-document-store.types';

export const graphQLDocumentStore = createStore<GraphQLDocumentStoreState>()(() => ({
  ...graphQLDocumentState,
}));
