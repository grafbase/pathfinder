import { GraphQLSchema } from 'graphql';
import { useState, useEffect } from 'react';
import { SchemaView } from '../schema-view';
import { SchemaDocumentation } from './components/schema-documentation';
import { testSchema } from '@pathfinder-ide/stores/src/schema-store/test-schema';

const overrides = {
  dark: {
    color: {
      neutral: {
        1: 'red',
      },
    },
  },
  light: {
    color: {
      neutral: {
        1: 'blue',
      },
    },
  },
};

export const WithSchemaAndThemeOptions = () => {
  return (
    <SchemaDocumentation
      schema={testSchema}
      themeOptions={{
        overrides,
      }}
    />
  );
};

export const WithSchema = () => {
  return <SchemaDocumentation schema={testSchema} />;
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
  return <SchemaDocumentation />;
};
