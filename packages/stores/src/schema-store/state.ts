import type { SchemaStoreState } from './schema-store.types';

export const INITIAL_SCHEMA_STORE_STATE: SchemaStoreState = {
  introspectionErrors: [],
  isExecuting: false,
  isIntrospecting: false,
  isLoadingSchema: false,
  latestResponse: null,
  polling: {
    enabled: false,
    interval: 10000,
    timer: null,
  },
  schema: null,
};

export const schemaStoreState = {
  ...INITIAL_SCHEMA_STORE_STATE,
};
