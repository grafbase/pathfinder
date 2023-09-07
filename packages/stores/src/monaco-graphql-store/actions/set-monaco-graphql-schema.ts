import { initMonacoGraphQLAPI } from "./init-monaco-graphql-api";

import { monacoGraphQLStore } from "../monaco-graphql-store";

import type { MonacoGraphQLStoreActions } from "../monaco-graphql-store.types";

export const setMonacoGraphQLSchema: MonacoGraphQLStoreActions["setMonacoGraphQLSchema"] =
  async ({ schema }) => {
    if (!monacoGraphQLStore.getState().monacoGraphQLAPI) {
      await initMonacoGraphQLAPI();
    }
    monacoGraphQLStore.getState().monacoGraphQLAPI?.setSchemaConfig([
      {
        schema,
        uri: `schema.graphql`,
      },
    ]);
  };
