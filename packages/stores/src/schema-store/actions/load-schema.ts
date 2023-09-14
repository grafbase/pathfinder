import { testSchema } from "../test-schema";

import { setMonacoGraphQLSchema } from "../../monaco-graphql-store";
import { schemaStore } from "../schema-store";

import { doSchemaPolling } from "./do-schema-polling";
import { getSchemaViaIntrospection } from "./get-schema-via-introspection";

import type { SchemaStoreActions } from "../schema-store.types";

export const loadSchema: SchemaStoreActions["loadSchema"] = async () => {
  schemaStore.setState({
    introspectionErrors: [],
    isLoadingSchema: true,
  });

  if (process.env.NODE_ENV === "test") {
    // we're in test, so we set our testSchema and return null below
    setMonacoGraphQLSchema({ schema: testSchema });

    return schemaStore.setState({
      isLoadingSchema: false,
      schema: testSchema,
    });
  }

  const schema = await getSchemaViaIntrospection();

  if (!schema) {
    return schemaStore.setState({
      isLoadingSchema: false,
      schema,
    });
  }

  schemaStore.setState({
    isLoadingSchema: false,
    schema,
  });

  setMonacoGraphQLSchema({ schema });

  if (schemaStore.getState().withPolling) {
    return doSchemaPolling();
  }

  return schemaStore.setState({
    isLoadingSchema: false,
  });
};
