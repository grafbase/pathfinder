import { testSchema } from '../test-schema';

import { setMonacoGraphQLSchema } from '../../monaco-graphql-store';
import { schemaStore } from '../schema-store';

import { doSchemaPolling } from './do-schema-polling';
import { doIntrospection } from './do-introspection';

import type { SchemaStoreActions } from '../schema-store.types';
import { GraphQLSchema } from 'graphql';

export const loadSchema: SchemaStoreActions['loadSchema'] = async ({
  fetchOptions,
  schema,
}) => {
  let targetSchema: GraphQLSchema | undefined = schema;

  schemaStore.setState({
    introspectionErrors: [],
    isLoadingSchema: true,
  });

  if (process.env.NODE_ENV === 'test') {
    // we're in test, so we set our testSchema and return null below
    setMonacoGraphQLSchema({ schema: testSchema });

    schemaStore.setState({
      isLoadingSchema: false,
      schema: testSchema,
    });

    return testSchema;
  }

  if (!targetSchema) {
    const introspectedSchema = await doIntrospection({ fetchOptions });

    if (!introspectedSchema) {
      schemaStore.setState({
        isLoadingSchema: false,
        schema: null,
      });

      return null;
    } else {
      targetSchema = introspectedSchema;
    }
  }

  setMonacoGraphQLSchema({ schema: targetSchema });

  if (schemaStore.getState().polling.enabled) {
    doSchemaPolling({ fetchOptions });
  }

  schemaStore.setState({
    isLoadingSchema: false,
    schema: targetSchema,
  });

  return targetSchema;
};
