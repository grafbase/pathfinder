import { create } from "zustand";

import { schemaStoreState } from "./state";
import type { SchemaStoreState } from "./schema-store.types";

export const schemaStore = create<SchemaStoreState>()(() => ({
  ...schemaStoreState,
}));
