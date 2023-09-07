import { buildClientSchema, getIntrospectionQuery } from "graphql";

import type { IntrospectionQuery } from "graphql";

import { httpFetcher } from "./http-fetcher";

import type { SchemaStoreActions } from "../schema-store.types";

export const getSchemaViaIntrospection: SchemaStoreActions["getSchemaViaIntrospection"] =
  async ({ endpoint, headers }) => {
    const fetchResult = await httpFetcher({
      endpoint,
      graphQLParams: {
        query: getIntrospectionQuery(),
        operationName: "IntrospectionQuery",
      },
      headers,
    });

    if (!fetchResult) {
      return null;
    }

    const { data } = await fetchResult.json();

    try {
      const schema = buildClientSchema(data as unknown as IntrospectionQuery);
      return schema;
    } catch (error) {
      console.error("Error when attempting to buildClientSchema", { error });
      return null;
    }
  };
