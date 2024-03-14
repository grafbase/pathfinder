import { printSchema } from 'graphql';
import { SchemaView } from './schema-view';
import { testSchema } from '@pathfinder-ide/stores/src/schema-store/test-schema';
import { useEffect, useState } from 'react';

export const WithSchema = () => {
  return <SchemaView schemaString={printSchema(testSchema)} />;
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
  return <SchemaView />;
};
