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
      name: STORAGE_NAME_VARIABLES,
      partialize: (state) => ({
        variablesString: state.variablesString,
      }),
      storage: storage<StateToPersist>(),
      version: 0,
    },
  ),
);
