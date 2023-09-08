import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

import { STORAGE_NAME_VARIABLES } from "@pathfinder/shared";

import { variablesState } from "./state";

import { storage } from "../storage";

import type {
  VariablesStore,
  VariablesStoreState,
} from "./variables-store.types";

type StateToPersist = Pick<VariablesStoreState, "variablesString">;

export const variablesStore = createStore<VariablesStore>()(
  persist(
    () => ({
      ...variablesState,
    }),
    {
      // we skip automatic hydration here and manually call rehydrate() when Pathfinder loads.
      skipHydration: true,
      name: STORAGE_NAME_VARIABLES,
      onRehydrateStorage: () => {
        return (_state, error) => {
          if (error) {
            console.warn("an error occurred during hydration", error);
          } else {
            variablesStore.setState({
              _hasHydrated: true,
            });
          }
        };
      },
      partialize: (state) => ({
        variablesString: state.variablesString,
      }),
      storage: storage<StateToPersist>(),
      version: 0,
    },
  ),
);
