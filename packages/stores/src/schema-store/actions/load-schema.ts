import { testSchema } from "../test-schema";

import { setMonacoGraphQLSchema } from "../../monaco-graphql-store";
import { schemaStore } from "../schema-store";
import { useSessionStore } from "../../session-store";

import { doSchemaPolling } from "./do-schema-polling";
import { getSchemaViaIntrospection } from "./get-schema-via-introspection";

import type {
  LoadSchemaFetchOptions,
  SchemaStoreActions,
} from "../schema-store.types";

export const loadSchema: SchemaStoreActions["loadSchema"] = async ({
  fetchOptions,
}) => {
  let options: LoadSchemaFetchOptions;

  if (fetchOptions) {
    options = {
      endpoint: fetchOptions.endpoint,
      headers: fetchOptions.headers,
    };
  } else {
    const endpoint = useSessionStore.getState().endpoint as string;

    const enabledHTTPHeaders = useSessionStore
      .getState()
      .headers.filter((header) => header.enabled)
      .map((header) => [header.key, header.value]);

    options = {
      endpoint,
      headers: enabledHTTPHeaders.map((header) => [header[0], header[1]]),
    };
  }

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

  const schema = await getSchemaViaIntrospection({ fetchOptions: options });

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
    return doSchemaPolling({ fetchOptions: options });
  }

  return schemaStore.setState({
    isLoadingSchema: false,
  });
};
