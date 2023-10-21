import { schemaStore } from '../schema-store';

import type { SchemaStoreActions } from '../schema-store.types';

export const setSchemaPollingTimer: SchemaStoreActions['setSchemaPollingTimer'] = ({
  timer,
}) => {
  const polling = schemaStore.getState().polling;

  schemaStore.setState({
    polling: {
      ...polling,
      timer,
    },
  });
};
