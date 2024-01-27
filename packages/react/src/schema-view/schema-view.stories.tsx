import { GraphQLSchema } from 'graphql';
import { SchemaView } from './schema-view';
import { testSchema } from '@pathfinder-ide/stores/src/schema-store/test-schema';
import { useEffect, useState } from 'react';

export const WithSchema = () => {
  return <SchemaView schema={testSchema} />;
};

export const WithDelayedSchema = () => {
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  useEffect(() => {
    setTimeout(() => {
      setSchema(testSchema);
    }, 2000);
  });

  return <SchemaView schema={schema || undefined} />;
};

export const WithoutSchema = () => {
  return <SchemaView />;
};
