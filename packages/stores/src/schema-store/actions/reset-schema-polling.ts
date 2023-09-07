import { schemaStore } from "../schema-store";

import type { SchemaStoreActions } from "../schema-store.types";

export const resetSchemaPolling: SchemaStoreActions["resetSchemaPolling"] =
  () => {
    // do we have an existing timer?
    const timer = schemaStore.getState().pollingTimer;

    // if so, clear the interval and remove it from state
    if (timer) {
      clearTimeout(timer);
      return schemaStore.setState({ pollingTimer: null });
    }
  };
