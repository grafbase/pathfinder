import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

import { STORAGE_NAME_TABS } from "@pathfinder/shared";

import { storage } from "../storage";
import { tabsState } from "./state";

import { EditorTabsStoreState } from "./editor-tabs-store.types";

type StateToPersist = Omit<EditorTabsStoreState, "_hasHydrated">;

export const editorTabsStore = createStore<EditorTabsStoreState>()(
  persist(
    () => ({
      ...tabsState,
    }),
    {
      // we skip automatic hydration here and manually call rehydrate() when Pathfinder loads.
      skipHydration: true,
      name: STORAGE_NAME_TABS,
      onRehydrateStorage: () => {
        return (_state, error) => {
          if (error) {
            console.warn("an error occurred during tabsStore hydration", error);
          } else {
            editorTabsStore.setState({
              _hasHydrated: true,
            });
          }
        };
      },
      partialize: (state) => ({
        activeTab: state.activeTab,
        tabs: state.tabs,
      }),
      storage: storage<StateToPersist>(),
      version: 0,
    },
  ),
);
