import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

import { storage } from "@pathfinder/stores/src/storage";

import { pluginHistoryState } from "./state";

import type { PluginHistoryStoreState } from "./plugin-history-store.types";

export const STORAGE_NAME_SCOUT_HISTORY = "pathfinder-scout-plugin-history";

type StateToPersist = PluginHistoryStoreState;

export const pluginHistoryStore = createStore<PluginHistoryStoreState>()(
  persist(
    () => ({
      ...pluginHistoryState,
    }),
    {
      skipHydration: true,
      name: STORAGE_NAME_SCOUT_HISTORY,
      storage: storage<StateToPersist>(),
      version: 0,
    },
  ),
);
