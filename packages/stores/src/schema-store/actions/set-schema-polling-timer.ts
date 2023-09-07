import { schemaStore } from "../schema-store";

import type { SchemaStoreActions } from "../schema-store.types";

export const setSchemaPollingTimer: SchemaStoreActions["setSchemaPollingTimer"] =
  ({ pollingTimer }: { pollingTimer: NodeJS.Timeout }) => {
    schemaStore.setState({ pollingTimer });
  };
