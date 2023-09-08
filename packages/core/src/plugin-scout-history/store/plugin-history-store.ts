import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

import { storage } from "@pathfinder/stores/src/storage";

import { pluginHistoryState } from "./state";

import type { PluginHistoryStoreState } from "./plugin-history-store.types";

type StateToPersist = PluginHistoryStoreState;

export const pluginHistoryStore = createStore<PluginHistoryStoreState>()(
  persist(
    () => ({
      ...pluginHistoryState,
    }),
    {
      name: "pathfinder-scout-plugin-history",
      storage: storage<StateToPersist>(),
      version: 0,
    },
  ),
);
