import { schemaStore } from '../schema-store';

import type { SchemaStoreActions } from '../schema-store.types';
import { setSchemaPollingTimer } from './set-schema-polling-timer';

export const resetSchemaPolling: SchemaStoreActions['resetSchemaPolling'] = () => {
  // do we have an existing timer?
  const timer = schemaStore.getState().polling.timer;

  // if so, clear the interval and remove it from state
  if (timer) {
    clearTimeout(timer);
    return setSchemaPollingTimer({ timer: null });
  }
};
