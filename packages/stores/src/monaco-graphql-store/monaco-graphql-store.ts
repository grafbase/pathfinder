import { createStore } from 'zustand';

import { MonacoGraphQLStoreState } from './monaco-graphql-store.types';

export const INITIAL_MONACO_GRAPHQL_STORE_STATE = {
  monacoGraphQLAPI: null,
};

export const monacoGraphQLStore = createStore<MonacoGraphQLStoreState>()(() => ({
  ...INITIAL_MONACO_GRAPHQL_STORE_STATE,
}));
