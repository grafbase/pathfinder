import type { SchemaStoreState } from "./schema-store.types";

export const INITIAL_SCHEMA_STORE_STATE: SchemaStoreState = {
  introspectionErrors: [],
  isExecuting: false,
  isIntrospecting: false,
  isLoadingSchema: false,
  latestResponse: null,
  pollingTimer: null,
  schema: null,
  withPolling: false,
};

export const schemaStoreState = {
  ...INITIAL_SCHEMA_STORE_STATE,
};
