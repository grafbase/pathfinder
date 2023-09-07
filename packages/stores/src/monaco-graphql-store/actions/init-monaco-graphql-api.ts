import { initializeMode } from "monaco-graphql/esm/initializeMode";

import { monacoGraphQLStore } from "../monaco-graphql-store";
import type { MonacoGraphQLStoreActions } from "../monaco-graphql-store.types";

export const initMonacoGraphQLAPI: MonacoGraphQLStoreActions["initMonacoGraphQLAPI"] =
  async () => {
    monacoGraphQLStore.setState({
      monacoGraphQLAPI: initializeMode({
        formattingOptions: {
          prettierConfig: {
            printWidth: 40,
          },
        },
      }),
    });
  };
