import { create } from "zustand";

import { MonacoGraphQLStoreState } from "./monaco-graphql-store.types";

export const monacoGraphQLStore = create<MonacoGraphQLStoreState>()(() => ({
  monacoGraphQLAPI: null,
}));
