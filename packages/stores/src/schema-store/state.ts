import type { SchemaStoreState } from "./schema-store.types";

export const INITIAL_SCHEMA_STORE_STATE: SchemaStoreState = {
  executionCallback: undefined,
  fetcherOptions: null,
  isExecuting: false,
  isLoadingSchema: true,
  pollingTimer: null,
  schema: null,
  withPolling: false,
};

export const schemaStoreState = {
  ...INITIAL_SCHEMA_STORE_STATE,
};
