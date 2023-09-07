import type { GraphQLSchema } from "graphql";
import type { MonacoGraphQLAPI } from "monaco-graphql";

export type MonacoGraphQLStoreState = {
  monacoGraphQLAPI: MonacoGraphQLAPI | null;
};

export type MonacoGraphQLStoreActions = {
  initMonacoGraphQLAPI: () => Promise<void>;
  setMonacoGraphQLSchema: ({
    schema,
  }: {
    schema: GraphQLSchema;
  }) => Promise<void>;
};
