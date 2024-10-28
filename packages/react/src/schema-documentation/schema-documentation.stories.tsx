import { printSchema } from 'graphql';
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

export const WithSchemaAndThemeOverrides = () => {
  return (
    <SchemaDocumentation
      schema={testSchema}
      themeOptions={{ overrides: { dark: { color: { neutral: { '1': '#000' } } } } }}
    />
  );
};

export const WithSchemaAnddetailsPaneTabSlotComponent = () => {
  return (
    <SchemaDocumentation
      schema={testSchema}
      detailsPaneTabSlotComponents={[
        {
          tabContent: <>I'm a detailsPaneTabSlotComponent!</>,
          tabName: 'Test',
        },
      ]}
    />
  );
};

export const WithDelayedSchema = () => {
  const [schema, setSchema] = useState<string | null>(null);
  useEffect(() => {
    setTimeout(() => {
      setSchema(printSchema(testSchema));
    }, 2000);
  });

  return <SchemaView schemaString={schema || undefined} />;
};

export const WithoutSchema = () => {
  return <SchemaDocumentation />;
};
