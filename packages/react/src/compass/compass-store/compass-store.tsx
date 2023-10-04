import { createStore } from "zustand/vanilla";

import { compassState } from "./state";

import type { CompassState } from "./compass-store.types";

export const compassStore = createStore<CompassState>(() => ({
  ...compassState,
}));
