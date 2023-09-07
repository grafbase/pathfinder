import { createStore } from "zustand/vanilla";

import type { PluginsStore } from "./plugins-store.types";

export const pluginsStore = createStore<PluginsStore>()(() => ({
  scoutTools: [],
}));
