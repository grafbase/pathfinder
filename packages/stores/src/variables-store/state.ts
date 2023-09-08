import { VARIABLES_EDITOR_DEFAULT_VALUE } from "@pathfinder/shared";

import type { VariablesStoreState } from "./variables-store.types";

export const INITIAL_VARIABLES_STATE: VariablesStoreState = {
  _hasHydrated: false,
  variablesString: VARIABLES_EDITOR_DEFAULT_VALUE,
};

export const variablesState = {
  ...INITIAL_VARIABLES_STATE,
};
