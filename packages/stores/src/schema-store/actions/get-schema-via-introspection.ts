import { buildClientSchema, getIntrospectionQuery } from "graphql";

import type { GraphQLError, IntrospectionQuery } from "graphql";

import { schemaStore } from "../schema-store";

import { httpFetcher } from "./http-fetcher";

import type { SchemaStoreActions } from "../schema-store.types";

export const getSchemaViaIntrospection: SchemaStoreActions["getSchemaViaIntrospection"] =
  async ({ fetchOptions }) => {
    schemaStore.setState({
      isIntrospecting: true,
    });

    const fetchResult = await httpFetcher({
      fetchOptions,
      graphQLParams: {
        query: getIntrospectionQuery(),
        operationName: "IntrospectionQuery",
      },
    });

    if (!fetchResult) {
      // TODO: report introspection error here
      schemaStore.setState({
        isIntrospecting: false,
      });
      return null;
    }

    const { data, errors } = await fetchResult.json();

    if (errors) {
      schemaStore.setState({
        isIntrospecting: false,
        introspectionErrors: errors.map((error: GraphQLError) => error.message),
      });
      return null;
    }

    try {
      const schema = buildClientSchema(data as unknown as IntrospectionQuery);
      schemaStore.setState({
        introspectionErrors: [],
        isIntrospecting: false,
      });
      return schema;
    } catch (error) {
      console.error("Error when attempting to buildClientSchema", { error });
      schemaStore.setState({
        introspectionErrors: [error as string],
        isIntrospecting: false,
      });
      return null;
    }
  };
