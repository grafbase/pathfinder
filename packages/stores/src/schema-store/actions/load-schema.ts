import { testSchema } from "../test-schema";

import { setMonacoGraphQLSchema } from "../../monaco-graphql-store";
import { schemaStore } from "../schema-store";

import { doSchemaPolling } from "./do-schema-polling";
import { doIntrospection } from "./do-introspection";

import type { SchemaStoreActions } from "../schema-store.types";

export const loadSchema: SchemaStoreActions["loadSchema"] = async ({
  fetchOptions,
}) => {
  schemaStore.setState({
    introspectionErrors: [],
    isLoadingSchema: true,
  });

  if (process.env.NODE_ENV === "test") {
    // we're in test, so we set our testSchema and return null below
    setMonacoGraphQLSchema({ schema: testSchema });

    schemaStore.setState({
      isLoadingSchema: false,
      schema: testSchema,
    });

    return testSchema;
  }

  const schema = await doIntrospection({ fetchOptions });

  if (!schema) {
    schemaStore.setState({
      isLoadingSchema: false,
      schema,
    });

    return null;
  }

  setMonacoGraphQLSchema({ schema });

  if (schemaStore.getState().withPolling) {
    doSchemaPolling({ fetchOptions });
  }

  schemaStore.setState({
    isLoadingSchema: false,
    schema,
  });

  return schema;
};
